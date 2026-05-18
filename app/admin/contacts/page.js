import { createClient } from '@/lib/supabase/server';
import ContactsClient from './ContactsClient';

export default async function ContactsAdminPage() {
  const supabase = await createClient();
  const { data: contacts } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });

  return (
    <div className="card">
      <div className="card-header flex-between">
        <h3>Pesan Masuk (Kontak)</h3>
      </div>
      <div className="card-body p-0">
        <ContactsClient initialData={contacts || []} />
      </div>
    </div>
  );
}
