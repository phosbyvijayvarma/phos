import React, { useEffect, useState } from 'react';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@phosbyvijayvarma';

interface VideoItem {
  videoId: string;
  title: string;
}

export default function LatestVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const feedUrl =
      'https://www.youtube.com/feeds/videos.xml?channel_id=UC_qCvYApvb1EGvklGWeYV7Q';

    const parseXmlFeed = (xmlString: string) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlString, 'text/xml');
      const items = Array.from(xml.getElementsByTagName('entry'));

      if (items.length === 0) {
        throw new Error('No video entries found in feed.');
      }

      return items.slice(0, 4).map((item) => {
        const videoId = item.getElementsByTagName('yt:videoId')[0]?.textContent || '';
        const title = item.getElementsByTagName('title')[0]?.textContent || '';
        return { videoId, title };
      });
    };

    const loadFromAllOrigins = () =>
      fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(feedUrl))
        .then((res) => {
          if (!res.ok) {
            throw new Error('AllOrigins proxy failed');
          }
          return res.json();
        })
        .then((data) => {
          if (!data || typeof data.contents !== 'string') {
            throw new Error('Invalid proxy response');
          }
          return parseXmlFeed(data.contents);
        });

    const loadFromRss2Json = () =>
      fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=' +
          encodeURIComponent(feedUrl) +
          '&_=' +
          Date.now()
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('RSS2JSON fetch failed');
          }
          return res.json();
        })
        .then((data) => {
          if (!data || !Array.isArray(data.items)) {
            throw new Error('Invalid RSS2JSON response');
          }
          return data.items.slice(0, 4).map((item: any) => ({
            videoId: item.link?.split('v=')[1] || '',
            title: item.title || '',
          }));
        });

    loadFromAllOrigins()
      .catch(() => loadFromRss2Json())
      .then((latestVideos) => {
        setVideos(latestVideos);
        setError(null);
      })
      .catch((err) => {
        console.error('Video feed error:', err);
        setError('Unable to load latest videos.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="videos" className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm text-white/50 uppercase tracking-[0.4em] font-medium mb-4">
            Latest on YouTube
          </p>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-white tracking-wider">
            Watch Our Latest Videos
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-base text-slate-400">
            Catch the latest cinematic videos from our YouTube channel. View more to discover the full gallery.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-white/60">Loading latest videos…</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <div
                key={video.videoId}
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-xl shadow-black/20"
              >
                <div className="relative aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <div className="p-6">
                  <p className="text-base font-semibold text-white leading-snug">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:border-white/40 hover:bg-white/15"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
}
