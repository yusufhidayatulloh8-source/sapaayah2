'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/constants';

export default function Header() {
  const pathname = usePathname();

  function toggleMenu() {
    const menu = document.querySelector('[data-menu]');
    if (menu) menu.classList.toggle('open');
  }

  return (
    <header className="site-header" id="top">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="Yayasan SAPA Ayah">
          <img src="/images/logo-sapa-mark.png" alt="Logo SAPA Ayah" loading="lazy" />
          <div>
            <strong>Yayasan SAPA Ayah</strong>
            <small>Sahabat Pembelajar Ayah</small>
          </div>
        </Link>
        <button className="menu-toggle" type="button" onClick={toggleMenu} aria-label="Buka Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className="main-nav" data-menu>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.page}
              className={pathname === item.href ? 'active' : ''}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link className="nav-login" href="/auth/login">Login Admin</Link>
          <Link className="btn btn-sm" href="/donasi">Donasi</Link>
        </nav>
      </div>
    </header>
  );
}
