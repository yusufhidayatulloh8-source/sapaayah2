import Link from 'next/link';

export default function Footer({ settings = {} }) {
  const tagline = settings.site_tagline || 'Menyapa untuk Tumbuh, Tumbuh untuk Menyapa';
  const address = settings.site_address || 'Jakarta, Indonesia';
  const email = settings.site_email || 'info@sapaayah.or.id';
  const phone = settings.site_phone || '+62 812-3456-7890';
  const whatsapp = settings.whatsapp_number || '6281234567890';

  return (
    <>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h4>SAPA Ayah</h4>
            <strong>Sahabat Pembelajar Ayah</strong>
            <p>{tagline}</p>
            <div className="social-links">
              <a href="https://instagram.com/bapakmilenial_" target="_blank" rel="noopener noreferrer">IG</a>
              <a href="https://youtube.com/@bapakmilenial9081" target="_blank" rel="noopener noreferrer">YT</a>
              <Link href="/kontak">WA</Link>
            </div>
          </div>
          <div>
            <h4>Program</h4>
            <ul>
              <li>SAPA Journey</li>
              <li>SAPA Class</li>
              <li>SAPA Camp</li>
              <li>SAPA Recovery</li>
              <li>SAPA Mentor</li>
            </ul>
          </div>
          <div>
            <h4>Sumber Daya</h4>
            <ul>
              <li><Link href="/artikel">Artikel &amp; Stories</Link></li>
              <li><Link href="/gallery">Video</Link></li>
              <li><Link href="/event">Event</Link></li>
              <li><Link href="/gallery">Galeri</Link></li>
            </ul>
          </div>
          <div>
            <h4>Kontak</h4>
            <p>{address}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <small>&copy; {new Date().getFullYear()} Yayasan SAPA Ayah. All rights reserved.</small>
        </div>
      </footer>
      <a className="wa-float" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${whatsapp}`}>WhatsApp</a>
    </>
  );
}
