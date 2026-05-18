'use client';

import { usePathname } from 'next/navigation';
import { ADMIN_MENU_ITEMS, ADMIN_PAGE_DESCRIPTIONS } from '@/lib/constants';

export default function AdminTopbar() {
  const pathname = usePathname();
  const currentMenu = ADMIN_MENU_ITEMS.find(item => item.href === pathname) || { key: 'dashboard', label: 'Dashboard' };
  const description = ADMIN_PAGE_DESCRIPTIONS[currentMenu.key] || '';

  function toggleSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) sidebar.classList.toggle('open');
  }

  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <span></span><span></span><span></span>
        </button>
        <div className="page-title">
          <h2>{currentMenu.label}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="header-right">
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">Lihat Website</a>
      </div>
    </header>
  );
}
