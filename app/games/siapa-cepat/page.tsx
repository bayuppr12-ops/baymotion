'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { quizQuestions } from '@/data/questions';
import { useToast } from '@/components/Toast';
import Link from 'next/link';
import { QuestionTimer } from '@/components/QuestionTimer';

export default function SiapaCepatPage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [winnerTeam, setWinnerTeam] = useState<string | null>(null);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentQ = quizQuestions[currentIdx];

  const handleReward = (correct: boolean) => {
    if (!winnerTeam) {
      showToast('Pilih kelompok tercepat dulu!', 'error');
      return;
    }
    const team = teams.find((t) => t.id === winnerTeam);
    if (correct) {
      addPoints(winnerTeam, 10, 'Siapa Cepat Dia Dapat: Benar', 'quiz');
      showToast(`✅ ${team?.name} cepat & benar! (+10 Poin)`, 'success');
      handleNext();
    } else {
      showToast(`❌ ${team?.name} salah! Kesempatan untuk kelompok lain.`, 'error');
      setWinnerTeam(null);
    }
  };

  const handleNext = () => {
    setRevealed(false);
    setWinnerTeam(null);
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
      showToast('🎉 Pertanyaan selesai!', 'info');
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
            ⚡ Siapa Cepat Dia Dapat
          </h1>
          <div style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>Angkat kartu / papan paling cepat!</div>
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
        <div style={{ display: 'inline-block', background: 'rgba(255, 200, 87, 0.25)', border: '1px solid #FFC857', borderRadius: '100px', padding: '4px 14px', color: '#FFC857', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.78rem', marginBottom: '14px' }}>
          SOAL #{currentIdx + 1} DARI {quizQuestions.length}
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

        <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.6rem', color: '#FFFFFF', lineHeight: 1.4, marginBottom: '24px' }}>
          {currentQ.text}
        </h2>

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {currentQ.options.map((opt, idx) => (
            <div
              key={idx}
              style={{
                background: revealed && idx === currentQ.correctIndex ? 'rgba(16, 185, 129, 0.25)' : '#171717',
                border: `2px solid ${revealed && idx === currentQ.correctIndex ? '#10B981' : '#3F3F46'}`,
                borderRadius: '14px',
                padding: '16px',
                fontFamily: 'Poppins',
                fontWeight: 700,
                color: revealed && idx === currentQ.correctIndex ? '#6EE7B7' : '#FFFFFF',
                textAlign: 'left',
              }}
            >
              <span style={{ color: '#FF6B1A', marginRight: '8px' }}>{['A', 'B', 'C', 'D'][idx]}.</span>
              {opt}
            </div>
          ))}
        </div>

        {revealed && (
          <div style={{ color: '#6EE7B7', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '14px', fontFamily: 'Poppins', fontWeight: 800, marginBottom: '24px' }}>
            💡 {currentQ.explanation}
          </div>
        )}

        {/* Winner Selection */}
        <div style={{ borderTop: '1px solid #3F3F46', paddingTop: '20px', textAlign: 'left' }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '12px' }}>
            KELOMPOK YANG PALING CEPAT ANGKAT TANGAN / KARTU:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {teams.map((t) => (
              <button
                key={t.id}
                onClick={() => setWinnerTeam(t.id)}
                style={{
                  background: winnerTeam === t.id ? '#FF6B1A' : '#171717',
                  border: `2px solid ${winnerTeam === t.id ? '#FF6B1A' : '#3F3F46'}`,
                  borderRadius: '12px',
                  padding: '10px 18px',
                  color: winnerTeam === t.id ? '#FFFFFF' : '#D1D5DB',
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
                🔍 Tampilkan Kunci Jawaban
              </button>
            ) : (
              <>
                <button className="btn-success" onClick={() => handleReward(true)} disabled={!winnerTeam} style={{ opacity: !winnerTeam ? 0.5 : 1 }}>
                  ✅ Jawaban Benar (+10 Poin)
                </button>
                <button className="btn-danger" onClick={() => handleReward(false)} disabled={!winnerTeam} style={{ opacity: !winnerTeam ? 0.5 : 1 }}>
                  ❌ Jawaban Salah
                </button>
              </>
            )}
            <button className="btn-ghost" onClick={handleNext} style={{ marginLeft: 'auto' }}>
              ⏭ Pertanyaan Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
