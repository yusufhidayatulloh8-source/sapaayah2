import Link from 'next/link';
import { formatDate } from '@/lib/helpers';

export default function ArticleCard({ article }) {
  return (
    <article className="card reveal">
      {article.thumbnail && (
        <img src={article.thumbnail} alt={article.title} loading="lazy" />
      )}
      <div className="card-body">
        <small>{article.category_name || article.categories?.name || 'Artikel'} / {formatDate(article.published_at)}</small>
        <h3>{article.title}</h3>
        <p>{article.excerpt ? article.excerpt.substring(0, 120) + '...' : ''}</p>
        <Link className="btn btn-sm" href={`/artikel/${article.slug}`}>Baca Selengkapnya</Link>
      </div>
    </article>
  );
}
