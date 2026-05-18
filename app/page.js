import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { formatDate, formatNumber, youtubeEmbedUrl } from '@/lib/helpers';
import SectionHead from '@/components/frontend/SectionHead';
import ProgramCard from '@/components/frontend/ProgramCard';
import EventCard from '@/components/frontend/EventCard';
import TestimonialCard from '@/components/frontend/TestimonialCard';

export const metadata = {
  title: 'Home - Yayasan SAPA Ayah',
};

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { data: featuredPrograms },
    { data: latestArticles },
    { data: latestEvents },
    { data: testimonials },
    { count: eventCount },
    { count: programCount },
    { data: settingsRows },
  ] = await Promise.all([
    supabase.from('programs').select('*').eq('status', 'active').order('is_featured', { ascending: false }).order('created_at', { ascending: false }).limit(6),
    supabase.from('articles').select('*, categories(name)').eq('status', 'published').order('published_at', { ascending: false }).limit(3),
    supabase.from('events').select('*').order('event_date', { ascending: false }).limit(4),
    supabase.from('testimonials').select('*').eq('is_featured', true).order('created_at', { ascending: false }).limit(3),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('programs').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('settings').select('setting_key, setting_value'),
  ]);

  const settings = {};
  if (settingsRows) {
    settingsRows.forEach(s => { settings[s.setting_key] = s.setting_value; });
  }

  const stats = [
    { label: 'Ayah Belajar', value: '2.000+' },
    { label: 'Event Terlaksana', value: String(eventCount || 0) },
    { label: 'Program Aktif', value: String(programCount || 0) },
    { label: 'Kolaborator', value: '38' },
  ];

  const journeyStages = [
    { number: '01', stage: 'SAPA Start', title: 'Calon Ayah', description: 'Persiapan mental, spiritual, dan pengetahuan pranikah.' },
    { number: '02', stage: 'SAPA Grow', title: 'Ayah Muda', description: 'Pembelajaran parenting, bonding, dan ritme keluarga baru.' },
    { number: '03', stage: 'SAPA Lead', title: 'Ayah Aktif', description: 'Penguatan peran kepemimpinan dan pengasuhan berbasis nilai.' },
    { number: '04', stage: 'SAPA Mentor', title: 'Ayah Pembina', description: 'Berbagi pengalaman dan membimbing ayah lain bertumbuh.' },
  ];

  const coreValues = [
    { title: 'Sahabat Tumbuh', description: 'Ayah bertumbuh bersama, bukan sendirian.' },
    { title: 'Belajar adalah Kekuatan', description: 'Pembelajar sejati adalah pemimpin keluarga sejati.' },
    { title: 'Kehadiran Lebih dari Hadiah', description: 'Waktu dan teladan adalah bentuk cinta terbaik.' },
    { title: 'Ayah Manusia Biasa', description: 'Setiap ayah berhak pulih, belajar, dan tumbuh.' },
    { title: 'Maskulinitas Rahmah', description: 'Tegas dalam prinsip, lembut dalam pendekatan.' },
  ];

  const heroVideoUrl = youtubeEmbedUrl(settings.hero_video_url || '', 'https://www.youtube.com/embed/dQw4w9WgXcQ');

  return (
    <>
      <section className="hero hero-home" id="home">
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Yayasan SAPA Ayah</span>
            <h1>Ayah Hebat Bukan Ayah Sempurna, Tapi Ayah yang Terus Bertumbuh</h1>
            <p>Menjadi sahabat tumbuh bagi para ayah Indonesia. Karena setiap ayah adalah pembelajar sepanjang hayat.</p>
            <div className="hero-actions">
              <Link className="btn" href="/program">Mulai Perjalanan</Link>
              <Link className="btn btn-outline" href="/kontak">Gabung Komunitas</Link>
            </div>
          </div>
          <div className="hero-panel reveal">
            <div className="hero-mark">
              <img src="/images/logo-sapa.svg" alt="SAPA Ayah" />
            </div>
            <p>&quot;Menyapa untuk Tumbuh, Tumbuh untuk Menyapa&quot;</p>
          </div>
        </div>
        <div className="container stats-grid hero-stats">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-item reveal">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft" id="about">
        <div className="container">
          <SectionHead title="Tentang SAPA Ayah" subtitle="Sahabat Pembelajar Ayah" />
          <div className="feature-grid">
            <article className="feature-copy reveal">
              <p>Yayasan SAPA Ayah adalah ruang belajar, refleksi, dukungan, dan pemulihan peran ayah. Kami percaya keterlibatan ayah yang sehat adalah fondasi keluarga yang kuat.</p>
              <p>Kami hadir bukan sekadar sebagai ruang pelatihan, tetapi sebagai ekosistem belajar yang hangat, praktis, dan bertumbuh bersama.</p>
              <Link className="btn btn-sm" href="/tentang">Kenali Yayasan</Link>
            </article>
            <aside className="quote-card reveal">
              <blockquote>&quot;Setiap ayah adalah pembelajar sepanjang hayat.&quot;</blockquote>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" id="journey">
        <div className="container">
          <SectionHead title="Perjalanan Keayahaan" subtitle="Setiap ayah memiliki tahap tumbuh yang unik. SAPA hadir untuk mendampingi dari titik mana pun." />
          <div className="journey-track">
            {journeyStages.map((stage) => (
              <article key={stage.number} className="journey-card reveal">
                <span>{stage.number}</span>
                <h3>{stage.stage}</h3>
                <strong>{stage.title}</strong>
                <p>{stage.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="programs">
        <div className="container">
          <SectionHead title="Program Unggulan" subtitle="Program pembelajaran ayah yang dirancang untuk mendampingi perjalanan keayahaan di setiap tahap kehidupan." />
          <div className="cards-grid">
            {(featuredPrograms || []).map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          <div className="section-action reveal">
            <Link className="btn btn-outline" href="/program">Lihat Semua Program</Link>
          </div>
        </div>
      </section>

      <section className="section" id="values">
        <div className="container">
          <SectionHead title="Nilai-Nilai Inti" subtitle="Prinsip yang memandu setiap langkah perjalanan ayah bersama SAPA." />
          <div className="value-grid">
            {coreValues.map((value) => (
              <article key={value.title} className="value-card reveal">
                <span aria-hidden="true"></span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="media">
        <div className="container">
          <SectionHead title="SAPA Media" subtitle="Konten inspiratif dan edukatif untuk menemani perjalanan keayahaan Anda." />
          <div className="media-grid">
            <article className="media-feature reveal">
              <div className="video-shell">
                <iframe src={heroVideoUrl} title="Video Profile" allowFullScreen loading="lazy"></iframe>
              </div>
              <div>
                <span className="eyebrow">Video &amp; Webinar</span>
                <h3>Video Profile Yayasan</h3>
                <p>Kenali semangat SAPA Ayah, perjalanan, dan dampak yang sudah dirasakan para ayah di berbagai daerah.</p>
              </div>
            </article>
            <div className="media-list reveal">
              <span className="eyebrow">SAPA Stories</span>
              {(latestArticles || []).map((article) => (
                <article key={article.id}>
                  <small>{article.categories?.name || 'Artikel'} / {formatDate(article.published_at)}</small>
                  <h4>{article.title}</h4>
                  <Link href={`/artikel/${article.slug}`}>Baca Selengkapnya</Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="events">
        <div className="container">
          <SectionHead title="Event & Kegiatan" subtitle="Bergabung dengan kegiatan yang mempertemukan para ayah pembelajar." />
          <div className="event-list">
            {(latestEvents || []).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="section-action reveal">
            <Link className="btn btn-outline" href="/event">Lihat Semua Event</Link>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHead title="Testimoni Peserta" subtitle="Cerita nyata dari ayah yang bertumbuh bersama SAPA Ayah." />
          <div className="testi-slider">
            {(testimonials || []).map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Partner & Collaboration" subtitle="Bersama lembaga, komunitas, sekolah, dan mitra sosial." />
          <div className="partner-list reveal">
            <div>Mitra Pendidikan</div>
            <div>Komunitas Ayah</div>
            <div>Lembaga Sosial</div>
            <div>Psikolog Partner</div>
            <div>Media Kolaborator</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-band reveal">
          <div>
            <h2>Karena Anak Tidak Membutuhkan Ayah Sempurna</h2>
            <p>Mereka membutuhkan ayah yang hadir. Perjalanan dimulai dari keputusan untuk belajar dan bertumbuh.</p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-light" href="/kontak">Bergabung</Link>
            <Link className="btn btn-ghost-light" href="/donasi">Donasi</Link>
            <Link className="btn btn-ghost-light" href="/kontak">Kolaborasi</Link>
          </div>
        </div>
      </section>
    </>
  );
}
