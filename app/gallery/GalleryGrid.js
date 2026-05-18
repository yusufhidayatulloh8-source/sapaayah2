'use client';

import { useState } from 'react';

export default function GalleryGrid({ galleries }) {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'all' ? galleries : galleries.filter(g => g.media_type === filter);

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <button className={`btn btn-sm ${filter === 'all' ? '' : 'btn-outline'}`} onClick={() => setFilter('all')}>Semua</button>
        <button className={`btn btn-sm ${filter === 'photo' ? '' : 'btn-outline'}`} onClick={() => setFilter('photo')}>Foto</button>
        <button className={`btn btn-sm ${filter === 'video' ? '' : 'btn-outline'}`} onClick={() => setFilter('video')}>Video</button>
      </div>
      <div className="cards-grid">
        {filtered.map((item) => (
          <article key={item.id} className="card reveal">
            {item.media_type === 'photo' && item.file_path && (
              <img
                src={item.file_path}
                alt={item.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onClick={() => setLightbox(item.file_path)}
              />
            )}
            {item.media_type === 'video' && item.video_url && (
              <div className="video-shell">
                <iframe src={item.video_url} title={item.title} allowFullScreen loading="lazy"></iframe>
              </div>
            )}
            <div className="card-body">
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p>Belum ada media.</p>}

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox open" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Preview" />
        </div>
      )}
    </>
  );
}
