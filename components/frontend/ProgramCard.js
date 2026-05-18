import Link from 'next/link';

export default function ProgramCard({ program }) {
  return (
    <article className="card reveal">
      {program.thumbnail && (
        <img src={program.thumbnail} alt={program.title} loading="lazy" />
      )}
      <div className="card-body">
        <h3>{program.title}</h3>
        <p>{program.short_description}</p>
        <Link className="btn btn-sm" href={`/program/${program.slug}`}>Lihat Detail</Link>
      </div>
    </article>
  );
}
