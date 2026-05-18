'use client';

import { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/helpers';

export default function CategoriesClient({ initialData }) {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const columns = [
    { key: 'name', label: 'Nama Kategori' },
    { key: 'slug', label: 'Slug' },
    { key: 'description', label: 'Deskripsi Singkat' }
  ];

  async function handleDelete(row) {
    if (confirm(`Yakin ingin menghapus kategori "${row.name}"? Artikel di dalamnya tidak akan terhapus.`)) {
      const { error } = await supabase.from('categories').delete().eq('id', row.id);
      if (!error) setData(data.filter(item => item.id !== row.id));
    }
  }

  function handleEdit(row) {
    setEditingItem(row);
    setIsEditing(true);
  }

  function handleAddNew() {
    setEditingItem({ name: '', slug: '', description: '' });
    setIsEditing(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    const isNew = !editingItem.id;
    const itemToSave = { ...editingItem };
    if (!itemToSave.slug) itemToSave.slug = slugify(itemToSave.name);

    if (isNew) {
      const { data: saved, error } = await supabase.from('categories').insert([itemToSave]).select().single();
      if (!error && saved) { setData([...data, saved]); setIsEditing(false); }
    } else {
      const { data: saved, error } = await supabase.from('categories').update(itemToSave).eq('id', editingItem.id).select().single();
      if (!error && saved) { setData(data.map(item => item.id === saved.id ? saved : item)); setIsEditing(false); }
    }
    setLoading(false);
  }

  if (isEditing) {
    return (
      <div className="p-4">
        <h4>{editingItem.id ? 'Edit Kategori' : 'Tambah Kategori'}</h4>
        <form onSubmit={handleSave} className="form-grid" style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div><label>Nama Kategori</label><input type="text" className="form-control" required value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} /></div>
          <div><label>Slug (URL)</label><input type="text" className="form-control" value={editingItem.slug} onChange={e => setEditingItem({...editingItem, slug: e.target.value})} placeholder="kosongkan untuk otomatis" /></div>
          <div style={{ gridColumn: '1 / -1' }}><label>Deskripsi</label><textarea className="form-control" rows="2" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})}></textarea></div>
          
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
        <button className="btn" onClick={handleAddNew}>+ Tambah Kategori</button>
      </div>
      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}
