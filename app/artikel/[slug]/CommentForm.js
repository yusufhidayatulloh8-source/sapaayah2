'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function CommentForm({ articleId }) {
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();
    const { error } = await supabase.from('comments').insert({
      article_id: articleId,
      name: form.name,
      email: form.email,
      comment: form.comment,
      status: 'pending',
    });

    if (error) {
      setMessage('Gagal mengirim komentar.');
    } else {
      setMessage('Komentar terkirim, menunggu moderasi.');
      setForm({ name: '', email: '', comment: '' });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
      <h4>Tulis Komentar</h4>
      {message && <div className={`alert ${message.includes('terkirim') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
      <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <input type="text" placeholder="Nama" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      </div>
      <textarea placeholder="Tulis komentar Anda..." required value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }}></textarea>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim Komentar'}</button>
    </form>
  );
}
