import SectionHead from '@/components/frontend/SectionHead';

export const metadata = { title: 'Tentang Kami - Yayasan SAPA Ayah' };

export default function TentangPage() {
  const timeline = [
    { year: '2020', title: 'Lahirnya Ide', desc: 'Komunitas kecil ayah yang ingin belajar bersama.' },
    { year: '2021', title: 'Komunitas Berkembang', desc: 'Mulai menyelenggarakan kelas dan diskusi rutin.' },
    { year: '2022', title: 'Yayasan Resmi', desc: 'SAPA Ayah resmi menjadi yayasan berbadan hukum.' },
    { year: '2023', title: 'Ekspansi Program', desc: 'Meluncurkan SAPA Journey, Class, Camp, dan Recovery.' },
    { year: '2024', title: 'Dampak Nasional', desc: 'Menjangkau ribuan ayah di berbagai kota Indonesia.' },
  ];

  const visi = 'Menjadi ekosistem belajar terdepan bagi ayah Indonesia yang hangat, inklusif, dan transformatif.';
  const misi = [
    'Menyediakan program pengasuhan berkualitas untuk ayah.',
    'Membangun komunitas ayah yang saling menguatkan.',
    'Mendorong kesadaran peran ayah dalam keluarga.',
    'Mengembangkan riset dan konten edukatif tentang keayahaan.',
  ];

  return (
    <>
      <section className="hero" style={{ minHeight: '340px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Tentang Kami</span>
            <h1>Mengenal Yayasan SAPA Ayah</h1>
            <p>Sahabat Pembelajar Ayah — ruang belajar, refleksi, dukungan, dan pemulihan peran ayah.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Visi" subtitle={visi} />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHead title="Misi" />
          <div className="value-grid">
            {misi.map((m, i) => (
              <article key={i} className="value-card reveal">
                <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <p>{m}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Perjalanan Kami" subtitle="Milestone penting dalam perjalanan SAPA Ayah." />
          <div className="journey-track">
            {timeline.map((item) => (
              <article key={item.year} className="journey-card reveal">
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
