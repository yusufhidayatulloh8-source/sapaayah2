'use client';

import { useState } from 'react';

export default function DataTable({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onView,
  searchPlaceholder = "Cari..."
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Simple client-side search filtering across all text values
  const filteredData = data.filter(row => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="table-container">
      <div className="table-toolbar">
        <input 
          type="search" 
          placeholder={searchPlaceholder} 
          className="form-control"
          style={{ maxWidth: '300px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.label}</th>
            ))}
            {(onEdit || onDelete || onView) && <th width="120">Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, i) => (
              <tr key={row.id || i}>
                {columns.map((col, j) => (
                  <td key={j}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <td className="actions">
                    {onView && <button className="btn-icon text-primary" onClick={() => onView(row)} title="Lihat">&#128065;</button>}
                    {onEdit && <button className="btn-icon text-warning" onClick={() => onEdit(row)} title="Edit">&#9998;</button>}
                    {onDelete && <button className="btn-icon text-danger" onClick={() => onDelete(row)} title="Hapus">&#128465;</button>}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">Data tidak ditemukan.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
