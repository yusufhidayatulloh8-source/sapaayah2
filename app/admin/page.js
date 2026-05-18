import { createClient } from '@/lib/supabase/server';
import StatCard from '@/components/admin/StatCard';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch counts
  const [
    { count: usersCount },
    { count: articlesCount },
    { count: programsCount },
    { count: eventsCount },
    { count: donationsCount },
    { data: recentLogs },
    { data: recentDonations }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('programs').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('donations').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('activity_logs').select('*, profiles(full_name)').order('created_at', { ascending: false }).limit(5),
    supabase.from('donations').select('*').eq('status', 'pending').order('created_at', { ascending: false }).limit(5)
  ]);

  return (
    <>
      <div className="stats-grid">
        <StatCard title="Total Pengguna" value={usersCount || 0} icon="👥" link="/admin/users" colorClass="bg-blue" />
        <StatCard title="Total Artikel" value={articlesCount || 0} icon="📄" link="/admin/articles" colorClass="bg-green" />
        <StatCard title="Program Aktif" value={programsCount || 0} icon="🎯" link="/admin/programs" colorClass="bg-orange" />
        <StatCard title="Total Event" value={eventsCount || 0} icon="📅" link="/admin/events" colorClass="bg-purple" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Donasi Pending</h3>
            {donationsCount > 0 && <span className="badge badge-warning">{donationsCount} Baru</span>}
          </div>
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Nominal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {(recentDonations || []).length > 0 ? (
                  recentDonations.map(d => (
                    <tr key={d.id}>
                      <td>{d.donor_name}</td>
                      <td>Rp {d.amount?.toLocaleString('id-ID')}</td>
                      <td><span className="badge badge-warning">{d.status}</span></td>
                      <td><Link href={`/admin/donations/${d.id}`} className="btn-text">Review</Link></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-center">Tidak ada donasi pending.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Log Aktivitas Terakhir</h3>
          </div>
          <div className="card-body p-0">
            <ul className="log-list">
              {(recentLogs || []).length > 0 ? (
                recentLogs.map(log => (
                  <li key={log.id} className="log-item">
                    <strong>{log.profiles?.full_name || 'System'}</strong> {log.action} pada <em>{log.entity}</em>
                    <br /><small className="text-muted">{new Date(log.created_at).toLocaleString('id-ID')}</small>
                  </li>
                ))
              ) : (
                <li className="log-item text-center">Belum ada aktivitas.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
