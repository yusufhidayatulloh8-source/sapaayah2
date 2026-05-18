'use client';

import { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/helpers';

export default function ContactsClient({ initialData }) {
  const [data, setData] = useState(initialData);
  const [isViewing, setIsViewing] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);
  const supabase = createClient();

  const columns = [
    { key: 'name', label: 'Pengirim' },
    { key: 'subject', label: 'Subjek' },
    { key: 'created_at', label: 'Tanggal', render: (row) => formatDate(row.created_at) },
    { key: 'is_read', label: 'Status', render: (row) => (
      <span className={`badge ${row.is_read ? 'badge-gray' : 'badge-primary'}`}>
        {row.is_read ? 'Sudah Dibaca' : 'Baru'}
      </span>
    )}
  ];

  async function handleView(row) {
    setViewingItem(row);
    setIsViewing(true);

    if (!row.is_read) {
      const { error } = await supabase.from('contacts').update({ is_read: true }).eq('id', row.id);
      if (!error) {
        setData(data.map(item => item.id === row.id ? { ...item, is_read: true } : item));
        setViewingItem({ ...row, is_read: true });
      }
    }
  }

  async function handleDelete(row) {
    if (confirm(`Hapus pesan dari "${row.name}"?`)) {
      const { error } = await supabase.from('contacts').delete().eq('id', row.id);
      if (!error) setData(data.filter(item => item.id !== row.id));
    }
  }

  if (isViewing) {
    return (
      <div className="p-4">
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <h4>Detail Pesan Masuk</h4>
          <button className="btn btn-outline btn-sm" onClick={() => setIsViewing(false)}>Kembali</button>
        </div>
        
        <div style={{ background: '#fff', border: '1px solid var(--border)', padding: '2rem', borderRadius: '8px' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>{viewingItem.subject || 'Tanpa Subjek'}</h2>
          <div style={{ color: '#555', marginBottom: '2rem', display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <div><strong>Dari:</strong> {viewingItem.name}</div>
            <div><strong>Email:</strong> {viewingItem.email || '-'}</div>
            <div><strong>No HP:</strong> {viewingItem.phone || '-'}</div>
            <div><strong>Tanggal:</strong> {formatDate(viewingItem.created_at)}</div>
          </div>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {viewingItem.message}
          </div>
        </div>
      </div>
    );
  }

  return <DataTable columns={columns} data={data} onView={handleView} onDelete={handleDelete} />;
}
