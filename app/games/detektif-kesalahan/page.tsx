'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { detectiveQuestions } from '@/data/questions';
import { useToast } from '@/components/Toast';
import Link from 'next/link';
import { QuestionTimer } from '@/components/QuestionTimer';
import { RandomTeamPicker } from '@/components/RandomTeamPicker';

export default function DetektifKesalahanPage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answeringTeam, setAnsweringTeam] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentQ = detectiveQuestions[currentIdx];

  const handleNext = () => {
    setSelectedOpt(null);
    setAnsweringTeam(null);
    setRevealed(false);
    if (currentIdx < detectiveQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
      showToast('🎉 Semua kasus detektif sudah selesai!', 'info');
    }
  };

  const handleReward = () => {
    if (!answeringTeam) {
      showToast('Pilih kelompok yang menjawab terlebih dahulu!', 'error');
      return;
    }
    const team = teams.find((t) => t.id === answeringTeam);
    const points = 10;
    addPoints(answeringTeam, points, `Detektif Kesalahan`, 'game');
    showToast(`✅ ${team?.name} mendapatkan +${points} poin!`, 'success');
  };

  const handleBonusAwarded = (teamId: string) => {
    addPoints(teamId, 5, `Detektif Kesalahan Bonus (Solusi)`, 'bonus');
    showToast(`⭐ Bonus +5 Poin diberikan!`, 'success');
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
            🔍 Detektif Kesalahan
          </h1>
          <div style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>Analisis & temukan kesalahan teknik</div>
        </div>
      </div>

      <div
        style={{
          background: '#242424',
          border: '1.5px solid #3F3F46',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '100px',
            padding: '4px 14px',
            color: '#FCA5A5',
            fontFamily: 'Poppins',
            fontWeight: 800,
            fontSize: '0.78rem',
            marginBottom: '14px',
          }}
        >
          KASUS DETEKTIF #{currentIdx + 1}
        </div>

        {/* 20-Second Countdown Timer */}
        <div style={{ textAlign: 'center', margin: '12px 0 20px' }}>
          <QuestionTimer
            currentIdx={currentIdx}
            duration={30}
            isPaused={revealed}
            onTimeUp={() => {
              showToast('⏰ WAKTU HABIS!', 'warning');
              setRevealed(true);
            }}
          />
        </div>

        <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.4rem', color: '#FFFFFF', lineHeight: 1.5, marginBottom: '24px' }}>
          🕵️ {currentQ.text}
        </h2>

        {/* Options */}
        {currentQ.options && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            {currentQ.options.map((opt, idx) => {
              const letters = ['A', 'B', 'C', 'D'];
              const isSelected = selectedOpt === idx;
              const isCorrect = revealed && idx === currentQ.correctIndex;
              const isWrong = revealed && isSelected && idx !== currentQ.correctIndex;

              return (
                <button
                  key={idx}
                  className={`option-btn ${isCorrect ? 'correct' : isWrong ? 'wrong' : isSelected ? 'selected' : ''}`}
                  onClick={() => !revealed && setSelectedOpt(idx)}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: '#171717',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Poppins',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      flexShrink: 0,
                    }}
                  >
                    {letters[idx]}
                  </div>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Revealed info */}
        {revealed && (
          <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, color: '#6EE7B7', marginBottom: '6px' }}>
              🔍 Analisis Kesalahan:
            </div>
            <div style={{ color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {currentQ.mistake}
            </div>
            <div style={{ marginTop: '10px', color: '#D1D5DB', fontSize: '0.9rem' }}>
              💡 {currentQ.explanation}
            </div>
          </div>
        )}

        {/* Team selection & buttons */}
        <div style={{ borderTop: '1px solid #3F3F46', paddingTop: '20px', marginTop: '20px' }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '12px' }}>
            KELOMPOK DETEKTIF YANG MENJAWAB:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {teams.map((t) => (
              <button
                key={t.id}
                onClick={() => setAnsweringTeam(t.id)}
                style={{
                  background: answeringTeam === t.id ? '#FF6B1A' : '#171717',
                  border: `2px solid ${answeringTeam === t.id ? '#FF6B1A' : '#3F3F46'}`,
                  borderRadius: '12px',
                  padding: '10px 18px',
                  color: answeringTeam === t.id ? '#FFFFFF' : '#D1D5DB',
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
            {!revealed ? (
              <button className="btn-secondary" onClick={() => setRevealed(true)}>
                🔍 Analisis Kasus
              </button>
            ) : (
              <button className="btn-success" onClick={handleReward} disabled={!answeringTeam} style={{ opacity: !answeringTeam ? 0.5 : 1 }}>
                ✅ Benar (+10 Poin)
              </button>
            )}
            <button className="btn-ghost" onClick={handleNext} style={{ marginLeft: 'auto' }}>
              ⏭ Kasus Berikutnya
            </button>
          </div>
          
          {revealed && (
            <RandomTeamPicker teams={teams} onBonusAwarded={handleBonusAwarded} />
          )}
        </div>
      </div>
    </div>
  );
}
