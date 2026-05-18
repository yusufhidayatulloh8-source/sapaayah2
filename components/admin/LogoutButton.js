'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="btn btn-sm btn-outline" style={{ width: '100%', borderColor: '#ff4d4f', color: '#ff4d4f' }}>
      Logout
    </button>
  );
}
