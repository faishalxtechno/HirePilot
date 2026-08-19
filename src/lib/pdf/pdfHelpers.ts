/**
 * Helper to safely load an image URL into a base64 Data URL for jsPDF embedding.
 * Handles CORS and returns null on failure so a vector fallback can be rendered.
 */
export async function loadImageAsBase64(url?: string): Promise<{ dataUrl: string; format: 'JPEG' | 'PNG' } | null> {
  if (!url || typeof window === 'undefined') return null;

  // If already a base64 data URL
  if (url.startsWith('data:image/')) {
    const isPng = url.startsWith('data:image/png');
    return { dataUrl: url, format: isPng ? 'PNG' : 'JPEG' };
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 200;
        canvas.height = img.naturalHeight || 200;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        // Draw circular cropped image on transparent canvas
        ctx.save();
        ctx.beginPath();
        const size = Math.min(canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        const dataUrl = canvas.toDataURL('image/png');
        resolve({ dataUrl, format: 'PNG' });
      } catch (err) {
        console.warn('Canvas conversion failed for avatar:', err);
        resolve(null);
      }
    };
    img.onerror = () => {
      console.warn('Could not load avatar image for PDF, using vector fallback.');
      resolve(null);
    };
    img.src = url;
  });
}

/**
 * Truncates and wraps long text into an array of lines for jsPDF.
 */
export function wrapText(text: string, maxCharsPerLine: number = 80): string[] {
  if (!text) return [];
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
