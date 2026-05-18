'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DonationForm() {
  const [form, setForm] = useState({ donor_name: '', donor_email: '', donor_phone: '', amount: '', transfer_date: '', bank_name: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const supabase = createClient();
    const { error } = await supabase.from('donations').insert({
      donor_name: form.donor_name,
      donor_email: form.donor_email,
      donor_phone: form.donor_phone,
      amount: parseFloat(form.amount) || 0,
      transfer_date: form.transfer_date || null,
      bank_name: form.bank_name,
      message: form.message,
      status: 'pending',
    });

    if (error) {
      setMsg('Gagal mengirim konfirmasi. Coba lagi.');
    } else {
      setMsg('Konfirmasi donasi berhasil dikirim!');
      setForm({ donor_name: '', donor_email: '', donor_phone: '', amount: '', transfer_date: '', bank_name: '', message: '' });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {msg && <div className={`alert ${msg.includes('berhasil') ? 'alert-success' : 'alert-danger'}`}>{msg}</div>}
      <input type="text" placeholder="Nama donatur" required value={form.donor_name} onChange={e => setForm({ ...form, donor_name: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} />
      <input type="email" placeholder="Email" value={form.donor_email} onChange={e => setForm({ ...form, donor_email: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} />
      <input type="text" placeholder="Nomor HP" value={form.donor_phone} onChange={e => setForm({ ...form, donor_phone: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} />
      <input type="number" placeholder="Jumlah donasi (Rp)" required value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} />
      <input type="date" placeholder="Tanggal transfer" value={form.transfer_date} onChange={e => setForm({ ...form, transfer_date: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} />
      <input type="text" placeholder="Bank pengirim" value={form.bank_name} onChange={e => setForm({ ...form, bank_name: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} />
      <textarea placeholder="Pesan (opsional)" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }}></textarea>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Mengirim...' : 'Konfirmasi Donasi'}</button>
    </form>
  );
}
