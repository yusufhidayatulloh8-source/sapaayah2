export const APP_NAME = 'Yayasan SAPA Ayah';
export const APP_TAGLINE = 'Sahabat Pembelajar Ayah';
export const APP_DESCRIPTION = 'Yayasan SAPA Ayah - Sahabat Pembelajar Ayah. Menyapa untuk Tumbuh, Tumbuh untuk Menyapa.';
export const APP_KEYWORDS = 'SAPA Ayah, Yayasan, Pengasuhan, Ayah, Keluarga';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const UPLOAD_MAX_SIZE = 2097152; // 2MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_UPLOAD_TYPES = [...ALLOWED_IMAGE_TYPES, 'image/svg+xml', 'video/mp4', 'application/pdf'];

export const NAV_ITEMS = [
  { href: '/', label: 'Beranda', page: 'home' },
  { href: '/tentang', label: 'Tentang', page: 'tentang' },
  { href: '/program', label: 'Program', page: 'program' },
  { href: '/gallery', label: 'Media', page: 'gallery' },
  { href: '/event', label: 'Event', page: 'event' },
  { href: '/artikel', label: 'Artikel', page: 'artikel' },
  { href: '/kontak', label: 'Kontak', page: 'kontak' },
];

export const ADMIN_MENU_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', href: '/admin' },
  { key: 'articles', label: 'Artikel', href: '/admin/articles' },
  { key: 'programs', label: 'Program SAPA', href: '/admin/programs' },
  { key: 'program-registrations', label: 'Pendaftar Program', href: '/admin/program-registrations' },
  { key: 'events', label: 'Event', href: '/admin/events' },
  { key: 'galleries', label: 'Galeri', href: '/admin/galleries' },
  { key: 'testimonials', label: 'Testimoni', href: '/admin/testimonials' },
  { key: 'donations', label: 'Donasi', href: '/admin/donations' },
  { key: 'users', label: 'Pengguna', href: '/admin/users' },
  { key: 'contacts', label: 'Kontak', href: '/admin/contacts' },
  { key: 'comments', label: 'Komentar', href: '/admin/comments' },
  { key: 'categories', label: 'Kategori', href: '/admin/categories' },
  { key: 'settings', label: 'Pengaturan', href: '/admin/settings' },
  { key: 'logs', label: 'Log Aktivitas', href: '/admin/logs' },
];

export const ADMIN_PAGE_DESCRIPTIONS = {
  dashboard: 'Selamat datang kembali. Berikut ringkasan aktivitas hari ini.',
  articles: 'Kelola konten artikel dan publikasi yayasan.',
  programs: 'Atur program unggulan SAPA Ayah.',
  'program-registrations': 'Pantau peserta yang mendaftar program.',
  events: 'Kelola jadwal event dan dokumentasi kegiatan.',
  galleries: 'Atur media foto dan video dokumentasi.',
  testimonials: 'Kelola testimoni peserta dan mitra.',
  donations: 'Verifikasi serta monitor data donasi.',
  users: 'Kelola akun pengguna dan hak akses.',
  contacts: 'Lihat pesan yang masuk dari formulir kontak.',
  comments: 'Moderasi komentar artikel.',
  categories: 'Atur kategori artikel.',
  settings: 'Konfigurasi identitas dan informasi website.',
  logs: 'Audit trail aktivitas sistem.',
  profile: 'Perbarui informasi akun Anda.',
};
