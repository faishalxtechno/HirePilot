import { useEffect } from 'react';

/**
 * Manages the `<meta name="robots" content="...">` tag for the active page.
 * Reverts to "index, follow" when unmounted.
 */
export const useRobotsMeta = (content: string = 'noindex, follow') => {
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    let created = false;

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
      created = true;
    }

    const previousContent = meta.content;
    meta.content = content;

    return () => {
      if (created) {
        meta?.remove();
      } else if (meta) {
        meta.content = previousContent || 'index, follow';
      }
    };
  }, [content]);
};

