import { createClient } from '@/lib/supabase/server';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesAdminPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');

  return (
    <div className="card">
      <div className="card-header flex-between">
        <h3>Kelola Kategori Artikel</h3>
      </div>
      <div className="card-body p-0">
        <CategoriesClient initialData={categories || []} />
      </div>
    </div>
  );
}
