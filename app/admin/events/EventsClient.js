'use client';

import { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { createClient } from '@/lib/supabase/client';
import { slugify, formatDate } from '@/lib/helpers';

export default function EventsClient({ initialData }) {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const columns = [
    { key: 'title', label: 'Nama Event' },
    { key: 'event_date', label: 'Tanggal', render: (row) => formatDate(row.event_date) },
    { key: 'location', label: 'Lokasi' },
    { key: 'status', label: 'Status', render: (row) => (
      <span className={`badge ${row.status === 'upcoming' ? 'badge-success' : row.status === 'completed' ? 'badge-gray' : 'badge-danger'}`}>
        {row.status}
      </span>
    )}
  ];

  async function handleDelete(row) {
    if (confirm(`Yakin ingin menghapus event "${row.title}"?`)) {
      const { error } = await supabase.from('events').delete().eq('id', row.id);
      if (!error) setData(data.filter(item => item.id !== row.id));
    }
  }

  function handleEdit(row) {
    setEditingItem(row);
    setIsEditing(true);
  }

  function handleAddNew() {
    setEditingItem({ title: '', slug: '', description: '', event_date: '', event_time: '', location: '', gmap_embed: '', video_url: '', status: 'upcoming' });
    setIsEditing(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    const isNew = !editingItem.id;
    const itemToSave = { ...editingItem };
    if (!itemToSave.slug) itemToSave.slug = slugify(itemToSave.title);

    if (isNew) {
      const { data: saved, error } = await supabase.from('events').insert([itemToSave]).select().single();
      if (!error && saved) { setData([saved, ...data]); setIsEditing(false); }
    } else {
      const { data: saved, error } = await supabase.from('events').update(itemToSave).eq('id', editingItem.id).select().single();
      if (!error && saved) { setData(data.map(item => item.id === saved.id ? saved : item)); setIsEditing(false); }
    }
    setLoading(false);
  }

  if (isEditing) {
    return (
      <div className="p-4">
        <h4>{editingItem.id ? 'Edit Event' : 'Tambah Event'}</h4>
        <form onSubmit={handleSave} className="form-grid" style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div><label>Nama Event</label><input type="text" className="form-control" required value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} /></div>
          <div><label>Slug (URL)</label><input type="text" className="form-control" value={editingItem.slug} onChange={e => setEditingItem({...editingItem, slug: e.target.value})} placeholder="kosongkan untuk auto-generate" /></div>
          <div><label>Tanggal</label><input type="date" className="form-control" required value={editingItem.event_date} onChange={e => setEditingItem({...editingItem, event_date: e.target.value})} /></div>
          <div><label>Waktu (Jam)</label><input type="text" className="form-control" value={editingItem.event_time || ''} onChange={e => setEditingItem({...editingItem, event_time: e.target.value})} placeholder="Misal: 09:00 - 12:00 WIB" /></div>
          <div><label>Lokasi</label><input type="text" className="form-control" value={editingItem.location || ''} onChange={e => setEditingItem({...editingItem, location: e.target.value})} /></div>
          <div>
            <label>Status</label>
            <select className="form-control" value={editingItem.status} onChange={e => setEditingItem({...editingItem, status: e.target.value})}>
              <option value="upcoming">Akan Datang</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}><label>Deskripsi (HTML)</label><textarea className="form-control" rows="5" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})}></textarea></div>
          <div style={{ gridColumn: '1 / -1' }}><label>Embed Google Maps (Iframe)</label><textarea className="form-control" rows="2" value={editingItem.gmap_embed || ''} onChange={e => setEditingItem({...editingItem, gmap_embed: e.target.value})}></textarea></div>
          <div style={{ gridColumn: '1 / -1' }}><label>URL Video Dokumentasi (YouTube)</label><input type="url" className="form-control" value={editingItem.video_url || ''} onChange={e => setEditingItem({...editingItem, video_url: e.target.value})} /></div>
          
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
        <button className="btn" onClick={handleAddNew}>+ Tambah Event</button>
      </div>
      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}
