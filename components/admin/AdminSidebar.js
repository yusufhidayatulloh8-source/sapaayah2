'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_MENU_ITEMS } from '@/lib/constants';

const ICONS = {
  'dashboard': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
  'articles': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6M8 11h8"/></svg>',
  'programs': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a4 4 0 0 1 4 4c0 2.2-1.8 4-4 4s-4-1.8-4-4a4 4 0 0 1 4-4Z"/><path d="M6.5 20a5.5 5.5 0 0 1 11 0"/></svg>',
  'program-registrations': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 4h8l2 2v14H6V6z"/><path d="M15 4v4h4"/><path d="M9 12h6M9 16h4"/></svg>',
  'events': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
  'galleries': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="m8 14 3-3 2 2 3-3 2 2"/><circle cx="9" cy="9" r="1.2"/></svg>',
  'testimonials': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 3V8a2 2 0 0 1 2-2Z"/></svg>',
  'donations': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V5m0 0-2 2m2-2 2 2"/><path d="M8 14h8"/></svg>',
  'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
  'contacts': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  'comments': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16v10H8l-4 4z"/></svg>',
  'categories': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h8v8H3zM13 7h8v5h-8zM13 14h8v1"/></svg>',
  'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"/><path d="m19.4 15 1.2 2-2 3.5-2.3-.3a7.7 7.7 0 0 1-1.7 1l-.7 2.2H10l-.7-2.2c-.6-.2-1.2-.5-1.8-1l-2.2.3-2-3.5 1.2-2a8.5 8.5 0 0 1 0-2l-1.2-2 2-3.5 2.2.3c.6-.4 1.2-.7 1.8-1L10 .6h4l.7 2.2c.6.2 1.1.5 1.7 1l2.3-.3 2 3.5-1.2 2a8.5 8.5 0 0 1 0 2Z"/></svg>',
  'logs': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>',
};

export default function AdminSidebar({ userProfile }) {
  const pathname = usePathname();

  function toggleSidebar() {
    document.querySelector('.sidebar')?.classList.toggle('open');
    document.querySelector('.sidebar-backdrop')?.classList.toggle('show');
  }

  return (
    <>
      <aside className="sidebar" data-sidebar>
        <div className="brand-admin">
          <div className="brand-badge" aria-hidden="true">
            <img src="/images/logo-sapa-mark.png" alt="" />
          </div>
          <div className="brand-text">
            <strong>SAPA Ayah</strong>
            <small>Admin Panel</small>
          </div>
          <button className="sidebar-collapse" type="button" onClick={toggleSidebar} aria-label="Collapse Sidebar">&lt;</button>
        </div>
        
        <nav className="nav-admin">
          {ADMIN_MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const svgContent = ICONS[item.key] || ICONS['dashboard'];
            const svgIcon = svgContent.replace('<svg ', '<svg class="menu-icon-svg" ');
            
            return (
              <Link key={item.key} href={item.href} className={isActive ? 'active' : ''}>
                <span className="nav-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svgIcon }}></span>
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="sidebar-user">
          <div className="avatar-mini">
            {userProfile?.full_name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="sidebar-user-text">
            <strong>{userProfile?.full_name || 'Admin'}</strong>
            <small>{userProfile?.email || 'admin@sapaayah.org'}</small>
          </div>
        </div>
      </aside>
      <div className="sidebar-backdrop" data-sidebar-backdrop onClick={toggleSidebar}></div>
    </>
  );
}
