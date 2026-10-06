'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Question } from '@/types';
import {
  soccerQuizQuestions,
  volleyQuizQuestions,
  basketballQuizQuestions,
  athleticsQuizQuestions,
  gymnasticsQuizQuestions,
  fitnessQuizQuestions,
  swimmingQuizQuestions,
  badmintonQuizQuestions,
  quizQuestions,
} from '@/data/questions';
import { useToast } from '@/components/Toast';
import Link from 'next/link';
import { QuestionTimer } from '@/components/QuestionTimer';
import { RandomTeamPicker } from '@/components/RandomTeamPicker';

type Phase = 'setup' | 'question' | 'reveal' | 'finished';

interface QuizBattleCategory {
  key: string;
  title: string;
  emoji: string;
  color: string;
  desc: string;
  questions: Question[];
}

const quizCategories: QuizBattleCategory[] = [
  {
    key: 'sepak-bola',
    title: 'Sepak Bola',
    emoji: '⚽',
    color: '#2ECC71',
    desc: 'Passing kaki dalam/punggung, heading dahi, throw-in sah, offside, & kiper',
    questions: soccerQuizQuestions,
  },
  {
    key: 'bola-voli',
    title: 'Bola Voli',
    emoji: '🏐',
    color: '#FF6B35',
    desc: 'Passing bawah/atas, servis, smash, block, posisi libero, & aturan rally point',
    questions: volleyQuizQuestions,
  },
  {
    key: 'bola-basket',
    title: 'Bola Basket',
    emoji: '🏀',
    color: '#E67E22',
    desc: 'Chest pass, layup 2 langkah, shooting BEEF, pivot kaki tumpu, & rebound',
    questions: basketballQuizQuestions,
  },
  {
    key: 'atletik',
    title: 'Atletik',
    emoji: '🏃',
    color: '#3498DB',
    desc: 'Start jongkok, lari sprint, estafet serah terima tongkat, & lompat jauh 4 fase',
    questions: athleticsQuizQuestions,
  },
  {
    key: 'senam',
    title: 'Senam Lantai',
    emoji: '🤸',
    color: '#9B59B6',
    desc: 'Guling depan/belakang tengkuk, sikap lilin, kayang tumpuan 4 titik, & meroda',
    questions: gymnasticsQuizQuestions,
  },
  {
    key: 'kebugaran',
    title: 'Kebugaran Jasmani',
    emoji: '💪',
    color: '#E74C3C',
    desc: 'Push-up, sit-up, shuttle run, peregangan statis/dinamis, & 5 item tes TKJI',
    questions: fitnessQuizQuestions,
  },
  {
    key: 'renang',
    title: 'Renang (Aktivitas Air)',
    emoji: '🏊',
    color: '#0EA5E9',
    desc: 'Pengenalan air, meluncur streamline, gaya dada, gaya bebas, punggung, & water safety',
    questions: swimmingQuizQuestions,
  },
  {
    key: 'bulutangkis',
    title: 'Bulu Tangkis',
    emoji: '🏸',
    color: '#10B981',
    desc: 'Grip raket V/jempol, footwork 6 sudut, lob, smash menukik, drop shot, netting, & rally point 21',
    questions: badmintonQuizQuestions,
  },
  {
    key: 'all',
    title: 'Semua Materi (Campuran)',
    emoji: '🌟',
    color: '#FF9F43',
    desc: 'Tantangan gabungan dari seluruh materi olahraga PJOK untuk uji kompetensi kelas',
    questions: quizQuestions,
  },
];

export default function QuizBattlePage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>('setup');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('sepak-bola');
  const [currentQ, setCurrentQ] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Store answer selected per team (teamId -> optionIndex)
  const [teamAnswers, setTeamAnswers] = useState<Record<string, number | null>>({});

  // Track bonus awarded per team for the current question
  const [bonusAwarded, setBonusAwarded] = useState<Record<string, boolean>>({});

  // Session points per team
  const [sessionScores, setSessionScores] = useState<Record<string, number>>({});

  const { showToast, ToastContainer } = useToast();

  const activeCategory =
    quizCategories.find((c) => c.key === selectedCategoryKey) || quizCategories[0];
  const questions = activeCategory.questions;
  const question = questions[currentQ] || questions[0];

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const initial: Record<string, number> = {};
      teams.forEach((t) => (initial[t.id] = 0));
      setSessionScores(initial);
    }
  }, [mounted, teams]);

  const sortedTeams = [...teams].sort(
    (a, b) => (sessionScores[b.id] || 0) - (sessionScores[a.id] || 0)
  );

  const handleSelectTeamAnswer = (teamId: string, optionIndex: number) => {
    setTeamAnswers((prev) => ({
      ...prev,
      [teamId]: prev[teamId] === optionIndex ? null : optionIndex,
    }));
  };

  const handleStartQuiz = () => {
    setCurrentQ(0);
    setTeamAnswers({});
    setBonusAwarded({});
    setIsTimeUp(false);
    setPhase('question');
    showToast(`🚀 Memulai Quiz Battle: ${activeCategory.emoji} ${activeCategory.title}!`, 'success');
  };

  const handleReveal = () => {
    setPhase('reveal');
    let correctCount = 0;

    teams.forEach((team) => {
      const teamAns = teamAnswers[team.id];
      if (teamAns === question.correctIndex) {
        correctCount++;
        addPoints(team.id, 10, `Jawaban benar kuis ${activeCategory.title}: Soal ${currentQ + 1}`, 'quiz');
        setSessionScores((prev) => ({
          ...prev,
          [team.id]: (prev[team.id] || 0) + 10,
        }));
      }
    });

    if (correctCount > 0) {
      showToast(`🎉 ${correctCount} kelompok menjawab BENAR (+10 poin)!`, 'success');
    } else {
      showToast(`❌ Belum ada kelompok yang menjawab benar pada soal ini.`, 'error');
    }
  };

  const handleBonus = (teamId: string) => {
    if (bonusAwarded[teamId]) return;
    const team = teams.find((t) => t.id === teamId);
    addPoints(teamId, 5, `Bonus penjelasan jawaban (${activeCategory.title}): Soal ${currentQ + 1}`, 'bonus');
    setSessionScores((prev) => ({ ...prev, [teamId]: (prev[teamId] || 0) + 5 }));
    setBonusAwarded((prev) => ({ ...prev, [teamId]: true }));
    showToast(`⭐ ${team?.name} mendapat bonus 5 poin!`, 'info');
  };

  const nextQuestion = () => {
    if (currentQ >= questions.length - 1) {
      setPhase('finished');
    } else {
      setCurrentQ((prev) => prev + 1);
      setPhase('question');
      setIsTimeUp(false);
      setTeamAnswers({});
      setBonusAwarded({});
    }
  };

  const skipQuestion = () => {
    nextQuestion();
  };

  if (!mounted) return null;

  const letters = ['A', 'B', 'C', 'D'];
  const answeredTeamCount = Object.values(teamAnswers).filter(
    (ans) => ans !== null && ans !== undefined
  ).length;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      <ToastContainer />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Link href="/games" style={{ textDecoration: 'none' }}>
          <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            ← Kembali ke Games
          </button>
        </Link>
        <div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#FFFFFF', margin: 0 }}>
            🧠 Quiz Battle
          </h1>
          <div style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>
            Kuis kelompok interaktif per materi pembelajaran PJOK (Semua Kelompok Menjawab)
          </div>
        </div>

        {(phase === 'question' || phase === 'reveal') && (
          <div
            style={{
              marginLeft: 'auto',
              background: '#171717',
              border: `1.5px solid ${activeCategory.color}`,
              borderRadius: '100px',
              padding: '6px 18px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>{activeCategory.emoji}</span>
            <span style={{ color: activeCategory.color }}>{activeCategory.title}</span>
            <span style={{ color: '#71717A' }}>•</span>
            <span>Soal {currentQ + 1} / {questions.length}</span>
          </div>
        )}
      </div>

      {/* SETUP PHASE */}
      {phase === 'setup' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Sub-Material Selection Card */}
          <div
            style={{
              background: '#242424',
              border: '1.5px solid #3F3F46',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.8rem' }}>🎯</span>
              <div>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#FFFFFF', margin: 0 }}>
                  Pilih Sub-Materi Kuis
                </h2>
                <div style={{ color: '#D1D5DB', fontSize: '0.88rem' }}>
                  Pilih materi pembelajaran di bawah ini. Soal kuis yang muncul akan <strong>100% khusus seputar materi yang Anda pilih</strong>:
                </div>
              </div>
            </div>

            {/* Category Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '20px' }}>
              {quizCategories.map((cat) => {
                const isSelected = cat.key === selectedCategoryKey;
                return (
                  <div
                    key={cat.key}
                    onClick={() => setSelectedCategoryKey(cat.key)}
                    style={{
                      background: isSelected ? 'rgba(255, 107, 26, 0.12)' : '#171717',
                      border: `2px solid ${isSelected ? '#FF6B1A' : '#3F3F46'}`,
                      borderRadius: '16px',
                      padding: '18px 20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      boxShadow: isSelected ? '0 4px 20px rgba(255, 107, 26, 0.25)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.8rem' }}>{cat.emoji}</span>
                        <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.05rem', color: isSelected ? '#FF9F43' : '#FFFFFF' }}>
                          {cat.title}
                        </div>
                      </div>
                      <span
                        style={{
                          background: isSelected ? '#FF6B1A' : '#2A2A2E',
                          color: '#FFFFFF',
                          borderRadius: '100px',
                          padding: '3px 10px',
                          fontSize: '0.74rem',
                          fontFamily: 'Poppins',
                          fontWeight: 700,
                        }}
                      >
                        {cat.questions.length} Soal
                      </span>
                    </div>
                    <div style={{ color: '#A1A1AA', fontSize: '0.82rem', lineHeight: 1.4 }}>
                      {cat.desc}
                    </div>
                    {isSelected && (
                      <div
                        style={{
                          marginTop: '10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#FF6B1A',
                          fontFamily: 'Poppins',
                          fontWeight: 800,
                          fontSize: '0.78rem',
                        }}
                      >
                        ✓ Sub-Materi Terpilih
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Game Rules & Teams Setup Card */}
          <div
            style={{
              background: '#242424',
              border: '1.5px solid #3F3F46',
              borderRadius: '24px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{activeCategory.emoji}</div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '10px' }}>
              Quiz Battle: {activeCategory.title}
            </h2>
            <div style={{ color: '#D1D5DB', fontSize: '0.94rem', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto', marginBottom: '24px' }}>
              1. Pertanyaan seputar <strong>{activeCategory.title}</strong> akan ditampilkan di layar satu per satu.<br />
              2. <strong>Semua kelompok</strong> berdiskusi dan memberikan jawabannya (A, B, C, atau D).<br />
              3. Guru menginput jawaban masing-masing kelompok pada layar proyektor.<br />
              4. Klik <strong>"Buka & Cek Jawaban"</strong> untuk mengungkap jawaban benar.<br />
              5. Kelompok yang benar otomatis mendapat <strong style={{ color: '#FF6B1A' }}>+10 poin</strong> (+5 bonus opsional jika aktif menjelaskan).
            </div>

            {/* Registered Teams */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, color: '#D1D5DB', marginBottom: '12px', fontSize: '0.85rem' }}>
                KELOMPOK YANG AKAN BERTANDING:
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {teams.map((team) => (
                  <div
                    key={team.id}
                    style={{
                      background: '#171717',
                      border: '1px solid #3F3F46',
                      borderRadius: '12px',
                      padding: '10px 18px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>{team.emoji}</span>
                    {team.name}
                  </div>
                ))}
              </div>
            </div>

            {teams.length === 0 ? (
              <div style={{ color: '#EF4444', marginBottom: '20px', fontFamily: 'Poppins', fontWeight: 700 }}>
                ⚠️ Belum ada kelompok. Buat kelompok di Mode Guru terlebih dahulu!
              </div>
            ) : null}

            <button
              className="btn-primary"
              onClick={handleStartQuiz}
              disabled={teams.length === 0}
              style={{
                fontSize: '1.1rem',
                padding: '14px 44px',
                opacity: teams.length === 0 ? 0.5 : 1,
              }}
            >
              🚀 Mulai Quiz Battle ({activeCategory.title})
            </button>
          </div>
        </div>
      )}

      {/* QUESTION PHASE & REVEAL PHASE */}
      {(phase === 'question' || phase === 'reveal') && question && (
        <div>
          {/* Question Box */}
          <div
            style={{
              background: '#242424',
              border: '1.5px solid #3F3F46',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '24px',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 107, 26, 0.25)',
                border: '1px solid #FF6B1A',
                borderRadius: '100px',
                padding: '4px 18px',
                display: 'inline-block',
                marginBottom: '16px',
                color: '#FF9F43',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: '0.82rem',
                textTransform: 'uppercase',
              }}
            >
              {activeCategory.emoji} {question.category || activeCategory.title}
            </div>

            {/* Countdown Timer */}
            <div style={{ textAlign: 'center', margin: '12px 0 20px' }}>
              <QuestionTimer
                currentIdx={currentQ}
                duration={30}
                isPaused={phase === 'reveal' || isTimeUp}
                onTimeUp={() => {
                  showToast('⏰ WAKTU HABIS!', 'warning');
                  setIsTimeUp(true);
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: '#FFFFFF',
                lineHeight: 1.4,
              }}
            >
              {question.text}
            </h2>

            {isTimeUp && phase === 'question' && (
              <div
                style={{
                  fontSize: '1.15rem',
                  fontFamily: 'Poppins',
                  fontWeight: 900,
                  color: '#FF4444',
                  marginTop: '16px',
                }}
              >
                ⏰ WAKTU HABIS! SILAKAN INPUT JAWABAN KELOMPOK
              </div>
            )}
          </div>

          {/* Options Grid Reference */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {question.options.map((option: string, idx: number) => {
              const isCorrect = phase === 'reveal' && idx === question.correctIndex;

              return (
                <div
                  key={idx}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '14px',
                    border: `2px solid ${isCorrect ? '#10B981' : '#3F3F46'}`,
                    background: isCorrect ? 'rgba(16, 185, 129, 0.25)' : '#242424',
                    color: isCorrect ? '#6EE7B7' : '#FFFFFF',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isCorrect ? '#10B981' : '#171717',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      color: '#FFFFFF',
                      flexShrink: 0,
                    }}
                  >
                    {letters[idx]}
                  </div>
                  <span>{option}</span>
                  {isCorrect && (
                    <span style={{ marginLeft: 'auto', fontWeight: 800, fontSize: '0.85rem', color: '#10B981' }}>
                      ✅ BENAR
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Box on Reveal */}
          {phase === 'reveal' && (
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '32px',
              }}
            >
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#6EE7B7', marginBottom: '8px' }}>
                ✅ Jawaban Benar: [{letters[question.correctIndex]}] {question.options[question.correctIndex]}
              </div>
              <div style={{ color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.6 }}>
                💡 {question.explanation}
              </div>
            </div>
          )}

          {/* QUESTION PHASE: TEAM ANSWER SELECTION */}
          {phase === 'question' && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#FFFFFF', fontSize: '1.1rem' }}>
                  🎯 PILIH JAWABAN SETIAP KELOMPOK:
                </div>
                <div style={{ fontSize: '0.85rem', color: '#D1D5DB', fontFamily: 'Poppins', fontWeight: 600 }}>
                  Sudah Mengisi: <span style={{ color: '#FF6B1A', fontWeight: 800 }}>{answeredTeamCount} / {teams.length} Kelompok</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {teams.map((team) => {
                  const selectedIdx = teamAnswers[team.id];

                  return (
                    <div
                      key={team.id}
                      style={{
                        background: '#242424',
                        border: `2px solid ${selectedIdx !== null && selectedIdx !== undefined ? '#FF6B1A' : '#3F3F46'}`,
                        borderRadius: '16px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '180px' }}>
                        <span style={{ fontSize: '1.5rem' }}>{team.emoji}</span>
                        <div>
                          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#FFFFFF', fontSize: '1rem' }}>
                            {team.name}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#D1D5DB', fontWeight: 600 }}>
                            Skor Sesi: <strong style={{ color: '#FF6B1A' }}>{sessionScores[team.id] || 0}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Options selector for this team */}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {letters.map((letter, optionIdx) => {
                          const isSelected = selectedIdx === optionIdx;

                          return (
                            <button
                              key={optionIdx}
                              onClick={() => handleSelectTeamAnswer(team.id, optionIdx)}
                              style={{
                                width: '48px',
                                height: '44px',
                                borderRadius: '10px',
                                border: `2px solid ${isSelected ? '#FF6B1A' : '#3F3F46'}`,
                                background: isSelected ? '#FF6B1A' : '#171717',
                                color: '#FFFFFF',
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 900,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {letter}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* REVEAL PHASE: BREAKDOWN OF TEAM RESULTS */}
          {phase === 'reveal' && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '16px' }}>
                📊 HASIL JAWABAN KELOMPOK:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {teams.map((team) => {
                  const selectedIdx = teamAnswers[team.id];
                  const isCorrect = selectedIdx === question.correctIndex;
                  const hasAnswered = selectedIdx !== null && selectedIdx !== undefined;

                  return (
                    <div
                      key={team.id}
                      style={{
                        background: '#242424',
                        border: `2px solid ${isCorrect ? '#10B981' : hasAnswered ? '#EF4444' : '#3F3F46'}`,
                        borderRadius: '16px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '1.5rem' }}>{team.emoji}</span>
                        <div>
                          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#FFFFFF', fontSize: '1rem' }}>
                            {team.name}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#D1D5DB' }}>
                            Jawaban: {hasAnswered ? <strong style={{ color: '#FFFFFF' }}>[{letters[selectedIdx]}] {question.options[selectedIdx]}</strong> : <em>Tidak Menjawab</em>}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        {isCorrect ? (
                          <div
                            style={{
                              background: 'rgba(16, 185, 129, 0.25)',
                              color: '#6EE7B7',
                              border: '1px solid #10B981',
                              borderRadius: '100px',
                              padding: '6px 16px',
                              fontFamily: 'Poppins, sans-serif',
                              fontWeight: 800,
                              fontSize: '0.88rem',
                            }}
                          >
                            ✅ BENAR (+10 Poin)
                          </div>
                        ) : hasAnswered ? (
                          <div
                            style={{
                              background: 'rgba(239, 68, 68, 0.25)',
                              color: '#FCA5A5',
                              border: '1px solid #EF4444',
                              borderRadius: '100px',
                              padding: '6px 16px',
                              fontFamily: 'Poppins, sans-serif',
                              fontWeight: 800,
                              fontSize: '0.88rem',
                            }}
                          >
                            ❌ SALAH (0 Poin)
                          </div>
                        ) : (
                          <div
                            style={{
                              background: '#171717',
                              color: '#D1D5DB',
                              borderRadius: '100px',
                              padding: '6px 16px',
                              fontFamily: 'Poppins, sans-serif',
                              fontWeight: 700,
                              fontSize: '0.88rem',
                            }}
                          >
                            ➖ Tidak Menjawab
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <RandomTeamPicker teams={teams} onBonusAwarded={handleBonus} />
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
            {phase === 'question' && (
              <>
                <button
                  className="btn-primary"
                  onClick={handleReveal}
                  style={{ padding: '14px 32px', fontSize: '1rem' }}
                >
                  🔍 Buka & Cek Jawaban
                </button>
                <button className="btn-ghost" onClick={skipQuestion}>
                  ⏭ Lewati
                </button>
              </>
            )}
            {phase === 'reveal' && (
              <button className="btn-primary" onClick={nextQuestion} style={{ padding: '14px 32px', fontSize: '1rem' }}>
                ⏭ Soal Berikutnya ({currentQ + 2 <= questions.length ? `${currentQ + 2}/${questions.length}` : 'Selesai'}) →
              </button>
            )}
          </div>
        </div>
      )}

      {/* FINISHED PHASE */}
      {phase === 'finished' && (
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              background: '#242424',
              border: '1.5px solid #3F3F46',
              borderRadius: '24px',
              padding: '48px 32px',
              marginBottom: '32px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(255, 107, 26, 0.25)',
                border: '1px solid #FF6B1A',
                borderRadius: '100px',
                padding: '4px 18px',
                color: '#FF9F43',
                fontFamily: 'Poppins',
                fontWeight: 800,
                fontSize: '0.85rem',
                marginBottom: '12px',
              }}
            >
              {activeCategory.emoji} KUIS {activeCategory.title.toUpperCase()}
            </div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2rem', color: '#FFFFFF', marginBottom: '8px' }}>
              Quiz Battle Selesai!
            </h2>
            <p style={{ color: '#D1D5DB', fontSize: '0.95rem', marginBottom: '24px' }}>
              Seluruh pertanyaan materi {activeCategory.title} telah selesai dimainkan. Berikut perolehan poin tim:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '440px', margin: '0 auto' }}>
              {sortedTeams.map((team, i) => (
                <div
                  key={team.id}
                  style={{
                    background: '#171717',
                    border: '1px solid rgba(255, 107, 26, 0.4)',
                    borderRadius: '14px',
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#FFFFFF' }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                    {team.emoji} {team.name}
                  </span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '1.2rem', color: '#FF6B1A' }}>
                    +{sessionScores[team.id] || 0} Poin
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={() => {
                setCurrentQ(0);
                setSessionScores({});
                setTeamAnswers({});
                setBonusAwarded({});
                setIsTimeUp(false);
                setPhase('question');
              }}
            >
              🔄 Main Lagi Materi Ini
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                setPhase('setup');
                setCurrentQ(0);
                setTeamAnswers({});
                setBonusAwarded({});
                setIsTimeUp(false);
              }}
              style={{
                background: '#2A2A2E',
                color: '#FFFFFF',
                border: '1px solid #3F3F46',
                borderRadius: '12px',
                padding: '12px 24px',
                fontFamily: 'Poppins',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              📚 Ganti Sub-Materi Lain
            </button>
            <Link href="/ranking" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ padding: '12px 24px' }}>
                🏆 Lihat Ranking
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Live Scoreboard Floating Widget */}
      {(phase === 'question' || phase === 'reveal') && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'rgba(36, 36, 36, 0.95)',
            border: '1.5px solid #3F3F46',
            borderRadius: '16px',
            padding: '16px',
            minWidth: '200px',
            backdropFilter: 'blur(12px)',
            zIndex: 50,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '0.8rem', color: '#D1D5DB', marginBottom: '10px' }}>
            SKOR SESI ({activeCategory.emoji} {activeCategory.title})
          </div>
          {sortedTeams.map((team) => (
            <div key={team.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#FFFFFF' }}>
                {team.emoji} {team.name}
              </span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#FF6B1A', fontSize: '0.9rem' }}>
                {sessionScores[team.id] || 0}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
