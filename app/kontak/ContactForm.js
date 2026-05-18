'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setLoading(true);
    setMessage('');

    const supabase = createClient();
    const { error } = await supabase.from('contacts').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      is_read: false,
    });

    if (error) {
      setMessage('Gagal mengirim pesan. Coba lagi.');
    } else {
      setMessage('Pesan berhasil dikirim!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {message && <div className={`alert ${message.includes('berhasil') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
      <input type="text" placeholder="Nama lengkap" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} />
      <input type="text" placeholder="Nomor HP" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} />
      <input type="text" placeholder="Subjek" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} />
      <textarea placeholder="Pesan Anda" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }}></textarea>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim Pesan'}</button>
    </form>
  );
}
