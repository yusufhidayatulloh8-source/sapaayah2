'use client';

import { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/helpers';

export default function ArticlesClient({ initialData, categories }) {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const columns = [
    { key: 'title', label: 'Judul' },
    { key: 'category_name', label: 'Kategori', render: (row) => row.categories?.name || '-' },
    { key: 'status', label: 'Status', render: (row) => (
      <span className={`badge ${row.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
        {row.status}
      </span>
    )},
    { key: 'views', label: 'Views' }
  ];

  async function handleDelete(row) {
    if (confirm(`Yakin ingin menghapus artikel "${row.title}"?`)) {
      const { error } = await supabase.from('articles').delete().eq('id', row.id);
      if (!error) {
        setData(data.filter(item => item.id !== row.id));
      } else {
        alert('Gagal menghapus data.');
      }
    }
  }

  function handleEdit(row) {
    setEditingItem(row);
    setIsEditing(true);
  }

  function handleAddNew() {
    setEditingItem({ title: '', slug: '', category_id: '', content: '', status: 'draft', tags: '', excerpt: '' });
    setIsEditing(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    const isNew = !editingItem.id;
    const itemToSave = { ...editingItem };
    
    if (!itemToSave.slug) {
      itemToSave.slug = slugify(itemToSave.title);
    }
    
    // Automatically set published_at if publishing for the first time
    if (itemToSave.status === 'published' && !itemToSave.published_at) {
        itemToSave.published_at = new Date().toISOString();
    }

    delete itemToSave.categories; // Remove relation data before saving

    if (isNew) {
      const { data: saved, error } = await supabase.from('articles').insert([itemToSave]).select('*, categories(name)').single();
      if (!error && saved) {
        setData([saved, ...data]);
        setIsEditing(false);
      } else {
        alert('Gagal menyimpan: ' + error?.message);
      }
    } else {
      const { data: saved, error } = await supabase.from('articles').update(itemToSave).eq('id', editingItem.id).select('*, categories(name)').single();
      if (!error && saved) {
        setData(data.map(item => item.id === saved.id ? saved : item));
        setIsEditing(false);
      } else {
        alert('Gagal mengupdate: ' + error?.message);
      }
    }
    setLoading(false);
  }

  if (isEditing) {
    return (
      <div className="p-4">
        <h4>{editingItem.id ? 'Edit Artikel' : 'Tambah Artikel'}</h4>
        <form onSubmit={handleSave} className="form-grid" style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label>Judul Artikel</label>
            <input type="text" className="form-control" required value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
          </div>
          <div>
            <label>Slug (URL)</label>
            <input type="text" className="form-control" value={editingItem.slug} onChange={e => setEditingItem({...editingItem, slug: e.target.value})} placeholder="kosongkan untuk auto-generate" />
          </div>
          <div>
            <label>Kategori</label>
            <select className="form-control" required value={editingItem.category_id || ''} onChange={e => setEditingItem({...editingItem, category_id: e.target.value})}>
              <option value="">-- Pilih Kategori --</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label>Status</label>
            <select className="form-control" value={editingItem.status} onChange={e => setEditingItem({...editingItem, status: e.target.value})}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Ringkasan (Excerpt)</label>
            <textarea className="form-control" rows="2" value={editingItem.excerpt || ''} onChange={e => setEditingItem({...editingItem, excerpt: e.target.value})}></textarea>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Konten</label>
            <textarea className="form-control" rows="10" required value={editingItem.content} onChange={e => setEditingItem({...editingItem, content: e.target.value})}></textarea>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Tags (pisahkan dengan koma)</label>
            <input type="text" className="form-control" value={editingItem.tags || ''} onChange={e => setEditingItem({...editingItem, tags: e.target.value})} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem' }}>
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
        <button className="btn" onClick={handleAddNew}>+ Tambah Artikel</button>
      </div>
      <DataTable 
        columns={columns} 
        data={data} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
      />
    </>
  );
}
