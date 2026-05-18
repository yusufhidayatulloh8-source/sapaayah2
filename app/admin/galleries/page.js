import { createClient } from '@/lib/supabase/server';
import GalleriesClient from './GalleriesClient';

export default async function GalleriesAdminPage() {
  const supabase = await createClient();
  const { data: galleries } = await supabase.from('galleries').select('*').order('created_at', { ascending: false });

  return (
    <div className="card">
      <div className="card-header flex-between">
        <h3>Kelola Galeri Media</h3>
      </div>
      <div className="card-body p-0">
        <GalleriesClient initialData={galleries || []} />
      </div>
    </div>
  );
}
