'use client';

import { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/helpers';

export default function DonationsClient({ initialData }) {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const columns = [
    { key: 'donor_name', label: 'Donatur' },
    { key: 'amount', label: 'Nominal', render: (row) => `Rp ${row.amount?.toLocaleString('id-ID')}` },
    { key: 'transfer_date', label: 'Tanggal Transfer', render: (row) => formatDate(row.transfer_date) },
    { key: 'status', label: 'Status', render: (row) => (
      <span className={`badge ${row.status === 'verified' ? 'badge-success' : row.status === 'rejected' ? 'badge-danger' : 'badge-warning'}`}>
        {row.status}
      </span>
    )}
  ];

  function handleEdit(row) {
    setEditingItem(row);
    setIsEditing(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    const { data: saved, error } = await supabase.from('donations').update({ status: editingItem.status }).eq('id', editingItem.id).select().single();
    if (!error && saved) { setData(data.map(item => item.id === saved.id ? saved : item)); setIsEditing(false); }
    setLoading(false);
  }

  if (isEditing) {
    return (
      <div className="p-4">
        <h4>Review Donasi: {editingItem.donor_name}</h4>
        <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', marginTop: '1rem' }}>
          <p><strong>Email:</strong> {editingItem.donor_email || '-'}</p>
          <p><strong>No HP:</strong> {editingItem.donor_phone || '-'}</p>
          <p><strong>Nominal:</strong> Rp {editingItem.amount?.toLocaleString('id-ID')}</p>
          <p><strong>Bank Pengirim:</strong> {editingItem.bank_name || '-'}</p>
          <p><strong>Pesan:</strong> {editingItem.message || '-'}</p>
        </div>
        <form onSubmit={handleSave} className="form-grid">
          <div>
            <label>Ubah Status Donasi</label>
            <select className="form-control" value={editingItem.status} onChange={e => setEditingItem({...editingItem, status: e.target.value})}>
              <option value="pending">Pending</option>
              <option value="verified">Verified (Diterima)</option>
              <option value="rejected">Rejected (Ditolak)</option>
            </select>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn" disabled={loading}>{loading ? 'Menyimpan...' : 'Update Status'}</button>
            <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Kembali</button>
          </div>
        </form>
      </div>
    );
  }

  return <DataTable columns={columns} data={data} onEdit={handleEdit} />;
}
