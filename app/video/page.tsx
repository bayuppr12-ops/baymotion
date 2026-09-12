'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { videos } from '@/data/videos';
import { materials } from '@/data/materials';

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

function VideoPageContent() {
  const searchParams = useSearchParams();
  const targetId = searchParams.get('id');

  const [localVideos, setLocalVideos] = useState(videos);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [editMode, setEditMode] = useState(false);
  const [editUrl, setEditUrl] = useState('');

  useEffect(() => {
    if (targetId) {
      const found = localVideos.find((v) => v.id === targetId);
      if (found) {
        setSelectedVideo(found);
        setSelectedSport(found.material);
      }
    }
  }, [targetId, localVideos]);

  const filteredVideos = localVideos.filter((v) => {
    if (selectedSport === 'all') return true;
    return v.material === selectedSport;
  });

  const videoId = getYouTubeId(selectedVideo.youtubeUrl);

  const handleSaveUrl = () => {
    setLocalVideos((prev) =>
      prev.map((v) => (v.id === selectedVideo.id ? { ...v, youtubeUrl: editUrl } : v))
    );
    setSelectedVideo((prev) => ({ ...prev, youtubeUrl: editUrl }));
    setEditMode(false);
  };

  const getSubCategoryLabel = (matId: string, subId: string) => {
    const mat = materials.find((m) => m.id === matId);
    const sub = mat?.subMaterials.find((s) => s.id === subId);
    if (sub?.category === 'lapangan') return '🏟️ Lapangan';
    return '⚡ Teknik';
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(255, 107, 26, 0.25)',
            border: '1px solid #FF6B1A',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '12px',
            color: '#FF9F43',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            fontSize: '0.82rem',
          }}
        >
          📹 KHUSUS MATERI TEKNIK & LAPANGAN
        </div>
        <h1
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: '#FFFFFF',
            marginBottom: '8px',
          }}
        >
          🎥 Tempat Link Video Pembelajaran
        </h1>
        <p style={{ color: '#D1D5DB', fontSize: '0.95rem' }}>
          Wadah video pembelajaran khusus poin <strong>Teknik Dasar</strong> dan <strong>Visual Lapangan</strong> dari seluruh cabang olahraga. Guru dapat menambahkan link YouTube di bawah ini.
        </p>

        {/* Filter per Olahraga */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedSport('all')}
            style={{
              background: selectedSport === 'all' ? '#FF6B1A' : '#242424',
              border: `1.5px solid ${selectedSport === 'all' ? '#FF6B1A' : '#3F3F46'}`,
              color: '#FFFFFF',
              borderRadius: '100px',
              padding: '8px 16px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            🌟 Semua Olahraga
          </button>
          {materials.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedSport(m.id)}
              style={{
                background: selectedSport === m.id ? '#FF6B1A' : '#242424',
                border: `1.5px solid ${selectedSport === m.id ? '#FF6B1A' : '#3F3F46'}`,
                color: '#FFFFFF',
                borderRadius: '100px',
                padding: '8px 16px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              {m.emoji} {m.title}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        {/* Main Video Area */}
        <div>
          {/* Player Frame */}
          <div
            style={{
              background: '#171717',
              borderRadius: '20px',
              overflow: 'hidden',
              aspectRatio: '16/9',
              marginBottom: '20px',
              border: '1.5px solid #3F3F46',
              position: 'relative',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
            }}
          >
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title={selectedVideo.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
              />
            ) : selectedVideo.imageUrl ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#171717',
                  position: 'relative',
                  padding: '12px',
                }}
              >
                <img
                  src={selectedVideo.imageUrl}
                  alt={selectedVideo.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  color: '#D1D5DB',
                  padding: '40px',
                  textAlign: 'center',
                  background: '#171717',
                }}
              >
                <div style={{ fontSize: '4rem' }}>📹</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF' }}>
                  Tempat Link Video Belum Diisi
                </div>
                <div style={{ fontSize: '0.9rem', maxWidth: '380px', color: '#D1D5DB', lineHeight: 1.5 }}>
                  Wadah video untuk {selectedVideo.title} telah tersedia. Guru dapat menambahkan link YouTube di bawah ini.
                </div>
                <button
                  className="btn-secondary"
                  onClick={() => { setEditMode(true); setEditUrl(selectedVideo.youtubeUrl); }}
                  style={{ marginTop: '8px' }}
                >
                  + Tambahkan Link YouTube
                </button>
              </div>
            )}
          </div>

          {/* Video Info Card */}
          <div
            style={{
              background: '#242424',
              border: '1.5px solid #3F3F46',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  fontWeight: 700,
                  background: 'rgba(255, 107, 26, 0.2)',
                  color: '#FF9F43',
                  border: '1px solid rgba(255, 107, 26, 0.4)',
                }}
              >
                {getSubCategoryLabel(selectedVideo.material, selectedVideo.subMaterial)}
              </span>
            </div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '8px' }}>
              {selectedVideo.title}
            </h2>
            <p style={{ color: '#D1D5DB', fontSize: '0.95rem', marginBottom: '16px', lineHeight: 1.6 }}>
              {selectedVideo.description}
            </p>

            {/* URL management */}
            {editMode ? (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  className="input-field"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  placeholder="Masukkan URL YouTube: https://youtube.com/watch?v=..."
                  style={{ flex: 1, minWidth: '200px' }}
                />
                <button className="btn-success" onClick={handleSaveUrl} style={{ whiteSpace: 'nowrap' }}>
                  ✅ Simpan
                </button>
                <button className="btn-ghost" onClick={() => setEditMode(false)}>
                  Batal
                </button>
              </div>
            ) : (
              <button
                className="btn-ghost"
                onClick={() => { setEditMode(true); setEditUrl(selectedVideo.youtubeUrl); }}
                style={{ fontSize: '0.85rem' }}
              >
                ✏️ {selectedVideo.youtubeUrl ? 'Ubah Link Video' : 'Tambah Link Video'}
              </button>
            )}
          </div>

          {/* Reflection Prompt Box */}
          <div
            style={{
              background: '#242424',
              border: '1.5px solid rgba(255, 200, 87, 0.4)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>💡</div>
              <div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1rem', color: '#FFC857', marginBottom: '8px' }}>
                  Pertanyaan Diskusi & Refleksi...
                </div>
                <p style={{ color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  {selectedVideo.reflectionPrompt}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video List Sidebar */}
        <div
          style={{
            background: '#242424',
            border: '1.5px solid #3F3F46',
            borderRadius: '20px',
            padding: '20px',
            position: 'sticky',
            top: '80px',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px', fontSize: '1rem' }}>
            📚 Daftar Tempat Video ({filteredVideos.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredVideos.map((video) => {
              const hasVideo = !!video.youtubeUrl;
              const isActive = video.id === selectedVideo.id;
              const catBadge = getSubCategoryLabel(video.material, video.subMaterial);
              return (
                <button
                  key={video.id}
                  onClick={() => { setSelectedVideo(video); setEditMode(false); }}
                  style={{
                    background: isActive ? '#FF6B1A' : '#171717',
                    border: `1.5px solid ${isActive ? '#FF6B1A' : '#3F3F46'}`,
                    borderRadius: '12px',
                    padding: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    color: isActive ? '#FFFFFF' : '#D1D5DB',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.7rem', color: isActive ? '#FFFFFF' : '#FF9F43', fontWeight: 700 }}>
                      {catBadge}
                    </span>
                    {hasVideo ? (
                      <span style={{ fontSize: '0.75rem', background: '#22C55E', color: '#FFF', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>Ada Video</span>
                    ) : (
                      <span style={{ fontSize: '0.7rem', color: '#FFC857' }}>Belum Ada Link</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.1rem' }}>{hasVideo ? '▶️' : '🎥'}</span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.3 }}>
                      {video.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', color: '#FFFFFF', textAlign: 'center' }}>Memuat daftar video...</div>}>
      <VideoPageContent />
    </Suspense>
  );
}
