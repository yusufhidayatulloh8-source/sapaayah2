import { createClient } from '@/lib/supabase/server';
import ContactForm from './ContactForm';

export const metadata = { title: 'Kontak - Yayasan SAPA Ayah' };

export default async function KontakPage() {
  const supabase = await createClient();
  const { data: settingsRows } = await supabase.from('settings').select('setting_key, setting_value');
  const settings = {};
  if (settingsRows) settingsRows.forEach(s => { settings[s.setting_key] = s.setting_value; });

  return (
    <>
      <section className="hero" style={{ minHeight: '300px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Kontak</span>
            <h1>Hubungi Kami</h1>
            <p>Kami siap mendengar dan menjawab pertanyaan Anda.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h3>Informasi Kontak</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <p><strong>Alamat:</strong> {settings.site_address || 'Jakarta, Indonesia'}</p>
                <p><strong>Email:</strong> {settings.site_email || 'info@sapaayah.or.id'}</p>
                <p><strong>Telepon:</strong> {settings.site_phone || '+62 812-3456-7890'}</p>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <a className="btn" href={`https://wa.me/${settings.whatsapp_number || '6281234567890'}`} target="_blank" rel="noopener noreferrer">
                  Chat WhatsApp
                </a>
              </div>
            </div>
            <div>
              <h3>Kirim Pesan</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
