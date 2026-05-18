import { createClient } from '@/lib/supabase/server';
import SectionHead from '@/components/frontend/SectionHead';
import ProgramCard from '@/components/frontend/ProgramCard';

export const metadata = { title: 'Program - Yayasan SAPA Ayah' };

export default async function ProgramPage() {
  const supabase = await createClient();
  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .eq('status', 'active')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  return (
    <>
      <section className="hero" style={{ minHeight: '300px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Program SAPA</span>
            <h1>Program Pembelajaran Ayah</h1>
            <p>Dirancang untuk mendampingi perjalanan keayahaan di setiap tahap kehidupan.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead title="Semua Program" subtitle="Pilih program yang sesuai dengan tahap perjalanan Anda." />
          <div className="cards-grid">
            {(programs || []).map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
