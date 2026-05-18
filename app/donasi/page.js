import { createClient } from '@/lib/supabase/server';
import DonationForm from './DonationForm';

export const metadata = { title: 'Donasi - Yayasan SAPA Ayah' };

export default async function DonasiPage() {
  const supabase = await createClient();
  const { data: settingsRows } = await supabase.from('settings').select('setting_key, setting_value');
  const settings = {};
  if (settingsRows) settingsRows.forEach(s => { settings[s.setting_key] = s.setting_value; });

  return (
    <>
      <section className="hero" style={{ minHeight: '300px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Donasi</span>
            <h1>Dukung Perjalanan Para Ayah</h1>
            <p>Setiap kontribusi membantu lebih banyak ayah bertumbuh.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h3>Informasi Rekening</h3>
              <div style={{ padding: '1.5rem', background: 'var(--clr-cream, #f5f0e8)', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <p><strong>{settings.bank_account || 'BCA 1234567890 a.n Yayasan SAPA Ayah'}</strong></p>
              </div>
              {settings.qris_image && (
                <div>
                  <h4>QRIS</h4>
                  <img src={settings.qris_image} alt="QRIS" style={{ maxWidth: '280px', borderRadius: '12px' }} />
                </div>
              )}
            </div>
            <div>
              <h3>Konfirmasi Donasi</h3>
              <DonationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
