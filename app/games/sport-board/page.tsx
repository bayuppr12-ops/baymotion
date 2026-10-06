'use client';

import { useState, useEffect, useMemo } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { boardThemes, BoardTheme } from '@/data/games';
import { quizQuestions, challenges } from '@/data/questions';
import { useToast } from '@/components/Toast';
import { playAudioEffect } from '@/lib/audio';
import Link from 'next/link';

interface ActiveEventData {
  title: string;
  desc: string;
  type: string;
  points?: number;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
  duration?: number;
}

export default function SportBoardPage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string>('bulutangkis');
  const [positions, setPositions] = useState<Record<string, number>>({});
  const [activeTeamIdx, setActiveTeamIdx] = useState(0);
  const [diceVal, setDiceVal] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [activeEvent, setActiveEvent] = useState<ActiveEventData | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizRevealed, setIsQuizRevealed] = useState(false);
  const [challengeTimer, setChallengeTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    // Cek parameter tema dari URL (misal: ?materi=bulutangkis atau ?theme=bulutangkis)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const targetTheme = params.get('materi') || params.get('theme');
      if (targetTheme && boardThemes.some((t) => t.id === targetTheme)) {
        setSelectedThemeId(targetTheme);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      resetPositions();
    }
  }, [mounted, selectedThemeId]);

  // Challenge countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning && challengeTimer !== null && challengeTimer > 0) {
      timer = setInterval(() => {
        setChallengeTimer((prev) => {
          if (prev !== null && prev <= 1) {
            playAudioEffect('wrong');
            showToast('⏰ Waktu tantangan telah habis!', 'warning');
            setIsTimerRunning(false);
            return 0;
          }
          return prev !== null ? prev - 1 : 0;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, challengeTimer]);

  const resetPositions = () => {
    const init: Record<string, number> = {};
    teams.forEach((t) => (init[t.id] = 0));
    setPositions(init);
    setActiveTeamIdx(0);
    setDiceVal(null);
    setActiveEvent(null);
    setSelectedQuizOption(null);
    setIsQuizRevealed(false);
    setIsTimerRunning(false);
    setChallengeTimer(null);
  };

  if (!mounted) return null;

  const currentTheme = boardThemes.find((t) => t.id === selectedThemeId) || boardThemes[0];
  const boardCells = currentTheme.cells;
  const currentTeam = teams[activeTeamIdx];

  const rollDice = () => {
    if (!currentTeam || isRolling) return;
    setIsRolling(true);
    setActiveEvent(null);
    setSelectedQuizOption(null);
    setIsQuizRevealed(false);
    setIsTimerRunning(false);
    setChallengeTimer(null);
    playAudioEffect('spin');

    let count = 0;
    const interval = setInterval(() => {
      setDiceVal(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setDiceVal(finalVal);
        setIsRolling(false);
        playAudioEffect('click');
        moveTeamStepByStep(currentTeam.id, finalVal);
      }
    }, 100);
  };

  const moveTeamStepByStep = (teamId: string, steps: number) => {
    const currentPos = positions[teamId] || 0;
    let targetPos = currentPos + steps;
    if (targetPos >= boardCells.length) targetPos = boardCells.length - 1;

    let stepCounter = 0;
    const stepInterval = setInterval(() => {
      stepCounter++;
      const nextStep = currentPos + stepCounter;
      if (nextStep <= targetPos) {
        setPositions((prev) => ({ ...prev, [teamId]: nextStep }));
        playAudioEffect('card');
      }
      if (nextStep >= targetPos) {
        clearInterval(stepInterval);
        handleCellTrigger(teamId, targetPos);
      }
    }, 280);
  };

  const moveTeam = (teamId: string, steps: number) => {
    const currentPos = positions[teamId] || 0;
    let nextPos = currentPos + steps;
    if (nextPos >= boardCells.length) nextPos = boardCells.length - 1;
    if (nextPos < 0) nextPos = 0;

    setPositions((prev) => ({ ...prev, [teamId]: nextPos }));
    handleCellTrigger(teamId, nextPos);
  };

  const handleCellTrigger = (teamId: string, cellIdx: number) => {
    const cell = boardCells[cellIdx];
    const team = teams.find((t) => t.id === teamId);

    // KOTAK FINISH (Juara)
    if (cell.type === 'finish') {
      addPoints(teamId, 50, `Juara Finish Sport Board (${currentTheme.name})!`, 'game');
      playAudioEffect('win');
      showToast(`👑 SELAMAT! ${team?.name} berhasil menembus GARIS FINISH! (+50 Poin)`, 'success');
      setActiveEvent({
        title: `🎉 CHAMPION FINISH!`,
        desc: `Selamat kepada tim ${team?.name}! Bidak kalian sukses menyelesaikan papan permainan ${currentTheme.name} di garis Finish!`,
        type: 'finish',
        points: 50,
      });
      return;
    }

    // KOTAK KUIS (Asah Otak & Teori/Aturan)
    if (cell.type === 'quiz') {
      const themeSlug = currentTheme.id;
      const topicQuestions = quizQuestions.filter((q) => {
        const cat = q.category.toLowerCase();
        if (themeSlug === 'bulutangkis') return cat.includes('bulutangkis') || cat.includes('badminton');
        if (themeSlug === 'bola-voli') return cat.includes('voli');
        if (themeSlug === 'sepak-bola') return cat.includes('sepak');
        if (themeSlug === 'bola-basket') return cat.includes('basket');
        if (themeSlug === 'atletik') return cat.includes('atletik');
        if (themeSlug === 'senam') return cat.includes('senam');
        if (themeSlug === 'kebugaran') return cat.includes('kebugaran');
        if (themeSlug === 'renang') return cat.includes('renang');
        return false;
      });

      const pool = topicQuestions.length > 0 ? topicQuestions : quizQuestions;
      const randomQ = pool[Math.floor(Math.random() * pool.length)];

      setActiveEvent({
        title: `❓ ${cell.label} (Kotak #${cellIdx})`,
        desc: cell.description ? `${cell.description}\n\n👉 Soal: ${randomQ.text}` : randomQ.text,
        type: 'quiz',
        points: cell.value || 10,
        options: randomQ.options,
        correctIndex: randomQ.correctIndex,
        explanation: randomQ.explanation,
      });
      setSelectedQuizOption(null);
      setIsQuizRevealed(false);
      return;
    }

    // SEMUA KOTAK LAINNYA ADALAH TANTANGAN FISIK / GERAKAN BEREGU
    // TIDAK ADA BONUS JALAN TANPA TANTANGAN
    const pts = cell.value || (cell.type === 'superchallenge' ? 30 : 15);
    const duration = cell.type === 'superchallenge' ? 60 : 45;

    setActiveEvent({
      title: `${cell.emoji} ${cell.label} (Kotak #${cellIdx})`,
      desc: cell.description || 'Lakukan peragaan teknik bersama kelompok dengan benar di depan kelas!',
      type: 'challenge',
      points: pts,
      duration: duration,
    });
    setChallengeTimer(duration);
    setIsTimerRunning(false);
  };

  const handleRollPenaltyDice = () => {
    if (!currentTeam || isRolling) return;
    setIsRolling(true);
    playAudioEffect('card');

    let count = 0;
    const interval = setInterval(() => {
      setDiceVal(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
        const penaltySteps = Math.floor(Math.random() * 6) + 1;
        setDiceVal(penaltySteps);
        setIsRolling(false);
        playAudioEffect('wrong');

        const currentPos = positions[currentTeam.id] || 0;
        const targetPos = Math.max(0, currentPos - penaltySteps);
        setPositions((prev) => ({ ...prev, [currentTeam.id]: targetPos }));

        showToast(
          `❌ GAGAL! Dadu Penalti: ${penaltySteps}. Bidak ${currentTeam.name} MUNDUR ${penaltySteps} KOTAK ke posisi #${targetPos}!`,
          'error'
        );

        setTimeout(() => {
          nextTurn();
        }, 1800);
      }
    }, 100);
  };

  const handleQuizSuccess = () => {
    if (!currentTeam) return;
    const pts = activeEvent?.points || 10;
    addPoints(currentTeam.id, pts, `Sport Board Kuis: ${currentTheme.name}`, 'game');
    playAudioEffect('correct');
    showToast(`✅ Jawaban Benar! ${currentTeam.name} meraih +${pts} Poin dan tetap di kotak ini!`, 'success');
    nextTurn();
  };

  const handleChallengeSuccess = () => {
    if (!currentTeam) return;
    const pts = activeEvent?.points || 15;
    addPoints(currentTeam.id, pts, `Sport Board Tantangan: ${currentTheme.name}`, 'bonus');
    playAudioEffect('correct');
    showToast(`💪 Tantangan Sukses! ${currentTeam.name} meraih +${pts} Poin!`, 'success');
    nextTurn();
  };

  const nextTurn = () => {
    setActiveEvent(null);
    setDiceVal(null);
    setSelectedQuizOption(null);
    setIsQuizRevealed(false);
    setIsTimerRunning(false);
    setChallengeTimer(null);
    setActiveTeamIdx((prev) => (prev + 1) % teams.length);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      <ToastContainer />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/games">
            <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>← Game Arena</button>
          </Link>
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🎲</span> Sport Board
            </h1>
            <div style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>
              Board game materi olahraga PJOK interaktif untuk proyektor kelas
            </div>
          </div>
        </div>

        <button
          className="btn-ghost"
          onClick={resetPositions}
          style={{ padding: '8px 16px', fontSize: '0.85rem', border: '1px solid #3F3F46' }}
          title="Reset posisi semua bidak ke kotak start"
        >
          🔄 Reset Papan
        </button>
      </div>

      {/* Board Theme Selection Tabs */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🏆</span> PILIH PAPAN MATERI PEMBELAJARAN:
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
          {boardThemes.map((theme) => {
            const isSelected = theme.id === selectedThemeId;
            return (
              <button
                key={theme.id}
                id={`sportboard-theme-${theme.id}`}
                onClick={() => {
                  if (isSelected) return;
                  setSelectedThemeId(theme.id);
                }}
                style={{
                  background: isSelected ? (theme.id === 'bulutangkis' ? '#10B981' : '#FF6B1A') : '#171717',
                  border: `2px solid ${isSelected ? (theme.id === 'bulutangkis' ? '#10B981' : '#FF6B1A') : '#3F3F46'}`,
                  borderRadius: '14px',
                  padding: '12px 18px',
                  cursor: 'pointer',
                  color: isSelected ? '#FFFFFF' : '#D1D5DB',
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 18px rgba(0, 0, 0, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{theme.emoji}</span>
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Theme Banner */}
      <div
        style={{
          background: selectedThemeId === 'bulutangkis'
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))'
            : '#242424',
          border: `1.5px solid ${selectedThemeId === 'bulutangkis' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 107, 26, 0.4)'}`,
          borderRadius: '18px',
          padding: '16px 22px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{ fontSize: '2.4rem' }}>{currentTheme.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.15rem', color: selectedThemeId === 'bulutangkis' ? '#34D399' : '#FF9F43' }}>
            {currentTheme.name}
          </div>
          <div style={{ color: '#D1D5DB', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {currentTheme.description}
          </div>
        </div>
        {selectedThemeId === 'bulutangkis' && (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '100px',
              padding: '6px 14px',
              color: '#6EE7B7',
              fontFamily: 'Poppins',
              fontWeight: 800,
              fontSize: '0.78rem',
              whiteSpace: 'nowrap',
            }}
          >
            🏸 BULU TANGKIS AKTIF
          </div>
        )}
      </div>

      {/* Team Pawns Summary Panel */}
      <div
        style={{
          background: '#242424',
          border: '1.5px solid #3F3F46',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.9rem', color: '#FF9F43', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>♟️</span> POSISI BIDAK KELOMPOK (TOTAL {boardCells.length} KOTAK)
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
            Giliran: <strong style={{ color: '#FFFFFF' }}>{currentTeam?.name}</strong>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {teams.map((t, idx) => {
            const pos = positions[t.id] || 0;
            const progress = (pos / (boardCells.length - 1)) * 100;
            const isTurn = idx === activeTeamIdx;

            return (
              <div
                key={t.id}
                style={{
                  background: isTurn ? '#171717' : '#242424',
                  border: `2px solid ${isTurn ? (selectedThemeId === 'bulutangkis' ? '#10B981' : '#FF6B1A') : '#3F3F46'}`,
                  borderRadius: '16px',
                  padding: '14px 16px',
                  transition: 'all 0.3s ease',
                  boxShadow: isTurn ? '0 4px 16px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: isTurn ? (selectedThemeId === 'bulutangkis' ? '#10B981' : '#FF6B1A') : '#3F3F46',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        border: '2px solid white',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      {t.emoji}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>
                        {t.name}
                      </div>
                      {isTurn ? (
                        <span style={{ fontSize: '0.72rem', color: selectedThemeId === 'bulutangkis' ? '#34D399' : '#FF9F43', fontFamily: 'Poppins', fontWeight: 800 }}>
                          ▶ SEDANG GILIRAN
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Menunggu</span>
                      )}
                    </div>
                  </div>

                  {/* Position Badge */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.1rem', color: selectedThemeId === 'bulutangkis' ? '#34D399' : '#FF9F43' }}>
                      Kotak #{pos}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#D1D5DB', fontFamily: 'Poppins', fontWeight: 600, maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {boardCells[pos]?.label}
                    </div>
                  </div>
                </div>

                {/* Progress bar to Finish */}
                <div className="progress-bar" style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${progress}%`,
                      background: selectedThemeId === 'bulutangkis' ? 'linear-gradient(90deg, #10B981, #34D399)' : 'linear-gradient(90deg, #FF6B1A, #FF9F43)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Board Grid with Visual Pawns */}
      <div
        style={{
          background: '#242424',
          border: '1.5px solid #3F3F46',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
          {boardCells.map((cell) => {
            const teamsHere = teams.filter((t) => (positions[t.id] || 0) === cell.id);
            const isStart = cell.type === 'start';
            const isFinish = cell.type === 'finish';
            const hasPawns = teamsHere.length > 0;

            const accentColor = selectedThemeId === 'bulutangkis' ? '#10B981' : '#FF6B1A';

            return (
              <div
                key={cell.id}
                style={{
                  background: isFinish
                    ? 'rgba(255, 200, 87, 0.25)'
                    : isStart
                    ? accentColor
                    : hasPawns
                    ? (selectedThemeId === 'bulutangkis' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 107, 26, 0.25)')
                    : '#171717',
                  border: `2px solid ${
                    isFinish
                      ? '#FFC857'
                      : isStart
                      ? accentColor
                      : hasPawns
                      ? accentColor
                      : '#3F3F46'
                  }`,
                  borderRadius: '16px',
                  padding: '12px 8px',
                  textAlign: 'center',
                  minHeight: '108px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Cell Number Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    background: '#171717',
                    borderRadius: '6px',
                    padding: '2px 6px',
                    fontSize: '0.65rem',
                    fontFamily: 'Poppins',
                    fontWeight: 800,
                    color: '#D1D5DB',
                  }}
                >
                  #{cell.id}
                </div>

                <div style={{ fontSize: '1.6rem', marginTop: '14px' }}>{cell.emoji}</div>

                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.74rem', color: '#FFFFFF', margin: '2px 0', lineHeight: 1.2 }}>
                  {cell.label}
                </div>

                {/* Team Pawn Tokens on Cell */}
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', minHeight: '28px', alignItems: 'center' }}>
                  {teamsHere.map((t) => {
                    const isCurrentTurnPawn = teams[activeTeamIdx]?.id === t.id;
                    return (
                      <div
                        key={t.id}
                        style={{
                          background: accentColor,
                          color: '#FFFFFF',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                          fontWeight: 900,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                          border: isCurrentTurnPawn ? '2.5px solid #FFC857' : '1.5px solid rgba(255,255,255,0.4)',
                          transform: isCurrentTurnPawn ? 'scale(1.15)' : 'scale(1)',
                          zIndex: isCurrentTurnPawn ? 5 : 1,
                        }}
                        title={`Bidak ${t.name} (Kotak #${cell.id})`}
                      >
                        {t.emoji}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Area */}
      {currentTeam && (
        <div
          style={{
            background: '#242424',
            border: `2px solid ${selectedThemeId === 'bulutangkis' ? '#10B981' : '#FF6B1A'}`,
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: selectedThemeId === 'bulutangkis' ? '#10B981' : '#FF6B1A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 900,
                border: '3px solid white',
                boxShadow: selectedThemeId === 'bulutangkis' ? '0 4px 14px rgba(16, 185, 129, 0.4)' : '0 4px 14px rgba(255, 107, 26, 0.4)',
              }}
            >
              {currentTeam.emoji}
            </div>

            <div>
              <div style={{ color: '#D1D5DB', fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.8rem' }}>
                GILIRAN LEMPAR DADU:
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.6rem', color: '#FFFFFF' }}>
                {currentTeam.name}
              </div>
              <div style={{ color: selectedThemeId === 'bulutangkis' ? '#34D399' : '#FF9F43', fontSize: '0.85rem', fontFamily: 'Poppins', fontWeight: 700 }}>
                📍 Posisi: Kotak #{positions[currentTeam.id] || 0} ({boardCells[positions[currentTeam.id] || 0]?.label})
              </div>
            </div>
          </div>

          {/* Dice display */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {diceVal !== null && (
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  background: selectedThemeId === 'bulutangkis' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 107, 26, 0.2)',
                  border: `2px solid ${selectedThemeId === 'bulutangkis' ? '#10B981' : '#FF6B1A'}`,
                  color: selectedThemeId === 'bulutangkis' ? '#34D399' : '#FF9F43',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Poppins',
                  fontWeight: 900,
                  fontSize: '2.2rem',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                }}
              >
                {diceVal}
              </div>
            )}
            <button
              id="sportboard-roll-btn"
              className="btn-primary"
              style={{
                padding: '14px 34px',
                fontSize: '1.05rem',
                background: selectedThemeId === 'bulutangkis' ? '#10B981' : '#FF6B1A',
                boxShadow: selectedThemeId === 'bulutangkis' ? '0 4px 16px rgba(16, 185, 129, 0.4)' : undefined,
              }}
              onClick={rollDice}
              disabled={isRolling}
            >
              🎲 {isRolling ? 'Mengocok Dadu...' : 'ROLL DICE (KOCOK DADU)'}
            </button>
          </div>
        </div>
      )}

      {/* Active Event Modal / Card */}
      {activeEvent && (
        <div
          style={{
            marginTop: '24px',
            background: '#242424',
            border: `2px solid ${selectedThemeId === 'bulutangkis' ? '#10B981' : '#FF6B1A'}`,
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.3rem', color: '#FFFFFF', margin: 0 }}>
              {activeEvent.title}
            </h3>
            {activeEvent.points !== undefined && activeEvent.points !== 0 && (
              <span
                style={{
                  background: activeEvent.points > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  border: `1px solid ${activeEvent.points > 0 ? '#10B981' : '#EF4444'}`,
                  color: activeEvent.points > 0 ? '#6EE7B7' : '#FCA5A5',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '0.8rem',
                  fontFamily: 'Poppins',
                  fontWeight: 800,
                }}
              >
                {activeEvent.points > 0 ? `+${activeEvent.points} Poin` : `${activeEvent.points} Poin`}
              </span>
            )}
          </div>

          <p style={{ color: '#E5E7EB', fontSize: '1rem', marginBottom: '20px', lineHeight: 1.6 }}>
            {activeEvent.desc}
          </p>

          {/* Interactive Multiple Choice Options for Quiz */}
          {activeEvent.type === 'quiz' && activeEvent.options && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginBottom: '14px' }}>
                {activeEvent.options.map((opt, idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isSelected = selectedQuizOption === idx;
                  const isCorrect = isQuizRevealed && idx === activeEvent.correctIndex;
                  const isWrong = isQuizRevealed && isSelected && idx !== activeEvent.correctIndex;

                  return (
                    <button
                      key={idx}
                      className={`option-btn ${isCorrect ? 'correct' : isWrong ? 'wrong' : isSelected ? 'selected' : ''}`}
                      onClick={() => !isQuizRevealed && setSelectedQuizOption(idx)}
                      style={{ padding: '12px 14px' }}
                    >
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          background: '#171717',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Poppins',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          fontSize: '0.85rem',
                          flexShrink: 0,
                        }}
                      >
                        {letters[idx]}
                      </div>
                      <span style={{ fontSize: '0.9rem' }}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Reveal explanation */}
              {isQuizRevealed && activeEvent.explanation && (
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '14px',
                    padding: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ color: '#6EE7B7', fontFamily: 'Poppins', fontWeight: 800, marginBottom: '4px', fontSize: '0.85rem' }}>
                    💡 Penjelasan Kuis:
                  </div>
                  <div style={{ color: '#FFFFFF', fontSize: '0.92rem', lineHeight: 1.5 }}>
                    {activeEvent.explanation}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Challenge Timer Widget */}
          {activeEvent.type === 'challenge' && challengeTimer !== null && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: '#171717',
                border: '1px solid #3F3F46',
                borderRadius: '16px',
                padding: '14px 20px',
                marginBottom: '20px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ fontSize: '1.8rem', color: challengeTimer <= 10 ? '#EF4444' : '#FF9F43', fontFamily: 'Poppins', fontWeight: 900 }}>
                ⏱ {challengeTimer}s
              </div>
              <div style={{ color: '#D1D5DB', fontSize: '0.85rem', flex: 1 }}>
                Lakukan tantangan gerakan fisik di hadapan teman sekelas sebelum waktu habis!
              </div>
              <button
                className="btn-ghost"
                style={{ border: '1px solid #3F3F46', padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => setIsTimerRunning((prev) => !prev)}
              >
                {isTimerRunning ? '⏸ Pause Timer' : '▶ Mulai Timer'}
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {activeEvent.type === 'quiz' && (
              <>
                {!isQuizRevealed ? (
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setIsQuizRevealed(true);
                      playAudioEffect('card');
                    }}
                  >
                    🔍 Kunci &amp; Buka Jawaban
                  </button>
                ) : (
                  <button className="btn-success" onClick={handleQuizSuccess}>
                    ✅ Benar (+10 Poin &amp; Lanjut)
                  </button>
                )}
                <button
                  className="btn-danger"
                  disabled={isRolling}
                  onClick={handleRollPenaltyDice}
                >
                  🎲 ❌ GAGAL (ROLL DADU PENALTI MUNDUR!)
                </button>
              </>
            )}

            {activeEvent.type === 'challenge' && (
              <>
                <button className="btn-success" onClick={handleChallengeSuccess}>
                  ✅ Berhasil (+{activeEvent.points} Poin &amp; Lanjut)
                </button>
                <button
                  className="btn-danger"
                  disabled={isRolling}
                  onClick={handleRollPenaltyDice}
                >
                  🎲 ❌ GAGAL (ROLL DADU PENALTI MUNDUR!)
                </button>
              </>
            )}

            {(activeEvent.type === 'bonus' || activeEvent.type === 'penalty' || activeEvent.type === 'move' || activeEvent.type === 'finish') && (
              <button className="btn-success" onClick={nextTurn}>
                ▶ Lanjut ke Giliran Berikutnya
              </button>
            )}

            <button className="btn-ghost" disabled={isRolling} onClick={nextTurn} style={{ marginLeft: 'auto' }}>
              ⏭ Lewati &amp; Next Giliran
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
