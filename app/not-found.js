import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#1B3B36', fontWeight: 800 }}>404</h2>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Halaman Tidak Ditemukan</h3>
      <p style={{ marginBottom: '2rem', color: '#555' }}>Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <Link href="/" className="btn">Kembali ke Beranda</Link>
    </div>
  );
}
