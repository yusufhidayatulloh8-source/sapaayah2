'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError('Login gagal. Periksa email dan password Anda.');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  }

  return (
    <div className="auth-card">
      <h2>Selamat Datang Kembali</h2>
      <p className="auth-desc">Masuk ke dashboard admin SAPA Ayah</p>
      
      {error && <div className="alert alert-danger">{error}</div>}

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

        <div className="auth-label-row">
          <label htmlFor="password">Password</label>
          <Link href="/auth/forgot-password">Lupa password?</Link>
        </div>
        <input 
          id="password" 
          type="password" 
          required 
          placeholder="********" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn auth-submit" type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk ke Dashboard'}
        </button>
      </form>
      <p className="auth-help">Belum punya akses? <Link href="/auth/register">Daftar Admin</Link></p>
    </div>
  );
}
