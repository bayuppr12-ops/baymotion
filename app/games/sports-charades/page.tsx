'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { charadesItems } from '@/data/questions';
import { useToast } from '@/components/Toast';
import Link from 'next/link';
import { QuestionTimer } from '@/components/QuestionTimer';

export default function SportsCharadesPage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [guessingTeam, setGuessingTeam] = useState<string | null>(null);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentItem = charadesItems[currentIdx];

  const handleGivePoints = () => {
    if (!guessingTeam) {
      showToast('Pilih kelompok yang berhasil menebak!', 'error');
      return;
    }
    const team = teams.find((t) => t.id === guessingTeam);
    addPoints(guessingTeam, 15, `Sports Charades: ${currentItem.techniqueName}`, 'game');
    showToast(`🎉 ${team?.name} berhasil menebak! (+15 Poin)`, 'success');
    handleNext();
  };

  const handleNext = () => {
    setShowSecret(false);
    setGuessingTeam(null);
    if (currentIdx < charadesItems.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
      showToast('🎉 Kartu charades selesai!', 'info');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      <ToastContainer />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <Link href="/games">
          <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>← Kembali</button>
        </Link>
        <div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#FFFFFF', margin: 0 }}>
            🎭 Sports Charades
          </h1>
          <div style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>Peragakan gerakan tanpa suara!</div>
        </div>
      </div>

      <div
        style={{
          background: '#242424',
          border: '1.5px solid #3F3F46',
          borderRadius: '24px',
          padding: '36px',
          textAlign: 'center',
          marginBottom: '24px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ display: 'inline-block', background: 'rgba(255, 107, 26, 0.25)', border: '1px solid #FF6B1A', borderRadius: '100px', padding: '4px 14px', color: '#FF6B1A', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.78rem', marginBottom: '14px' }}>
          KARTU CHARADES #{currentIdx + 1} DARI {charadesItems.length}
        </div>

        {/* 20-Second Countdown Timer */}
        <div style={{ textAlign: 'center', margin: '12px 0 20px' }}>
          <QuestionTimer
            currentIdx={currentIdx}
            duration={30}
            isPaused={!showSecret}
            onTimeUp={() => {
              showToast('⏰ WAKTU HABIS!', 'warning');
            }}
          />
        </div>

        {/* Secret Display Box */}
        <div
          style={{
            background: '#171717',
            border: '2px dashed #3F3F46',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '24px',
          }}
        >
          {!showSecret ? (
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔒</div>
              <div style={{ color: '#D1D5DB', fontSize: '0.95rem', marginBottom: '16px', fontWeight: 600 }}>
                Hanya perwakilan peraga yang boleh melihat kata ini!
              </div>
              <button className="btn-primary" style={{ padding: '12px 32px' }} onClick={() => setShowSecret(true)}>
                👁️ Tampilkan Rahasia (Peraga)
              </button>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '4rem', marginBottom: '12px' }}>{currentItem.imageEmoji}</div>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.5rem', color: '#FF6B1A', margin: '0 0 12px' }}>
                {currentItem.techniqueName}
              </h2>
              <div style={{ color: '#D1D5DB', fontSize: '0.9rem', marginBottom: '16px' }}>
                ⚠️ Peragakan gerakan di atas tanpa mengucapkan kata/suara!
              </div>
              <button className="btn-ghost" style={{ padding: '6px 16px', fontSize: '0.8rem' }} onClick={() => setShowSecret(false)}>
                🙈 Sembunyikan Rahasia
              </button>
            </div>
          )}
        </div>

        {/* Team Selection */}
        <div style={{ textAlign: 'left', borderTop: '1px solid #3F3F46', paddingTop: '20px' }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '12px' }}>
            PILIH KELOMPOK YANG MENEBAK BENAR:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {teams.map((t) => (
              <button
                key={t.id}
                onClick={() => setGuessingTeam(t.id)}
                style={{
                  background: guessingTeam === t.id ? '#FF6B1A' : '#171717',
                  border: `2px solid ${guessingTeam === t.id ? '#FF6B1A' : '#3F3F46'}`,
                  borderRadius: '12px',
                  padding: '10px 18px',
                  color: guessingTeam === t.id ? '#FFFFFF' : '#D1D5DB',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{t.emoji}</span> {t.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn-success" onClick={handleGivePoints} disabled={!guessingTeam} style={{ opacity: !guessingTeam ? 0.5 : 1 }}>
              ✅ Tebakan Benar (+15 Poin)
            </button>
            <button className="btn-ghost" onClick={handleNext} style={{ marginLeft: 'auto' }}>
              ⏭ Gerakan Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
