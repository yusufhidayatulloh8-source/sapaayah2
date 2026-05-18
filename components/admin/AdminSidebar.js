import Link from 'next/link';
import { ADMIN_MENU_ITEMS } from '@/lib/constants';
import LogoutButton from './LogoutButton';

export default function AdminSidebar({ userProfile }) {
  const roleName = userProfile?.role_id === 1 ? 'Administrator' : 'User';

  return (
    <aside className="admin-sidebar" id="adminSidebar">
      <div className="admin-brand">
        <img src="/images/logo-sapa-mark.png" alt="SAPA Ayah" />
        <div>
          <strong>SAPA Ayah</strong>
          <small>CMS Panel</small>
        </div>
      </div>
      
      <div className="admin-user-info">
        <div className="avatar">
          {userProfile?.full_name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <strong>{userProfile?.full_name || 'Admin'}</strong>
          <small>{roleName}</small>
        </div>
      </div>

      <nav className="admin-nav">
        <ul>
          {ADMIN_MENU_ITEMS.map(item => (
            <li key={item.key}>
              <Link href={item.href}>
                <span className="icon"></span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 'auto', padding: '1rem' }}>
          <LogoutButton />
        </div>
      </nav>
    </aside>
  );
}
