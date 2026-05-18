import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProgramRegistrationForm from './ProgramRegistrationForm';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: program } = await supabase.from('programs').select('title').eq('slug', slug).single();
  return { title: program ? `${program.title} - SAPA Ayah` : 'Program - SAPA Ayah' };
}

export default async function ProgramDetailPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: program } = await supabase.from('programs').select('*').eq('slug', slug).single();

  if (!program) notFound();

  return (
    <>
      <section className="hero" style={{ minHeight: '300px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Program SAPA</span>
            <h1>{program.title}</h1>
            <p>{program.short_description}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-wrap" style={{ maxWidth: '860px', margin: '0 auto' }}>
            {program.thumbnail && (
              <img src={program.thumbnail} alt={program.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem' }} />
            )}
            <div dangerouslySetInnerHTML={{ __html: program.description || '' }} />

            {program.schedule_info && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--clr-cream, #f5f0e8)', borderRadius: '12px' }}>
                <strong>Jadwal:</strong>
                <p>{program.schedule_info}</p>
              </div>
            )}

            <div style={{ marginTop: '2rem' }}>
              <h3>Daftar Program Ini</h3>
              <ProgramRegistrationForm programId={program.id} />
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Link className="btn btn-outline" href="/program">&larr; Kembali ke Program</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
