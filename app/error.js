// Menggunakan page.js untuk error handling default Next.js
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#B3261E' }}>Terjadi Kesalahan</h2>
      <p style={{ marginBottom: '2rem', color: '#555' }}>Maaf, terjadi kesalahan tak terduga pada aplikasi.</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => reset()} className="btn">Coba Lagi</button>
        <Link href="/" className="btn btn-outline">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}
