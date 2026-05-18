import '@/styles/admin.css';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Panel - SAPA Ayah CMS',
};

export default async function AdminLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <html lang="id">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="admin-shell">
          <AdminSidebar userProfile={profile} />
          <div className="main-panel">
            <AdminTopbar userProfile={profile} />
            <div className="admin-content" style={{ padding: '2rem' }}>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
