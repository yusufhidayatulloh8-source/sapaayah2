import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/helpers';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase.from('events').select('title').eq('slug', slug).single();
  return { title: event ? `${event.title} - SAPA Ayah` : 'Event - SAPA Ayah' };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase.from('events').select('*').eq('slug', slug).single();

  if (!event) notFound();

  return (
    <>
      <section className="hero" style={{ minHeight: '300px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Event Detail</span>
            <h1>{event.title}</h1>
            <p>{formatDate(event.event_date)} {event.event_time ? `• ${event.event_time}` : ''}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-wrap" style={{ maxWidth: '860px', margin: '0 auto' }}>
            {event.thumbnail && (
              <img src={event.thumbnail} alt={event.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem' }} />
            )}

            <div className="event-meta" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div><strong>Tanggal:</strong> {formatDate(event.event_date)}</div>
              {event.event_time && <div><strong>Waktu:</strong> {event.event_time}</div>}
              {event.location && <div><strong>Lokasi:</strong> {event.location}</div>}
              <div><strong>Status:</strong> {event.status === 'upcoming' ? 'Akan Datang' : event.status === 'completed' ? 'Selesai' : 'Dibatalkan'}</div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: event.description || '' }} />

            {event.gmap_embed && (
              <div style={{ marginTop: '2rem' }}>
                <h3>Lokasi</h3>
                <div dangerouslySetInnerHTML={{ __html: event.gmap_embed }} />
              </div>
            )}

            {event.video_url && (
              <div style={{ marginTop: '2rem' }}>
                <h3>Video</h3>
                <div className="video-shell">
                  <iframe src={event.video_url} title={event.title} allowFullScreen loading="lazy"></iframe>
                </div>
              </div>
            )}

            <div style={{ marginTop: '2rem' }}>
              <Link className="btn btn-outline" href="/event">&larr; Kembali ke Event</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
