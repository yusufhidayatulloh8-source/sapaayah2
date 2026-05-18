import { createClient } from '@/lib/supabase/server';
import SettingsClient from './SettingsClient';

export default async function SettingsAdminPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('*').order('setting_key');

  const settingsMap = {};
  if (settings) {
    settings.forEach(s => { settingsMap[s.setting_key] = s.setting_value });
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>Pengaturan Website</h3>
      </div>
      <div className="card-body">
        <SettingsClient initialSettings={settingsMap} />
      </div>
    </div>
  );
}
