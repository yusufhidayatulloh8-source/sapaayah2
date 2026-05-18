import { createClient } from '@/lib/supabase/server';
import SectionHead from '@/components/frontend/SectionHead';
import TestimonialCard from '@/components/frontend/TestimonialCard';

export const metadata = { title: 'Testimoni - Yayasan SAPA Ayah' };

export default async function TestimoniPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase.from('testimonials').select('*').eq('is_featured', true).order('created_at', { ascending: false });

  return (
    <>
      <section className="hero" style={{ minHeight: '300px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Testimoni</span>
            <h1>Cerita Nyata Para Ayah</h1>
            <p>Pengalaman transformatif dari ayah yang bertumbuh bersama SAPA.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead title="Testimoni Peserta" />
          <div className="testi-slider">
            {(testimonials || []).map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
          {(!testimonials || testimonials.length === 0) && <p>Belum ada testimoni.</p>}
        </div>
      </section>
    </>
  );
}
