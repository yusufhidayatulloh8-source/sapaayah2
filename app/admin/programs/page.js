import { createClient } from '@/lib/supabase/server';
import ProgramsClient from './ProgramsClient';

export default async function ProgramsAdminPage() {
  const supabase = await createClient();
  const { data: programs } = await supabase.from('programs').select('*').order('created_at', { ascending: false });

  return (
    <div className="card">
      <div className="card-header flex-between">
        <h3>Kelola Program SAPA</h3>
      </div>
      <div className="card-body p-0">
        <ProgramsClient initialData={programs || []} />
      </div>
    </div>
  );
}
