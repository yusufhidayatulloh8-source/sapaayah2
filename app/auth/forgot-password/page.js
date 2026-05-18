'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (resetError) {
      setError('Gagal mengirim email reset password. Pastikan email terdaftar.');
    } else {
      setSuccess('Instruksi reset password telah dikirim ke email Anda.');
    }
    setLoading(false);
  }

  return (
    <div className="auth-card">
      <h2>Lupa Password</h2>
      <p className="auth-desc">Masukkan email Anda untuk reset password.</p>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          required 
          placeholder="admin@sapaayah.org" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn auth-submit" type="submit" disabled={loading}>
          {loading ? 'Mengirim...' : 'Kirim Link Reset'}
        </button>
      </form>
      <p className="auth-help" style={{ marginTop: '1rem', textAlign: 'center' }}>
        Ingat password? <Link href="/auth/login">Kembali ke Login</Link>
      </p>
    </div>
  );
}
