import { createClient } from '@/lib/supabase/server';
import SectionHead from '@/components/frontend/SectionHead';
import GalleryGrid from './GalleryGrid';

export const metadata = { title: 'Gallery - Yayasan SAPA Ayah' };

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: galleries } = await supabase.from('galleries').select('*').order('created_at', { ascending: false });

  return (
    <>
      <section className="hero" style={{ minHeight: '300px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Media</span>
            <h1>Gallery SAPA Ayah</h1>
            <p>Dokumentasi foto dan video kegiatan yayasan.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead title="Foto & Video" />
          <GalleryGrid galleries={galleries || []} />
        </div>
      </section>
    </>
  );
}
