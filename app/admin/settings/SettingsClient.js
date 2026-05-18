'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SettingsClient({ initialSettings }) {
  const [form, setForm] = useState({
    site_name: initialSettings.site_name || '',
    site_tagline: initialSettings.site_tagline || '',
    site_email: initialSettings.site_email || '',
    site_phone: initialSettings.site_phone || '',
    whatsapp_number: initialSettings.whatsapp_number || '',
    site_address: initialSettings.site_address || '',
    hero_video_url: initialSettings.hero_video_url || '',
    bank_account: initialSettings.bank_account || '',
    instagram_url: initialSettings.instagram_url || '',
    youtube_url: initialSettings.youtube_url || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();
    const updates = Object.keys(form).map(key => ({
      setting_key: key,
      setting_value: form[key]
    }));

    const { error } = await supabase.from('settings').upsert(updates, { onConflict: 'setting_key' });

    if (error) {
      setMessage('Gagal menyimpan pengaturan.');
    } else {
      setMessage('Pengaturan berhasil disimpan.');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSave} className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      {message && <div style={{ gridColumn: '1 / -1' }} className={`alert ${message.includes('berhasil') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
      
      <div>
        <label>Nama Website</label>
        <input type="text" className="form-control" value={form.site_name} onChange={e => setForm({...form, site_name: e.target.value})} />
      </div>
      <div>
        <label>Tagline</label>
        <input type="text" className="form-control" value={form.site_tagline} onChange={e => setForm({...form, site_tagline: e.target.value})} />
      </div>
      <div>
        <label>Email Utama</label>
        <input type="email" className="form-control" value={form.site_email} onChange={e => setForm({...form, site_email: e.target.value})} />
      </div>
      <div>
        <label>Telepon</label>
        <input type="text" className="form-control" value={form.site_phone} onChange={e => setForm({...form, site_phone: e.target.value})} />
      </div>
      <div>
        <label>Nomor WhatsApp (628xxx)</label>
        <input type="text" className="form-control" value={form.whatsapp_number} onChange={e => setForm({...form, whatsapp_number: e.target.value})} />
      </div>
      <div>
        <label>Rekening Donasi</label>
        <input type="text" className="form-control" value={form.bank_account} onChange={e => setForm({...form, bank_account: e.target.value})} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label>Alamat Lengkap</label>
        <textarea className="form-control" rows="2" value={form.site_address} onChange={e => setForm({...form, site_address: e.target.value})}></textarea>
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label>URL Video Hero (Home)</label>
        <input type="url" className="form-control" value={form.hero_video_url} onChange={e => setForm({...form, hero_video_url: e.target.value})} />
      </div>
      <div>
        <label>URL Instagram</label>
        <input type="url" className="form-control" value={form.instagram_url} onChange={e => setForm({...form, instagram_url: e.target.value})} />
      </div>
      <div>
        <label>URL YouTube</label>
        <input type="url" className="form-control" value={form.youtube_url} onChange={e => setForm({...form, youtube_url: e.target.value})} />
      </div>

      <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
        <button type="submit" className="btn" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Pengaturan'}</button>
      </div>
    </form>
  );
}
