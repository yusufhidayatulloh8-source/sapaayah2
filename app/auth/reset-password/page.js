'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirm) {
      return setError('Konfirmasi password tidak cocok.');
    }
    if (password.length < 8) {
      return setError('Password minimal 8 karakter.');
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    });

    if (updateError) {
      setError('Gagal reset password: ' + updateError.message);
    } else {
      setSuccess('Password berhasil diubah. Mengalihkan ke halaman login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    }
    setLoading(false);
  }

  return (
    <div className="auth-card">
      <h2>Reset Password Baru</h2>
      <p className="auth-desc">Masukkan password baru Anda.</p>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="password">Password Baru</label>
        <input 
          id="password" 
          type="password" 
          required 
          placeholder="********" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm">Konfirmasi Password Baru</label>
        <input 
          id="confirm" 
          type="password" 
          required 
          placeholder="********" 
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="btn auth-submit" type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
        </button>
      </form>
    </div>
  );
}
