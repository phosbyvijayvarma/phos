import { useEffect } from 'react';
import { SITE_NAME } from '@/lib/constants';

const SEO_TITLE = `${SITE_NAME} | Wedding, Portrait & Event Photography`;
const SEO_DESCRIPTION =
  'PHOS BY VIJAYVARMA offers cinematic wedding photography, pre-wedding shoots, portraits, baby portraits, haldi, sangeeth, and event coverage.';
const SEO_KEYWORDS =
  'PHOS BY VIJAYVARMA, Vijay Varma photographer, wedding photography, pre wedding photography, portrait photography, event photography, cinematic photography';
const SEO_IMAGE = '/apple-icon.png';
const CONTACT_EMAIL = 'phosbyvijayvarma@gmail.com';
const CONTACT_PHONE = '+91 7799558146';

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
}

export function SEO() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const currentUrl = `${url.origin}${url.pathname}`;
    const imageUrl = new URL(SEO_IMAGE, url.origin).toString();

    document.title = SEO_TITLE;

    upsertMeta('meta[name="description"]', { name: 'description', content: SEO_DESCRIPTION });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: SEO_KEYWORDS });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: 'index, follow, max-image-preview:large',
    });
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#000000' });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: SEO_TITLE });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: SEO_DESCRIPTION,
    });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: currentUrl });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: SEO_TITLE });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: SEO_DESCRIPTION,
    });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: currentUrl });

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: SITE_NAME,
      image: imageUrl,
      url: currentUrl,
      description: SEO_DESCRIPTION,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      areaServed: 'India',
      sameAs: [
        'https://www.instagram.com/phos_by__vijayvarma',
        'https://www.youtube.com/@phosbyvijayvarma',
      ],
      serviceType: [
        'Wedding Photography',
        'Pre-Wedding Photography',
        'Portrait Photography',
        'Event Photography',
      ],
    };

    let script = document.head.querySelector(
      'script[data-seo="structured-data"]',
    ) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = 'structured-data';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }, []);

  return null;
}
