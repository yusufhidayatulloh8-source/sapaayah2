export default function TestimonialCard({ item }) {
  return (
    <article className="testi-card reveal">
      <blockquote>{item.testimonial}</blockquote>
      <div className="testi-author">
        <strong>{item.name}</strong>
        {item.role_or_job && <small>{item.role_or_job}</small>}
      </div>
    </article>
  );
}
