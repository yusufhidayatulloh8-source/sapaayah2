import { createClient } from '@/lib/supabase/server';
import ArticlesClient from './ArticlesClient';

export default async function ArticlesAdminPage() {
  const supabase = await createClient();
  
  const [
    { data: articles },
    { data: categories }
  ] = await Promise.all([
    supabase.from('articles').select('*, categories(name)').order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name')
  ]);

  return (
    <div className="card">
      <div className="card-header flex-between">
        <h3>Kelola Artikel</h3>
      </div>
      <div className="card-body p-0">
        <ArticlesClient initialData={articles || []} categories={categories || []} />
      </div>
    </div>
  );
}
