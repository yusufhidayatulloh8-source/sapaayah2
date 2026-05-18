'use client';

import { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/helpers';

export default function ProgramsClient({ initialData }) {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const columns = [
    { key: 'title', label: 'Nama Program' },
    { key: 'schedule_info', label: 'Jadwal' },
    { key: 'is_featured', label: 'Unggulan', render: (row) => row.is_featured ? '⭐ Ya' : 'Tidak' },
    { key: 'status', label: 'Status', render: (row) => (
      <span className={`badge ${row.status === 'active' ? 'badge-success' : 'badge-gray'}`}>
        {row.status === 'active' ? 'Aktif' : 'Non-aktif'}
      </span>
    )}
  ];

  async function handleDelete(row) {
    if (confirm(`Yakin ingin menghapus program "${row.title}"?`)) {
      const { error } = await supabase.from('programs').delete().eq('id', row.id);
      if (!error) setData(data.filter(item => item.id !== row.id));
    }
  }

  function handleEdit(row) {
    setEditingItem(row);
    setIsEditing(true);
  }

  function handleAddNew() {
    setEditingItem({ title: '', slug: '', short_description: '', description: '', schedule_info: '', is_featured: false, status: 'active' });
    setIsEditing(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    const isNew = !editingItem.id;
    const itemToSave = { ...editingItem };
    if (!itemToSave.slug) itemToSave.slug = slugify(itemToSave.title);

    if (isNew) {
      const { data: saved, error } = await supabase.from('programs').insert([itemToSave]).select().single();
      if (!error && saved) { setData([saved, ...data]); setIsEditing(false); }
    } else {
      const { data: saved, error } = await supabase.from('programs').update(itemToSave).eq('id', editingItem.id).select().single();
      if (!error && saved) { setData(data.map(item => item.id === saved.id ? saved : item)); setIsEditing(false); }
    }
    setLoading(false);
  }

  if (isEditing) {
    return (
      <div className="p-4">
        <h4>{editingItem.id ? 'Edit Program' : 'Tambah Program'}</h4>
        <form onSubmit={handleSave} className="form-grid" style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div><label>Nama Program</label><input type="text" className="form-control" required value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} /></div>
          <div><label>Slug (URL)</label><input type="text" className="form-control" value={editingItem.slug} onChange={e => setEditingItem({...editingItem, slug: e.target.value})} placeholder="kosongkan untuk auto-generate" /></div>
          <div><label>Jadwal Singkat</label><input type="text" className="form-control" value={editingItem.schedule_info || ''} onChange={e => setEditingItem({...editingItem, schedule_info: e.target.value})} /></div>
          <div>
            <label>Status</label>
            <select className="form-control" value={editingItem.status} onChange={e => setEditingItem({...editingItem, status: e.target.value})}>
              <option value="active">Aktif</option><option value="inactive">Non-aktif</option>
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}><label>Deskripsi Singkat</label><textarea className="form-control" rows="2" value={editingItem.short_description || ''} onChange={e => setEditingItem({...editingItem, short_description: e.target.value})}></textarea></div>
          <div style={{ gridColumn: '1 / -1' }}><label>Deskripsi Lengkap (HTML)</label><textarea className="form-control" rows="8" required value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})}></textarea></div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="featured" checked={editingItem.is_featured} onChange={e => setEditingItem({...editingItem, is_featured: e.target.checked})} />
            <label htmlFor="featured" style={{ margin: 0 }}>Tandai sebagai Program Unggulan (Tampil di Home)</label>
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</button>
            <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Batal</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="p-3 border-bottom">
        <button className="btn" onClick={handleAddNew}>+ Tambah Program</button>
      </div>
      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}
