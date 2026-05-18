import { createClient } from '@/lib/supabase/server';
import EventsClient from './EventsClient';

export default async function EventsAdminPage() {
  const supabase = await createClient();
  const { data: events } = await supabase.from('events').select('*').order('event_date', { ascending: false });

  return (
    <div className="card">
      <div className="card-header flex-between">
        <h3>Kelola Event</h3>
      </div>
      <div className="card-body p-0">
        <EventsClient initialData={events || []} />
      </div>
    </div>
  );
}
