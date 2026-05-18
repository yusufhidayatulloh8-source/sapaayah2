/**
 * Escape HTML special characters for safe rendering.
 */
export function e(value) {
  if (!value) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Strip tags and trim whitespace.
 */
export function cleanInput(value) {
  if (!value) return '';
  return String(value).replace(/<[^>]*>/g, '').trim();
}

/**
 * Format date string to Indonesian locale.
 */
export function formatDate(dateStr, options = {}) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '-';
  const defaultOptions = { day: 'numeric', month: 'short', year: 'numeric', ...options };
  return date.toLocaleDateString('id-ID', defaultOptions);
}

/**
 * Format date with time.
 */
export function formatDateTime(dateStr) {
  return formatDate(dateStr, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/**
 * Limit words in text.
 */
export function limitWords(text, limit = 20) {
  if (!text) return '';
  const stripped = text.replace(/<[^>]*>/g, '');
  const words = stripped.split(/\s+/).filter(Boolean);
  if (words.length <= limit) return stripped;
  return words.slice(0, limit).join(' ') + '...';
}

/**
 * Generate slug from text.
 */
export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Convert YouTube URL to embed URL.
 */
export function youtubeEmbedUrl(url, fallback = 'https://www.youtube.com/embed/dQw4w9WgXcQ') {
  if (!url || !url.trim()) return fallback;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
    let videoId = '';

    if (host === 'youtu.be') {
      videoId = parsed.pathname.split('/')[1] || '';
    } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.searchParams.get('v')) {
        videoId = parsed.searchParams.get('v');
      } else {
        const match = parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/);
        if (match) videoId = match[1];
      }
    }

    if (!/^[A-Za-z0-9_-]{6,}$/.test(videoId)) return url;

    const params = new URLSearchParams();
    if (parsed.searchParams.get('list')) params.set('list', parsed.searchParams.get('list'));
    if (parsed.searchParams.get('start')) {
      params.set('start', parsed.searchParams.get('start'));
    } else if (parsed.searchParams.get('t')) {
      const timeMatch = parsed.searchParams.get('t').match(/^(\d+)s?$/);
      if (timeMatch) params.set('start', timeMatch[1]);
    }

    const qs = params.toString();
    return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}${qs ? '?' + qs : ''}`;
  } catch {
    return url;
  }
}

/**
 * Format number with thousand separator.
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return Number(num).toLocaleString('id-ID');
}

/**
 * Get Supabase storage public URL.
 */
export function storageUrl(bucket, path) {
  if (!path) return null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * Get current ISO datetime string.
 */
export function now() {
  return new Date().toISOString();
}
