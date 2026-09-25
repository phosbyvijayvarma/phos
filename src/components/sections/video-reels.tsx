import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@phosbyvijayvarma';

interface VideoItem {
  videoId: string;
  title: string;
}

/** Shows the YouTube thumbnail and only loads the heavy player once someone taps play. */
function VideoEmbed({ videoId, title }: VideoItem) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play ${title}`} data-cursor="Play">
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-black shadow-[0_0_40px_rgba(47,155,255,0.6)] transition group-hover:scale-110">
            <Play className="ml-1 h-7 w-7 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
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
    <section id="videos" className="py-20 md:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs text-brand uppercase tracking-[0.4em] mb-4">
            Films
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Watch our latest films
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-base text-slate-400">
            Cinematic wedding films and teasers from our YouTube channel.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-white/60">Loading latest videos…</div>
        ) : error ? (
          <div className="text-center text-white/60">Our films are a tap away on YouTube.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video.videoId}
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-xl shadow-black/20"
              >
                <VideoEmbed videoId={video.videoId} title={video.title} />
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
            More on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
