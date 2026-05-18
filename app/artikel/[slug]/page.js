import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/helpers';
import Link from 'next/link';
import CommentForm from './CommentForm';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('articles').select('title').eq('slug', slug).single();
  return { title: data ? `${data.title} - SAPA Ayah` : 'Artikel - SAPA Ayah' };
}

export default async function ArtikelDetailPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase.from('articles').select('*, categories(name, slug)').eq('slug', slug).single();
  if (!article) notFound();

  // Increment views
  await supabase.from('articles').update({ views: (article.views || 0) + 1 }).eq('id', article.id);

  const { data: comments } = await supabase.from('comments').select('*').eq('article_id', article.id).eq('status', 'approved').order('created_at', { ascending: false });

  const { data: related } = await supabase.from('articles').select('id, title, slug, thumbnail, published_at, categories(name)').eq('status', 'published').neq('id', article.id).eq('category_id', article.category_id).limit(3);

  return (
    <>
      <section className="hero" style={{ minHeight: '300px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">{article.categories?.name || 'Artikel'}</span>
            <h1>{article.title}</h1>
            <p>{formatDate(article.published_at)} • {article.views || 0} views</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-wrap" style={{ maxWidth: '860px', margin: '0 auto' }}>
            {article.thumbnail && (
              <img src={article.thumbnail} alt={article.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem' }} />
            )}

            {article.tags && (
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {article.tags.split(',').map((tag, i) => (
                  <span key={i} className="btn btn-sm btn-outline" style={{ pointerEvents: 'none' }}>{tag.trim()}</span>
                ))}
              </div>
            )}

            <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Comments */}
            <div style={{ marginTop: '3rem' }}>
              <h3>Komentar ({(comments || []).length})</h3>
              {(comments || []).map((c) => (
                <div key={c.id} style={{ padding: '1rem', marginBottom: '1rem', background: 'var(--clr-cream, #f5f0e8)', borderRadius: '8px' }}>
                  <strong>{c.name || 'Anonim'}</strong> <small>• {formatDate(c.created_at)}</small>
                  <p>{c.comment}</p>
                </div>
              ))}
              <CommentForm articleId={article.id} />
            </div>

            {/* Related articles */}
            {related && related.length > 0 && (
              <div style={{ marginTop: '3rem' }}>
                <h3>Artikel Terkait</h3>
                <div className="cards-grid">
                  {related.map((r) => (
                    <article key={r.id} className="card reveal">
                      <div className="card-body">
                        <small>{r.categories?.name || 'Artikel'} / {formatDate(r.published_at)}</small>
                        <h4>{r.title}</h4>
                        <Link className="btn btn-sm" href={`/artikel/${r.slug}`}>Baca</Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '2rem' }}>
              <Link className="btn btn-outline" href="/artikel">&larr; Semua Artikel</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
