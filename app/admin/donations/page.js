import { createClient } from '@/lib/supabase/server';
import DonationsClient from './DonationsClient';

export default async function DonationsAdminPage() {
  const supabase = await createClient();
  const { data: donations } = await supabase.from('donations').select('*').order('created_at', { ascending: false });

  return (
    <div className="card">
      <div className="card-header flex-between">
        <h3>Kelola & Verifikasi Donasi</h3>
      </div>
      <div className="card-body p-0">
        <DonationsClient initialData={donations || []} />
      </div>
    </div>
  );
}
