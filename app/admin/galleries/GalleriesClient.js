'use client';

import { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { createClient } from '@/lib/supabase/client';

export default function GalleriesClient({ initialData }) {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const columns = [
    { key: 'title', label: 'Judul Media' },
    { key: 'media_type', label: 'Tipe', render: (row) => row.media_type === 'video' ? '🎬 Video' : '📷 Foto' },
    { key: 'category', label: 'Kategori' },
  ];

  async function handleDelete(row) {
    if (confirm(`Yakin ingin menghapus media "${row.title}"?`)) {
      const { error } = await supabase.from('galleries').delete().eq('id', row.id);
      if (!error) setData(data.filter(item => item.id !== row.id));
    }
  }

  function handleEdit(row) {
    setEditingItem(row);
    setIsEditing(true);
  }

  function handleAddNew() {
    setEditingItem({ title: '', media_type: 'photo', file_path: '', video_url: '', category: '', description: '' });
    setIsEditing(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    const isNew = !editingItem.id;
    const itemToSave = { ...editingItem };

    if (isNew) {
      const { data: saved, error } = await supabase.from('galleries').insert([itemToSave]).select().single();
      if (!error && saved) { setData([saved, ...data]); setIsEditing(false); }
    } else {
      const { data: saved, error } = await supabase.from('galleries').update(itemToSave).eq('id', editingItem.id).select().single();
      if (!error && saved) { setData(data.map(item => item.id === saved.id ? saved : item)); setIsEditing(false); }
    }
    setLoading(false);
  }

  if (isEditing) {
    return (
      <div className="p-4">
        <h4>{editingItem.id ? 'Edit Media' : 'Tambah Media Baru'}</h4>
        <form onSubmit={handleSave} className="form-grid" style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ gridColumn: '1 / -1' }}><label>Judul Media</label><input type="text" className="form-control" required value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} /></div>
          
          <div>
            <label>Tipe Media</label>
            <select className="form-control" value={editingItem.media_type} onChange={e => setEditingItem({...editingItem, media_type: e.target.value})}>
              <option value="photo">Foto (Gambar)</option>
              <option value="video">Video (YouTube)</option>
            </select>
          </div>
          <div><label>Kategori Album (Bebas)</label><input type="text" className="form-control" value={editingItem.category || ''} onChange={e => setEditingItem({...editingItem, category: e.target.value})} /></div>

          {editingItem.media_type === 'video' ? (
            <div style={{ gridColumn: '1 / -1' }}>
              <label>URL Embed Video</label>
              <input type="url" className="form-control" value={editingItem.video_url || ''} onChange={e => setEditingItem({...editingItem, video_url: e.target.value})} placeholder="https://www.youtube.com/embed/..." />
            </div>
          ) : (
            <div style={{ gridColumn: '1 / -1' }}>
              <label>URL Gambar (Supabase Storage)</label>
              <input type="url" className="form-control" value={editingItem.file_path || ''} onChange={e => setEditingItem({...editingItem, file_path: e.target.value})} placeholder="https://..." />
            </div>
          )}
          
          <div style={{ gridColumn: '1 / -1' }}><label>Deskripsi (Opsional)</label><textarea className="form-control" rows="2" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})}></textarea></div>
          
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
        <button className="btn" onClick={handleAddNew}>+ Tambah Media</button>
      </div>
      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}
