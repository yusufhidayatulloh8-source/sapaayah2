'use client';

import { usePathname } from 'next/navigation';
import { ADMIN_MENU_ITEMS, ADMIN_PAGE_DESCRIPTIONS } from '@/lib/constants';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminTopbar({ userProfile }) {
  const pathname = usePathname();
  const currentMenu = ADMIN_MENU_ITEMS.find(item => item.href === pathname) || { key: 'dashboard', label: 'Dashboard' };
  const description = ADMIN_PAGE_DESCRIPTIONS[currentMenu.key] || 'Kelola konten dan data Yayasan SAPA Ayah.';
  const [profileOpen, setProfileOpen] = useState(false);

  function toggleSidebar() {
    document.querySelector('.sidebar')?.classList.toggle('open');
    document.querySelector('.sidebar-backdrop')?.classList.toggle('show');
  }

  return (
    <div className="topbar">
      <div className="topbar-title">
        <button className="sidebar-mobile-btn" type="button" onClick={toggleSidebar} aria-label="Buka menu">MENU</button>
        <h1>{currentMenu.label}</h1>
        <small>{description}</small>
      </div>
      <div className={`profile-menu ${profileOpen ? 'open' : ''}`} data-profile-menu>
        <button className="user-chip" type="button" onClick={() => setProfileOpen(!profileOpen)} data-profile-btn>
          <img src={userProfile?.profile_photo || '/images/logo-sapa-mark.png'} alt="Profile" />
          <span>{userProfile?.full_name || 'Admin'}</span>
          <small>{userProfile?.role_id === 1 ? 'Administrator' : 'User'}</small>
        </button>
        <div className="profile-dropdown">
          <Link href="/admin/profile">Edit Profile</Link>
          <Link href="/admin/settings">Pengaturan Akun</Link>
          <hr style={{ margin: '0.5rem 0', borderColor: 'var(--border)' }} />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
