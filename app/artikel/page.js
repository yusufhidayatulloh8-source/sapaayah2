import { createClient } from '@/lib/supabase/server';
import SectionHead from '@/components/frontend/SectionHead';
import ArticleCard from '@/components/frontend/ArticleCard';
import Link from 'next/link';

export const metadata = { title: 'Artikel - Yayasan SAPA Ayah' };

export default async function ArtikelPage({ searchParams }) {
  const sp = await searchParams;
  const categorySlug = sp?.kategori || '';
  const supabase = await createClient();

  const { data: categories } = await supabase.from('categories').select('*').order('name');

  let query = supabase.from('articles').select('*, categories(name, slug)').eq('status', 'published').order('published_at', { ascending: false });

  if (categorySlug) {
    const cat = (categories || []).find(c => c.slug === categorySlug);
    if (cat) query = query.eq('category_id', cat.id);
  }

  const { data: articles } = await query;

  return (
    <>
      <section className="hero" style={{ minHeight: '300px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Artikel &amp; Stories</span>
            <h1>Blog SAPA Ayah</h1>
            <p>Wawasan, cerita, dan inspirasi untuk perjalanan keayahaan.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <Link className={`btn btn-sm ${!categorySlug ? '' : 'btn-outline'}`} href="/artikel">Semua</Link>
            {(categories || []).map(cat => (
              <Link key={cat.id} className={`btn btn-sm ${categorySlug === cat.slug ? '' : 'btn-outline'}`} href={`/artikel?kategori=${cat.slug}`}>
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="cards-grid">
            {(articles || []).map((article) => (
              <ArticleCard key={article.id} article={{ ...article, category_name: article.categories?.name }} />
            ))}
          </div>
          {(!articles || articles.length === 0) && <p>Belum ada artikel.</p>}
        </div>
      </section>
    </>
  );
}
