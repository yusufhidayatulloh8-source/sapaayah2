import '@/styles/globals.css';
import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import RevealObserver from '@/components/frontend/RevealObserver';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Yayasan SAPA Ayah - Sahabat Pembelajar Ayah',
  description: 'Yayasan SAPA Ayah - Sahabat Pembelajar Ayah. Menyapa untuk Tumbuh, Tumbuh untuk Menyapa.',
  keywords: 'SAPA Ayah, Yayasan, Pengasuhan, Ayah, Keluarga',
  icons: {
    icon: '/images/logo-sapa-mark.png',
    shortcut: '/images/logo-sapa-mark.png',
  },
};

export default async function RootLayout({ children }) {
  let settings = {};
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('settings').select('setting_key, setting_value');
    if (data) {
      settings = Object.fromEntries(data.map(s => [s.setting_key, s.setting_value]));
    }
  } catch (e) {
    // Settings not available yet
  }

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer settings={settings} />
        <RevealObserver />
      </body>
    </html>
  );
}
