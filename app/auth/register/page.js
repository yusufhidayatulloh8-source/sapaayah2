'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirm) {
      return setError('Konfirmasi password tidak cocok.');
    }
    if (form.password.length < 8) {
      return setError('Password minimal 8 karakter.');
    }

    setLoading(true);
    const supabase = createClient();
    
    // Register user in Supabase Auth
    // Note: The trigger handle_new_user will automatically create a profiles entry
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSuccess('Registrasi berhasil. Silakan cek email Anda untuk konfirmasi (jika email konfirmasi diaktifkan), atau langsung login.');
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    }
    setLoading(false);
  }

  return (
    <div className="auth-card" style={{ maxWidth: '600px', width: '100%' }}>
      <h2>Registrasi Admin</h2>
      <p className="auth-desc">Daftar akses ke dashboard admin</p>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="full_name">Nama Lengkap</label>
        <input 
          id="full_name" 
          type="text" 
          required 
          placeholder="Nama Lengkap" 
          value={form.full_name}
          onChange={(e) => setForm({...form, full_name: e.target.value})}
        />

        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          required 
          placeholder="Email" 
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />

        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password" 
          required 
          placeholder="********" 
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <label htmlFor="confirm">Konfirmasi Password</label>
        <input 
          id="confirm" 
          type="password" 
          required 
          placeholder="********" 
          value={form.confirm}
          onChange={(e) => setForm({...form, confirm: e.target.value})}
        />

        <button className="btn auth-submit" type="submit" disabled={loading}>
          {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
        </button>
      </form>
      <p className="auth-help" style={{ marginTop: '1rem', textAlign: 'center' }}>
        Sudah punya akun? <Link href="/auth/login">Login</Link>
      </p>
    </div>
  );
}
