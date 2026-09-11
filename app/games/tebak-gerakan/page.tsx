'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { gestureQuestions } from '@/data/questions';
import { useToast } from '@/components/Toast';
import Link from 'next/link';
import { QuestionTimer } from '@/components/QuestionTimer';
import { RandomTeamPicker } from '@/components/RandomTeamPicker';

export default function TebakGerakanPage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentQ = gestureQuestions[currentIdx];

  const toggleTeam = (teamId: string) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId]
    );
  };

  const handleGivePoints = (points: number, reason: string) => {
    if (selectedTeams.length === 0) {
      showToast('Pilih minimal satu kelompok yang menjawab benar!', 'error');
      return;
    }
    
    selectedTeams.forEach(teamId => {
      addPoints(teamId, points, `Tebak Gerakan: ${currentQ.techniqueName}`, 'game');
    });
    
    showToast(`✅ ${selectedTeams.length} kelompok mendapatkan +${points} poin!`, 'success');
    setSelectedTeams([]); // Clear selection after giving points
  };

  const handleBonusAwarded = (teamId: string) => {
    addPoints(teamId, 5, `Tebak Gerakan Bonus: ${currentQ.techniqueName}`, 'bonus');
    showToast(`⭐ Bonus +5 Poin diberikan!`, 'success');
  };

  const handleNext = () => {
    setRevealed(false);
    setIsTimeUp(false);
    setSelectedTeams([]);
    if (currentIdx < gestureQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
      showToast('🎉 Semua ilustrasi sudah selesai!', 'info');
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
            🤸 Tebak Gerakan
          </h1>
          <div style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>Tebak teknik berdasarkan simbol & gambar</div>
        </div>
      </div>

      {/* Main card */}
      <div
        style={{
          background: '#242424',
          border: '1.5px solid #3F3F46',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '24px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ display: 'inline-block', background: 'rgba(255, 107, 26, 0.25)', border: '1px solid #FF6B1A', borderRadius: '100px', padding: '4px 14px', color: '#FF9F43', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.78rem', marginBottom: '14px' }}>
          SOAL {currentIdx + 1} DARI {gestureQuestions.length}
        </div>

        {/* 20-Second Countdown Timer */}
        <div style={{ textAlign: 'center', margin: '12px 0 16px' }}>
          <QuestionTimer
            currentIdx={currentIdx}
            duration={30}
            isPaused={revealed || isTimeUp}
            onTimeUp={() => {
              showToast('⏰ WAKTU HABIS!', 'warning');
              setIsTimeUp(true);
            }}
          />
        </div>

        {/* Big emoji illustration */}
        <div
          style={{
            fontSize: '6rem',
            margin: '20px 0',
            letterSpacing: '10px',
            animation: 'bounce-in 0.5s ease',
          }}
        >
          {currentQ.imageEmoji}
        </div>

        <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '24px' }}>
          Teknik apakah ini?
        </h2>

        {isTimeUp && !revealed && (
          <div style={{
            fontSize: '1.5rem',
            fontFamily: 'Poppins',
            fontWeight: 900,
            color: '#FF4444',
            animation: 'pulse 1s infinite',
            marginBottom: '24px'
          }}>
            ⏰ WAKTU HABIS! ANGKAT JAWABAN!
          </div>
        )}

        {/* Revealed state */}
        {revealed ? (
          <div
            style={{
              background: '#171717',
              border: '1px solid rgba(255, 107, 26, 0.4)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              animation: 'slide-up 0.3s ease',
            }}
          >
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.8rem', color: '#FF6B1A', marginBottom: '8px' }}>
              ✅ {currentQ.techniqueName}
            </div>
            <div style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>
              💡 {currentQ.explanation}
            </div>
          </div>
        ) : (
          <button className="btn-secondary" style={{ fontSize: '1rem', padding: '12px 32px', marginBottom: '24px' }} onClick={() => setRevealed(true)}>
            🔍 Buka Jawaban
          </button>
        )}

        {/* Team selection */}
        {revealed && (
          <div style={{ textAlign: 'left', marginTop: '20px', borderTop: '1px solid #3F3F46', paddingTop: '20px', animation: 'fade-in 0.5s ease' }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '12px' }}>
              PILIH KELOMPOK YANG BENAR MENJAWAB:
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {teams.map((t) => {
                const isSelected = selectedTeams.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggleTeam(t.id)}
                    style={{
                      background: isSelected ? t.color || '#FF6B1A' : '#171717',
                      border: `2px solid ${isSelected ? t.color || '#FF6B1A' : '#3F3F46'}`,
                      borderRadius: '12px',
                      padding: '10px 18px',
                      color: isSelected ? '#FFFFFF' : '#D1D5DB',
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>{t.emoji}</span> {t.name}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn-success" onClick={() => handleGivePoints(10, 'Benar')} disabled={selectedTeams.length === 0} style={{ opacity: selectedTeams.length === 0 ? 0.5 : 1 }}>
                ✅ Beri +10 Poin
              </button>
              <button className="btn-ghost" onClick={handleNext} style={{ marginLeft: 'auto' }}>
                ⏭ Gambar Berikutnya
              </button>
            </div>
            <RandomTeamPicker teams={teams} onBonusAwarded={handleBonusAwarded} />
          </div>
        )}
      </div>
    </div>
  );
}

