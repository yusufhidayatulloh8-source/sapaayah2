import Link from 'next/link';
import { formatDate } from '@/lib/helpers';

export default function EventCard({ event }) {
  return (
    <article className="event-card reveal">
      {event.thumbnail && (
        <img src={event.thumbnail} alt={event.title} loading="lazy" />
      )}
      <div className="event-body">
        <span className={`event-badge ${event.status === 'upcoming' ? 'badge-green' : event.status === 'completed' ? 'badge-gray' : 'badge-red'}`}>
          {event.status === 'upcoming' ? 'Akan Datang' : event.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
        </span>
        <h3>{event.title}</h3>
        <p>{formatDate(event.event_date)} {event.event_time ? `• ${event.event_time}` : ''}</p>
        {event.location && <p>{event.location}</p>}
        <Link className="btn btn-sm" href={`/event/${event.slug}`}>Detail Event</Link>
      </div>
    </article>
  );
}
