'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { quizQuestions } from '@/data/questions';
import { useToast } from '@/components/Toast';
import { playAudioEffect } from '@/lib/audio';
import Link from 'next/link';

const physicalActions = [
  '👏 Tepuk tangan 3x dan berteriak "YES!" dengan kompak!',
  '🦶 Lompat jinjit 5x sambil memutar badan di tempat!',
  '🧍‍♂️ Formasi berdiri paling tegak & rapi dengan tangan di pinggang!',
  '💪 Lakukan 3x push-up bayangan sambil tersenyum lebar!',
  '🙌 Saling High-Five dengan seluruh anggota kelompok!',
  '🏐 Demo gerakan Passing Bawah Voli 5 kali bersama-sama!',
  '🏀 Demo gerakan Lay-Up Shoot Basket 2 langkah melayang!',
  '⚽ Demo gerakan Menyundul Bola (Heading) dengan dahi!',
  '🏃 Lari zig-zag di tempat selama 5 detik penuh energi!',
  '🦸 Pose pahlawan super (Hero Pose) paling keren bersama tim!',
];

export default function GrandPrixPage() {
  const { teams, addPoints, removePoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [actionPrompt, setActionPrompt] = useState<string | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0 || revealed) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          showToast('⏰ WAKTU HABIS! Silakan acak gerakan atau jawab.', 'warning');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, revealed, showToast]);

  if (!mounted) return null;

  const currentQ = quizQuestions[currentIdx % quizQuestions.length];

  const handleStartTimer = () => {
    playAudioEffect('click');
    setTimeLeft(30);
    setIsTimerRunning(true);
  };

  const handleRandomizeAction = () => {
    playAudioEffect('spin');
    const randomAction = physicalActions[Math.floor(Math.random() * physicalActions.length)];
    setActionPrompt(randomAction);
    showToast('⚡ GERAKAN FISIK DIAKTIFKAN! Tim mana paling cepat & kompak?', 'info');
  };

  const handleSelectTeam = (teamId: string) => {
    playAudioEffect('click');
    setSelectedTeamId(teamId);
    const team = teams.find((t) => t.id === teamId);
    showToast(`🎯 Hak Jawab Diberikan kepada: ${team?.name}`, 'info');
  };

  const handleAnswerCorrect = () => {
    if (!selectedTeamId) {
      showToast('⚠️ Silakan pilih tim yang berhak menjawab terlebih dahulu!', 'warning');
      return;
    }
    playAudioEffect('correct');
    setRevealed(true);
    setIsTimerRunning(false);
    const team = teams.find((t) => t.id === selectedTeamId);
    addPoints(selectedTeamId, 10, `Grand Prix Rebut & Gerak: Soal #${currentIdx + 1} Benar`, 'game');
    showToast(`🎉 JAWABAN BENAR! ${team?.name} mendapatkan +10 Poin!`, 'success');
  };

  const handleAnswerWrong = () => {
    if (!selectedTeamId) {
      showToast('⚠️ Silakan pilih tim yang menjawab terlebih dahulu!', 'warning');
      return;
    }
    playAudioEffect('wrong');
    setRevealed(true);
    setIsTimerRunning(false);
    const team = teams.find((t) => t.id === selectedTeamId);
    removePoints(selectedTeamId, 5, `Grand Prix Rebut & Gerak: Soal #${currentIdx + 1} Salah`);
    showToast(`❌ JAWABAN SALAH! ${team?.name} dikurangi 5 Poin.`, 'error');
  };

  const handleNextQuestion = () => {
    playAudioEffect('click');
    setCurrentIdx((prev) => prev + 1);
    setActionPrompt(null);
    setSelectedTeamId(null);
    setRevealed(false);
    setTimeLeft(30);
    setIsTimerRunning(true);
  };

  const handleResetGame = () => {
    playAudioEffect('click');
    setCurrentIdx(0);
    setActionPrompt(null);
    setSelectedTeamId(null);
    setRevealed(false);
    setTimeLeft(30);
    setIsTimerRunning(false);
    showToast('🔄 Permainan Grand Prix diulang dari soal #1', 'info');
  };

  const selectedTeam = teams.find((t) => t.id === selectedTeamId);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      <ToastContainer />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/games" style={{ textDecoration: 'none' }}>
          <button className="btn-ghost" onClick={() => playAudioEffect('click')} style={{ fontSize: '1rem', padding: '10px 20px' }}>
            ← Kembali ke Menu Game
          </button>
        </Link>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-ghost" onClick={handleResetGame} style={{ fontSize: '0.95rem' }}>
            🔄 Reset Game
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '6px' }}>🏎️</div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.5rem', color: '#FF6B1A', margin: 0, letterSpacing: '0.5px' }}>
          Grand Prix Rebut & Gerak
        </h1>
        <p style={{ color: '#D1D5DB', fontSize: '1.1rem', marginTop: '6px' }}>
          Semua tim melakukan gerakan fisik acak di kelas! Guru memilih tim tercepat & paling kompak untuk menjawab kuis.
        </p>
      </div>

      {/* Main Game Container */}
      <div
        style={{
          background: '#242424',
          border: '2px solid #FF6B1A',
          borderRadius: '24px',
          padding: '36px',
          marginBottom: '32px',
          boxShadow: '0 10px 35px rgba(255, 107, 26, 0.25)',
        }}
      >
        {/* Progress Bar & Timer Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            background: '#171717',
            padding: '14px 24px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 107, 26, 0.4)',
          }}
        >
          <span style={{ color: '#FFC857', fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.2rem' }}>
            SOAL #{currentIdx + 1} ({currentQ.category})
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                fontFamily: 'Poppins',
                fontWeight: 900,
                fontSize: '1.5rem',
                color: timeLeft <= 5 ? '#EF4444' : '#10B981',
                background: '#242424',
                padding: '6px 20px',
                borderRadius: '100px',
                border: '1.5px solid #3F3F46',
              }}
            >
              ⏱️ {timeLeft}s
            </div>
            {!isTimerRunning && !revealed && (
              <button className="btn-primary" onClick={handleStartTimer} style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
                ▶️ Mulai Timer
              </button>
            )}
          </div>
        </div>

        {/* Action Prompt Banner */}
        {actionPrompt && (
          <div
            style={{
              background: 'linear-gradient(135deg, #FF6B1A, #FF9F43)',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '28px',
              textAlign: 'center',
              boxShadow: '0 8px 25px rgba(255, 107, 26, 0.4)',
              animation: 'bounce 0.5s ease-in-out',
            }}
          >
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '0.9rem', color: '#171717', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
              ⚡ TANTANGAN GERAKAN FISIK SEKARANG:
            </div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.6rem', color: '#FFFFFF', lineHeight: 1.4 }}>
              {actionPrompt}
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.95rem', color: '#171717', fontWeight: 700 }}>
              Guru mengamati & klik tim yang paling cepat / kompak di bawah!
            </div>
          </div>
        )}

        {/* Question Text */}
        <h2
          style={{
            fontFamily: 'Poppins',
            fontWeight: 900,
            fontSize: '1.8rem',
            color: '#FFFFFF',
            lineHeight: 1.45,
            marginBottom: '28px',
            background: '#171717',
            padding: '28px',
            borderRadius: '20px',
            borderLeft: '8px solid #FF6B1A',
          }}
        >
          {currentQ.text}
        </h2>

        {/* Options Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {currentQ.options.map((opt, idx) => {
            const isCorrect = revealed && idx === currentQ.correctIndex;
            return (
              <div
                key={idx}
                style={{
                  background: isCorrect ? 'rgba(16, 185, 129, 0.25)' : '#171717',
                  border: `2px solid ${isCorrect ? '#10B981' : '#3F3F46'}`,
                  borderRadius: '16px',
                  padding: '20px 24px',
                  fontFamily: 'Poppins',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  color: isCorrect ? '#6EE7B7' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    background: isCorrect ? '#10B981' : '#FF6B1A',
                    color: '#FFFFFF',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    marginRight: '16px',
                    flexShrink: 0,
                  }}
                >
                  {['A', 'B', 'C', 'D'][idx]}
                </span>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1.5px solid #10B981', borderRadius: '16px', padding: '20px 24px', marginBottom: '32px' }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, color: '#6EE7B7', fontSize: '1.1rem', marginBottom: '6px' }}>
              ✅ Kunci Jawaban: {['A', 'B', 'C', 'D'][currentQ.correctIndex]}. {currentQ.options[currentQ.correctIndex]}
            </div>
            <div style={{ color: '#FFFFFF', fontSize: '1rem', lineHeight: 1.5 }}>{currentQ.explanation}</div>
          </div>
        )}

        {/* Teacher Controls: Randomize Action & Select Team */}
        <div style={{ borderTop: '2px solid #3F3F46', paddingTop: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <button className="btn-primary" onClick={handleRandomizeAction} style={{ padding: '16px 28px', fontSize: '1.1rem', fontWeight: 900, background: 'linear-gradient(135deg, #FF6B1A, #FF9F43)' }}>
              🎲 Acak Gerakan Fisik!
            </button>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1rem', color: '#FFC857' }}>
              {selectedTeam ? `Tim Terpilih: ${selectedTeam.emoji} ${selectedTeam.name}` : '⚠️ Belum Ada Tim Terpilih'}
            </div>
          </div>

          <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.9rem', color: '#D1D5DB', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            KLIK NAMA TIM YANG TERCEPAT/TERKOMPAK MELAKUKAN GERAKAN:
          </div>

          {/* Team Select Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px', marginBottom: '28px' }}>
            {teams.map((t) => {
              const isSelected = selectedTeamId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTeam(t.id)}
                  style={{
                    background: isSelected ? '#FF6B1A' : '#171717',
                    color: '#FFFFFF',
                    border: `2px solid ${isSelected ? '#FFFFFF' : '#3F3F46'}`,
                    borderRadius: '16px',
                    padding: '16px',
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                    boxShadow: isSelected ? '0 6px 20px rgba(255, 107, 26, 0.4)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.4rem' }}>{t.emoji}</span>
                    <span>{t.name}</span>
                  </div>
                  <span style={{ color: isSelected ? '#FFFFFF' : '#FFC857', fontSize: '0.9rem' }}>{t.points} pt</span>
                </button>
              );
            })}
          </div>

          {/* Teacher Scoring Actions */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn-success" onClick={handleAnswerCorrect} style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 900 }}>
              Benar ✅ (+10 Poin)
            </button>
            <button className="btn-danger" onClick={handleAnswerWrong} style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 900 }}>
              Salah ❌ (-5 Poin)
            </button>
            <button className="btn-primary" onClick={handleNextQuestion} style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 900, marginLeft: 'auto' }}>
              ⏭ Skip / Soal Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
