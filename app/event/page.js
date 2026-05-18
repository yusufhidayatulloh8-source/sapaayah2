import { createClient } from '@/lib/supabase/server';
import SectionHead from '@/components/frontend/SectionHead';
import EventCard from '@/components/frontend/EventCard';

export const metadata = { title: 'Event & Kegiatan - Yayasan SAPA Ayah' };

export default async function EventPage() {
  const supabase = await createClient();
  const { data: events } = await supabase.from('events').select('*').order('event_date', { ascending: false });

  return (
    <>
      <section className="hero" style={{ minHeight: '300px' }}>
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <span className="eyebrow">Event &amp; Kegiatan</span>
            <h1>Jadwal Event SAPA Ayah</h1>
            <p>Bergabung dengan kegiatan yang mempertemukan para ayah pembelajar.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead title="Semua Event" />
          <div className="event-list">
            {(events || []).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {(!events || events.length === 0) && <p>Belum ada event.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
