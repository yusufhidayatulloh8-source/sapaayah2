import '@/styles/auth.css';

export const metadata = {
  title: 'Autentikasi - SAPA Ayah CMS',
};

export default function AuthLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="auth-body">
        <main className="auth-shell">
          <section className="auth-brand-side">
            <div className="auth-brand-overlay"></div>
            <div className="auth-brand-content">
              <div className="auth-mark">
                <img src="/images/logosapa.svg" alt="Logo SAPA Ayah" />
              </div>
              <h1>SAPA Ayah</h1>
              <p className="auth-subtitle">Sahabat Pembelajar Ayah</p>
              <p className="auth-quote">&quot;Setiap ayah adalah pembelajar sepanjang hayat.&quot;</p>
              <div className="auth-brand-note">
                Portal admin untuk mengelola konten, program, event, dan komunitas SAPA Ayah
              </div>
            </div>
          </section>
          <section className="auth-form-side">
            {children}
            <p className="auth-copy">&copy; {new Date().getFullYear()} Yayasan SAPA Ayah. All rights reserved.</p>
          </section>
        </main>
      </body>
    </html>
  );
}
