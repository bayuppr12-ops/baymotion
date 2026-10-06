'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { quizQuestions, materialQuizzes } from '@/data/questions';
import { useToast } from '@/components/Toast';
import Link from 'next/link';
import { QuestionTimer } from '@/components/QuestionTimer';

type QuizCategoryKey = 'all' | 'bola-voli' | 'sepak-bola' | 'bola-basket' | 'atletik' | 'senam' | 'kebugaran' | 'renang' | 'bulutangkis';

const categoriesList: { key: QuizCategoryKey; title: string; emoji: string; color: string }[] = [
  { key: 'all', title: 'Semua Materi', emoji: '🌟', color: '#FF6B1A' },
  { key: 'bola-voli', title: 'Bola Voli', emoji: '🏐', color: '#FF6B35' },
  { key: 'sepak-bola', title: 'Sepak Bola', emoji: '⚽', color: '#2ECC71' },
  { key: 'bola-basket', title: 'Bola Basket', emoji: '🏀', color: '#E67E22' },
  { key: 'atletik', title: 'Atletik', emoji: '🏃', color: '#3498DB' },
  { key: 'senam', title: 'Senam', emoji: '🤸', color: '#9B59B6' },
  { key: 'kebugaran', title: 'Kebugaran Jasmani', emoji: '💪', color: '#E74C3C' },
  { key: 'renang', title: 'Renang', emoji: '🏊', color: '#0EA5E9' },
  { key: 'bulutangkis', title: 'Bulu Tangkis', emoji: '🏸', color: '#10B981' },
];

export default function KuisPage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategoryKey>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Active question pool based on selected category
  const activeQuestions =
    selectedCategory === 'all'
      ? quizQuestions
      : materialQuizzes[selectedCategory]?.questions || quizQuestions;

  const currentQ = activeQuestions[currentIdx] || activeQuestions[0];
  const totalQuestions = activeQuestions.length;

  const handleSelectCategory = (key: QuizCategoryKey) => {
    setSelectedCategory(key);
    setCurrentIdx(0);
    setRevealed(false);
    setAnswers({});
    const catTitle = categoriesList.find((c) => c.key === key)?.title || 'Kuis';
    showToast(`📌 Membuka Kuis ${catTitle}!`, 'info');
  };

  const handleSelectTeamAnswer = (teamId: string, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [teamId]: optIdx }));
  };

  const handleCalculatePoints = () => {
    setRevealed(true);
    let correctCount = 0;
    teams.forEach((team) => {
      const ans = answers[team.id];
      if (ans === currentQ.correctIndex) {
        correctCount++;
        addPoints(team.id, 10, `Kuis (${currentQ.category}): Soal #${currentIdx + 1} Benar`, 'quiz');
      }
    });
    showToast(`✅ Jawaban dibuka! ${correctCount} tim menjawab benar (+10 Poin).`, 'success');
  };

  const handleNext = () => {
    setRevealed(false);
    setAnswers({});
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
      showToast(`🎉 Seluruh Kuis (${categoriesList.find((c) => c.key === selectedCategory)?.title}) Selesai!`, 'info');
    }
  };

  const handleResetCurrentQuiz = () => {
    setCurrentIdx(0);
    setRevealed(false);
    setAnswers({});
    showToast('🔄 Kuis diulang dari soal nomor 1', 'info');
  };

  const percentage = Math.round(((currentIdx + 1) / totalQuestions) * 100);
  const activeCatInfo = categoriesList.find((c) => c.key === selectedCategory);

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '40px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      <ToastContainer />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🧠</div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.2rem', color: '#FFFFFF', margin: 0 }}>
          Kuis Kelas Interaktif PJOK
        </h1>
        <p style={{ color: '#D1D5DB', fontSize: '0.98rem', maxWidth: '650px', margin: '8px auto 0', lineHeight: 1.5 }}>
          Pilih kuis sesuai materi yang sedang diajarkan di kelas, tampilkan di proyektor, lalu minta siswa menjawab dengan kartu A/B/C/D!
        </p>
      </div>

      {/* Material Selector Tabs */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.85rem', color: '#FF6B1A', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>
          🎯 PILIH MATERI KUIS:
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            background: '#1D1D1F',
            padding: '16px',
            borderRadius: '20px',
            border: '1px solid #3F3F46',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat.key;
            const count = cat.key === 'all' ? quizQuestions.length : materialQuizzes[cat.key]?.questions.length || 0;
            return (
              <button
                key={cat.key}
                onClick={() => handleSelectCategory(cat.key)}
                style={{
                  background: isActive ? cat.color : '#28282C',
                  color: '#FFFFFF',
                  border: `1.5px solid ${isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '14px',
                  padding: '10px 18px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isActive ? `0 4px 15px ${cat.color}66` : 'none',
                  transition: 'all 0.2s ease',
                  transform: isActive ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{cat.emoji}</span>
                <span>{cat.title}</span>
                <span
                  style={{
                    background: isActive ? 'rgba(0, 0, 0, 0.3)' : '#18181A',
                    padding: '2px 8px',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quiz Box */}
      <div
        style={{
          background: '#242424',
          border: `2px solid ${activeCatInfo?.color || '#FF6B1A'}`,
          borderRadius: '24px',
          padding: '36px',
          marginBottom: '32px',
          boxShadow: `0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${activeCatInfo?.color}22`,
        }}
      >
        {/* Projector High-Contrast Progress Bar Indicator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            background: '#171717',
            padding: '12px 20px',
            borderRadius: '14px',
            border: `1px solid ${activeCatInfo?.color}66`,
          }}
        >
          <span style={{ color: '#FFC857', fontFamily: 'Poppins', fontWeight: 900, fontSize: '0.98rem', letterSpacing: '0.5px' }}>
            SOAL {String(currentIdx + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')} — {percentage}%
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: `${activeCatInfo?.color}33`,
                border: `1px solid ${activeCatInfo?.color}`,
                borderRadius: '100px',
                padding: '4px 14px',
                fontSize: '0.82rem',
                fontFamily: 'Poppins',
                color: '#FFFFFF',
                fontWeight: 800,
              }}
            >
              {activeCatInfo?.emoji} {currentQ?.category || activeCatInfo?.title}
            </span>
          </div>
        </div>

        {/* 30-Second Countdown Timer */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <QuestionTimer
            currentIdx={currentIdx}
            duration={30}
            isPaused={revealed}
            onTimeUp={() => {
              showToast('⏰ WAKTU HABIS! Kunci jawaban dibuka.', 'warning');
              setRevealed(true);
            }}
          />
        </div>

        {/* Question Text */}
        <h2
          style={{
            fontFamily: 'Poppins',
            fontWeight: 900,
            fontSize: '1.65rem',
            color: '#FFFFFF',
            lineHeight: 1.45,
            marginBottom: '28px',
            background: '#171717',
            padding: '24px',
            borderRadius: '16px',
            borderLeft: `6px solid ${activeCatInfo?.color || '#FF6B1A'}`,
          }}
        >
          {currentQ?.text}
        </h2>

        {/* Options Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {currentQ?.options.map((opt, idx) => {
            const isCorrect = revealed && idx === currentQ.correctIndex;
            return (
              <div
                key={idx}
                style={{
                  background: isCorrect ? 'rgba(16, 185, 129, 0.25)' : '#171717',
                  border: `2px solid ${isCorrect ? '#10B981' : '#3F3F46'}`,
                  borderRadius: '16px',
                  padding: '20px',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: isCorrect ? '#6EE7B7' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: isCorrect ? '0 0 15px rgba(16, 185, 129, 0.4)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span
                  style={{
                    background: isCorrect ? '#10B981' : activeCatInfo?.color || '#FF6B1A',
                    color: '#FFFFFF',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    marginRight: '14px',
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

        {/* Answer Explanation */}
        {revealed && (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1.5px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '16px',
              padding: '20px 24px',
              marginBottom: '28px',
              animation: 'fadeIn 0.3s ease-in-out',
            }}
          >
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, color: '#6EE7B7', fontSize: '1.05rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span> Kunci Jawaban: {['A', 'B', 'C', 'D'][currentQ.correctIndex]}. {currentQ.options[currentQ.correctIndex]}
            </div>
            <div style={{ color: '#E2E8F0', fontSize: '0.96rem', lineHeight: 1.6 }}>
              <strong>Pembahasan:</strong> {currentQ.explanation}
            </div>
          </div>
        )}

        {/* Team Inputs Section */}
        <div style={{ borderTop: '1px solid #3F3F46', paddingTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.9rem', color: '#D1D5DB', letterSpacing: '0.5px' }}>
              📥 INPUT JAWABAN KELOMPOK (DARI KARTU A/B/C/D):
            </div>
            <div style={{ fontSize: '0.8rem', color: '#9CA3AF', fontStyle: 'italic' }}>
              Klik tombol A/B/C/D sesuai kartu yang diangkat tim
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '14px', marginBottom: '28px' }}>
            {teams.map((t) => {
              const selectedAns = answers[t.id];
              return (
                <div
                  key={t.id}
                  style={{
                    background: '#171717',
                    border: '1px solid #3F3F46',
                    borderRadius: '16px',
                    padding: '14px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.92rem', color: '#FFFFFF', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>{t.emoji}</span>
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</span>
                    <span style={{ color: '#FFC857', fontSize: '0.8rem', fontWeight: 900 }}>{t.points} pt</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[0, 1, 2, 3].map((optIdx) => {
                      const isSelected = selectedAns === optIdx;
                      return (
                        <button
                          key={optIdx}
                          disabled={revealed}
                          onClick={() => handleSelectTeamAnswer(t.id, optIdx)}
                          style={{
                            flex: 1,
                            padding: '8px 0',
                            borderRadius: '10px',
                            border: '1px solid #3F3F46',
                            background: isSelected ? activeCatInfo?.color || '#FF6B1A' : '#242424',
                            color: '#FFFFFF',
                            fontFamily: 'Poppins',
                            fontWeight: 900,
                            fontSize: '0.95rem',
                            cursor: revealed ? 'default' : 'pointer',
                            boxShadow: isSelected ? `0 2px 8px ${activeCatInfo?.color || '#FF6B1A'}66` : 'none',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {['A', 'B', 'C', 'D'][optIdx]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Control Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            {!revealed ? (
              <button className="btn-success" onClick={handleCalculatePoints} style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 800 }}>
                ✅ Buka Jawaban & Hitung Poin Tim
              </button>
            ) : (
              <button className="btn-primary" onClick={handleNext} style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 800 }}>
                ⏭ Soal Berikutnya ({currentIdx + 1}/{totalQuestions})
              </button>
            )}

            <button className="btn-ghost" onClick={handleResetCurrentQuiz} style={{ padding: '14px 20px', fontSize: '0.9rem' }}>
              🔄 Ulang Kuis Materi Ini
            </button>

            <Link href="/ranking" style={{ textDecoration: 'none', marginLeft: 'auto' }}>
              <button className="btn-ghost" style={{ padding: '14px 20px', fontSize: '0.9rem' }}>
                🏆 Lihat Klasemen Poin
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
