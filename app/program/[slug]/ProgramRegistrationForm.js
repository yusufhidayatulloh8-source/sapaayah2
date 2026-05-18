'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ProgramRegistrationForm({ programId }) {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', city: '', motivation: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();
    const { error } = await supabase.from('program_registrations').insert({
      program_id: programId,
      ...form,
      status: 'pending',
    });

    if (error) {
      setMessage('Gagal mendaftar. Silakan coba lagi.');
    } else {
      setMessage('Pendaftaran berhasil! Kami akan menghubungi Anda.');
      setForm({ full_name: '', email: '', phone: '', city: '', motivation: '' });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="inline-form">
      {message && <div className={`alert ${message.includes('berhasil') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
      <input type="text" placeholder="Nama lengkap" required value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="text" placeholder="Nomor HP" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <input type="text" placeholder="Kota" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
      <textarea placeholder="Motivasi mengikuti program" value={form.motivation} onChange={e => setForm({ ...form, motivation: e.target.value })}></textarea>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Mengirim...' : 'Daftar Sekarang'}</button>
    </form>
  );
}
