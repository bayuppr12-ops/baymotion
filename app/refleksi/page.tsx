'use client';

import { useState, useEffect } from 'react';
import { reflectionQuestions } from '@/data/questions';
import Timer from '@/components/Timer';

interface ReflectionNote {
  id: string;
  name: string;
  category: 'kesan' | 'pesan' | 'manfaat' | 'terimakasih';
  text: string;
  emoji: string;
  createdAt: string;
}

const DEFAULT_NOTES: ReflectionNote[] = [
  {
    id: 'n1',
    name: 'Kelompok Rajawali (Ahmad & Tim)',
    category: 'kesan',
    text: 'Pembelajaran selama ini sangat seru dan menyenangkan! Metode permainannya membuat kami lebih bersemangat berolahraga.',
    emoji: '🔥',
    createdAt: 'Hari ini',
  },
  {
    id: 'n2',
    name: 'Siti Rahma & Tim Putri',
    category: 'manfaat',
    text: 'Kami jadi mengerti teknik dasar yang benar dan merasa lebih percaya diri saat bermain bersama teman.',
    emoji: '⭐',
    createdAt: 'Hari ini',
  },
  {
    id: 'n3',
    name: 'Kelompok Garuda',
    category: 'pesan',
    text: 'Semoga pembelajaran PJOK dengan game-game interaktif seperti ini terus dilanjutkan di materi selanjutnya!',
    emoji: '🎯',
    createdAt: 'Hari ini',
  },
];

const CATEGORY_MAP = {
  kesan: { label: 'Kesan Menyenangkan', color: '#FF9F43', bg: 'rgba(255, 159, 67, 0.15)' },
  pesan: { label: 'Pesan & Harapan', color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.15)' },
  manfaat: { label: 'Manfaat Nyata', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' },
  terimakasih: { label: 'Ucapan & Apresiasi', color: '#EC4899', bg: 'rgba(236, 72, 153, 0.15)' },
};

export default function RefleksiPage() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Papan Catatan Pesan & Kesan Interaktif
  const [notes, setNotes] = useState<ReflectionNote[]>([]);
  const [inputName, setInputName] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputCategory, setInputCategory] = useState<'kesan' | 'pesan' | 'manfaat' | 'terimakasih'>('kesan');
  const [inputEmoji, setInputEmoji] = useState('💬');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('pjok_refleksi_notes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNotes(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setNotes(DEFAULT_NOTES);
  }, []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newNote: ReflectionNote = {
      id: 'note_' + Date.now(),
      name: inputName.trim() || 'Siswa / Kelompok Belajar',
      category: inputCategory,
      text: inputText.trim(),
      emoji: inputEmoji,
      createdAt: 'Baru saja',
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem('pjok_refleksi_notes', JSON.stringify(updated));

    setInputName('');
    setInputText('');
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem('pjok_refleksi_notes', JSON.stringify(updated));
  };

  const handleResetNotes = () => {
    if (confirm('Mereset papan pesan dan kesan ke contoh bawaan?')) {
      setNotes(DEFAULT_NOTES);
      localStorage.setItem('pjok_refleksi_notes', JSON.stringify(DEFAULT_NOTES));
    }
  };

  if (!mounted) return null;

  const currentQ = reflectionQuestions[activeIdx] || reflectionQuestions[0];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      
      {/* Header Halaman Refleksi */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>💬</div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.4rem', color: '#FFFFFF', margin: 0 }}>
          Refleksi & Kesan Pembelajaran
        </h1>
        <p style={{ color: '#D1D5DB', fontSize: '1rem', marginTop: '8px' }}>
          Tampilkan pertanyaan refleksi di layar proyektor untuk bahan diskusi kelas dan saling berbagi pesan & kesan.
        </p>
      </div>

      {/* Kartu Utama Pertanyaan Refleksi */}
      <div
        style={{
          background: 'linear-gradient(145deg, #242424 0%, #1A1A1A 100%)',
          border: '2px solid rgba(255, 107, 26, 0.5)',
          borderRadius: '24px',
          padding: '40px 32px',
          textAlign: 'center',
          marginBottom: '32px',
          boxShadow: '0 12px 40px rgba(255, 107, 26, 0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ color: '#FF6B1A', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.85rem', marginBottom: '16px', letterSpacing: '1px' }}>
          PERTANYAAN REFLEKSI #{activeIdx + 1} DARI {reflectionQuestions.length}
        </div>

        <div style={{ fontSize: '4.2rem', marginBottom: '16px' }}>{currentQ.emoji}</div>

        <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.3rem)', color: '#FFFFFF', lineHeight: 1.4, marginBottom: '24px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          &ldquo;{currentQ.text}&rdquo;
        </h2>

        {/* Navigasi Pertanyaan Refleksi */}
        {reflectionQuestions.length > 1 && (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-ghost"
              onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeIdx === 0}
              style={{ opacity: activeIdx === 0 ? 0.4 : 1 }}
            >
              ← Pertanyaan Sebelumnya
            </button>
            <button
              className="btn-primary"
              onClick={() => setActiveIdx((prev) => Math.min(reflectionQuestions.length - 1, prev + 1))}
              disabled={activeIdx === reflectionQuestions.length - 1}
              style={{ opacity: activeIdx === reflectionQuestions.length - 1 ? 0.4 : 1 }}
            >
              Pertanyaan Berikutnya →
            </button>
          </div>
        )}
      </div>

      {/* Timer Diskusi Refleksi */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF', textAlign: 'center', marginBottom: '16px' }}>
          ⏱️ Timer Waktu Diskusi Refleksi Siswa
        </div>
        <Timer />
      </div>

      {/* Daftar Topik Panduan Refleksi */}
      {reflectionQuestions.length > 1 && (
        <div style={{ background: '#242424', border: '1.5px solid #3F3F46', borderRadius: '20px', padding: '24px', marginBottom: '40px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)' }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📋</span>
            <span>Panduan Pertanyaan Refleksi & Kesan</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {reflectionQuestions.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                style={{
                  background: activeIdx === idx ? 'linear-gradient(135deg, #FF6B1A, #FF9F43)' : '#171717',
                  border: `1.5px solid ${activeIdx === idx ? '#FF6B1A' : '#3F3F46'}`,
                  borderRadius: '14px',
                  padding: '16px',
                  textAlign: 'left',
                  color: activeIdx === idx ? '#FFFFFF' : '#D1D5DB',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeIdx === idx ? '0 4px 18px rgba(255, 107, 26, 0.35)' : 'none',
                }}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{item.emoji}</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.4 }}>{item.text}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          Papan Pesan & Kesan Interaktif (Sticky Notes Siswa)
          ========================================================================= */}
      <div style={{ background: '#242424', border: '1.5px solid #3F3F46', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.3rem', color: '#FFFFFF', margin: 0 }}>
              📌 Papan Pesan & Kesan Pembelajaran Siswa
            </h3>
            <p style={{ color: '#9CA3AF', fontSize: '0.9rem', margin: '4px 0 0' }}>
              Tuliskan pesan, kesan, atau momen paling bermakna selama mengikuti pembelajaran PJOK.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetNotes}
            style={{
              background: '#18181B',
              border: '1px solid #3F3F46',
              color: '#A1A1AA',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            🔄 Reset Papan
          </button>
        </div>

        {/* Form Tambah Pesan & Kesan */}
        <form onSubmit={handleAddNote} style={{ background: '#1A1A1D', border: '1px solid #3F3F46', borderRadius: '16px', padding: '20px', marginBottom: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#D1D5DB', fontWeight: 700, marginBottom: '6px' }}>
                Nama Siswa / Kelompok:
              </label>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Contoh: Budi Santoso / Kelompok 1"
                style={{
                  width: '100%',
                  background: '#242428',
                  border: '1px solid #3F3F46',
                  color: '#FFFFFF',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#D1D5DB', fontWeight: 700, marginBottom: '6px' }}>
                Kategori Refleksi:
              </label>
              <select
                value={inputCategory}
                onChange={(e) => setInputCategory(e.target.value as any)}
                style={{
                  width: '100%',
                  background: '#242428',
                  border: '1px solid #3F3F46',
                  color: '#FFFFFF',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                  outline: 'none',
                }}
              >
                <option value="kesan">🌟 Kesan Menyenangkan</option>
                <option value="pesan">💬 Pesan & Harapan</option>
                <option value="manfaat">💪 Manfaat Nyata</option>
                <option value="terimakasih">❤️ Ucapan & Apresiasi</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#D1D5DB', fontWeight: 700, marginBottom: '6px' }}>
                Emoji Emosi:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['💬', '🔥', '⭐', '❤️', '🤝', '🎯'].map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setInputEmoji(em)}
                    style={{
                      background: inputEmoji === em ? '#FF6B1A' : '#242428',
                      border: `1px solid ${inputEmoji === em ? '#FF6B1A' : '#3F3F46'}`,
                      borderRadius: '8px',
                      padding: '6px 10px',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                    }}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#D1D5DB', fontWeight: 700, marginBottom: '6px' }}>
              Isi Pesan dan Kesan Pembelajaran:
            </label>
            <textarea
              required
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tuliskan pengalaman berkesan, pesan untuk guru dan teman-teman, atau perubahan positif yang kalian rasakan..."
              style={{
                width: '100%',
                background: '#242428',
                border: '1px solid #3F3F46',
                color: '#FFFFFF',
                padding: '12px 14px',
                borderRadius: '10px',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #FF6B1A, #FF9F43)',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255, 107, 26, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>Bagikan Pesan & Kesan</span>
              <span>✨</span>
            </button>
          </div>
        </form>

        {/* Grid Kartu Pesan & Kesan */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '16px' }}>
          {notes.map((note) => {
            const cat = CATEGORY_MAP[note.category] || CATEGORY_MAP.kesan;
            return (
              <div
                key={note.id}
                style={{
                  background: '#1A1A1E',
                  border: '1px solid #3F3F46',
                  borderRadius: '16px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span
                      style={{
                        background: cat.bg,
                        color: cat.color,
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                      }}
                    >
                      {cat.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(note.id)}
                      title="Hapus catatan ini"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#71717A',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        padding: '2px 4px',
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <p style={{ color: '#F3F4F6', fontSize: '0.95rem', lineHeight: 1.5, margin: '0 0 14px', fontStyle: 'italic' }}>
                    &ldquo;{note.text}&rdquo;
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '10px', borderTop: '1px solid #27272A' }}>
                  <div style={{ fontSize: '1.4rem' }}>{note.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#FFFFFF' }}>{note.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{note.createdAt}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

