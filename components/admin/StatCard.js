export default function StatCard({ title, value, icon, link, colorClass }) {
  return (
    <div className={`stat-card ${colorClass || ''}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
      {link && (
        <a href={link} className="stat-link">Lihat Detail &rarr;</a>
      )}
    </div>
  );
}
