'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { boardThemes, BoardTheme } from '@/data/games';
import { quizQuestions, challenges } from '@/data/questions';
import { useToast } from '@/components/Toast';
import { playAudioEffect } from '@/lib/audio';
import Link from 'next/link';

export default function VolleyBoardPage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string>('bola-voli');
  const [positions, setPositions] = useState<Record<string, number>>({});
  const [activeTeamIdx, setActiveTeamIdx] = useState(0);
  const [diceVal, setDiceVal] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [activeEvent, setActiveEvent] = useState<{ title: string; desc: string; type: string; points?: number } | null>(null);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      resetPositions();
    }
  }, [mounted, selectedThemeId]);

  const resetPositions = () => {
    const init: Record<string, number> = {};
    teams.forEach((t) => (init[t.id] = 0));
    setPositions(init);
    setActiveTeamIdx(0);
    setDiceVal(null);
    setActiveEvent(null);
  };

  if (!mounted) return null;

  const currentTheme = boardThemes.find((t) => t.id === selectedThemeId) || boardThemes[0];
  const boardCells = currentTheme.cells;
  const currentTeam = teams[activeTeamIdx];

  const rollDice = () => {
    if (!currentTeam || isRolling) return;
    setIsRolling(true);
    setActiveEvent(null);

    let count = 0;
    const interval = setInterval(() => {
      setDiceVal(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setDiceVal(finalVal);
        setIsRolling(false);
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
      }
      if (nextStep >= targetPos) {
        clearInterval(stepInterval);
        handleCellTrigger(teamId, targetPos);
      }
    }, 300);
  };

  const moveTeam = (teamId: string, steps: number) => {
    const currentPos = positions[teamId] || 0;
    let nextPos = currentPos + steps;
    if (nextPos >= boardCells.length) nextPos = boardCells.length - 1;

    setPositions((prev) => ({ ...prev, [nextPos]: nextPos }));
    handleCellTrigger(teamId, nextPos);
  };

  const handleCellTrigger = (teamId: string, cellIdx: number) => {
    const cell = boardCells[cellIdx];
    const team = teams.find((t) => t.id === teamId);

    if (cell.type === 'points' || cell.type === 'bonus') {
      const pts = cell.value || 10;
      addPoints(teamId, pts, `${currentTheme.name}: ${cell.label}`, 'game');
      showToast(`🎉 ${team?.name} mendarat di Kotak #${cellIdx} (${cell.label})! (+${pts} Poin)`, 'success');
      setActiveEvent({ title: cell.label, desc: cell.description || '', type: 'bonus', points: pts });
    } else if (cell.type === 'penalty') {
      const pts = Math.abs(cell.value || -5);
      addPoints(teamId, -pts, `${currentTheme.name}: Penalti`, 'manual');
      showToast(`⚠️ ${team?.name} mendarat di Kotak #${cellIdx} (${cell.label}) (-${pts} Poin)`, 'error');
      setActiveEvent({ title: cell.label, desc: cell.description || '', type: 'penalty', points: -pts });
    } else if (cell.type === 'quiz') {
      const themeSlug = currentTheme.id;
      const topicQuestions = quizQuestions.filter((q) => {
        const cat = q.category.toLowerCase();
        if (themeSlug === 'bola-voli') return cat.includes('voli');
        if (themeSlug === 'sepak-bola') return cat.includes('sepak');
        if (themeSlug === 'bola-basket') return cat.includes('basket');
        if (themeSlug === 'atletik') return cat.includes('atletik');
        if (themeSlug === 'senam') return cat.includes('senam');
        if (themeSlug === 'kebugaran') return cat.includes('kebugaran');
        return false;
      });
      const randomQ = topicQuestions.length > 0
        ? topicQuestions[Math.floor(Math.random() * topicQuestions.length)]
        : quizQuestions[Math.floor(Math.random() * quizQuestions.length)];

      setActiveEvent({ title: `❓ Kuis ${currentTheme.name} (Kotak #${cellIdx})`, desc: randomQ.text, type: 'quiz', points: 10 });
    } else if (cell.type === 'challenge' || cell.type === 'superchallenge') {
      const themeSlug = currentTheme.id;
      const topicChallenges = challenges.filter((c) => c.category === themeSlug);
      const randomC = topicChallenges.length > 0
        ? topicChallenges[Math.floor(Math.random() * topicChallenges.length)]
        : challenges[Math.floor(Math.random() * challenges.length)];

      setActiveEvent({ title: `💪 ${randomC.title} (Kotak #${cellIdx})`, desc: randomC.description, type: 'challenge', points: randomC.points });
    } else if (cell.type === 'move') {
      const extra = cell.value || 1;
      showToast(`⏩ ${team?.name} berpindah lagi ${extra} langkah!`, 'info');
      setTimeout(() => moveTeam(teamId, extra), 800);
    } else if (cell.type === 'finish') {
      addPoints(teamId, 50, `Mencapai FINISH ${currentTheme.name}!`, 'game');
      showToast(`👑 SELAMAT! ${team?.name} mencapai FINISH! (+50 Poin)`, 'success');
      setActiveEvent({ title: `🎉 CHAMPION FINISH!`, desc: `${team?.name} telah memenangkan ${currentTheme.name} di garis Finish!`, type: 'finish', points: 50 });
    }
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
          `❌ TANTANGAN GAGAL! Dadu Penalti: ${penaltySteps}. Bidak ${currentTeam.name} MUNDUR ${penaltySteps} KOTAK ke belakang!`,
          'error'
        );

        setTimeout(() => {
          nextTurn();
        }, 1800);
      }
    }, 100);
  };

  const nextTurn = () => {
    setActiveEvent(null);
    setDiceVal(null);
    setActiveTeamIdx((prev) => (prev + 1) % teams.length);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      <ToastContainer />
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Link href="/games">
          <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>← Kembali</button>
        </Link>
        <div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#FFFFFF', margin: 0 }}>
            🎲 Sports Board Game
          </h1>
          <div style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>Pilih materi & jalankan bidak kelompok di atas papan!</div>
        </div>
      </div>

      {/* Board Theme Selection Tabs */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '10px' }}>
          PILIH PAPAN MATERI PEMBELAJARAN:
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
          {boardThemes.map((theme) => {
            const isSelected = theme.id === selectedThemeId;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  if (isSelected) return;
                  setSelectedThemeId(theme.id);
                }}
                style={{
                  background: isSelected ? '#FF6B1A' : '#171717',
                  border: `2px solid ${isSelected ? '#FF6B1A' : '#3F3F46'}`,
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
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{theme.emoji}</span>
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Theme Banner */}
      <div
        style={{
          background: '#242424',
          border: '1.5px solid rgba(255, 107, 26, 0.4)',
          borderRadius: '16px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{ fontSize: '2.2rem' }}>{currentTheme.emoji}</div>
        <div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.1rem', color: '#FF6B1A' }}>
            {currentTheme.name}
          </div>
          <div style={{ color: '#D1D5DB', fontSize: '0.88rem' }}>
            {currentTheme.description}
          </div>
        </div>
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
        <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.9rem', color: '#FF6B1A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>♟️</span> POSISI BIDAK JALAN KELOMPOK (TOTAL 18 KOTAK)
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
                  border: `2px solid ${isTurn ? '#FF6B1A' : '#3F3F46'}`,
                  borderRadius: '16px',
                  padding: '14px 16px',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Pawn Icon Token */}
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#FF6B1A',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 900,
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                        border: '2px solid white',
                      }}
                    >
                      {t.emoji}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>
                        {t.name}
                      </div>
                      {isTurn && (
                        <span style={{ fontSize: '0.72rem', color: '#FF9F43', fontFamily: 'Poppins', fontWeight: 800 }}>
                          ▶ GILIRAN MAIN
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Position Badge */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.1rem', color: '#FF6B1A' }}>
                      Kotak #{pos}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#D1D5DB', fontFamily: 'Poppins', fontWeight: 600 }}>
                      {boardCells[pos]?.label}
                    </div>
                  </div>
                </div>

                {/* Progress bar to Finish */}
                <div className="progress-bar" style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)' }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #FF6B1A, #FF9F43)',
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))', gap: '12px' }}>
          {boardCells.map((cell) => {
            const teamsHere = teams.filter((t) => (positions[t.id] || 0) === cell.id);
            const isStart = cell.type === 'start';
            const isFinish = cell.type === 'finish';
            const hasPawns = teamsHere.length > 0;

            return (
              <div
                key={cell.id}
                style={{
                  background: isFinish
                    ? 'rgba(255, 200, 87, 0.25)'
                    : isStart
                    ? '#FF6B1A'
                    : hasPawns
                    ? 'rgba(255, 107, 26, 0.25)'
                    : '#171717',
                  border: `2px solid ${
                    isFinish
                      ? '#FFC857'
                      : isStart
                      ? '#FF6B1A'
                      : hasPawns
                      ? '#FF6B1A'
                      : '#3F3F46'
                  }`,
                  borderRadius: '16px',
                  padding: '12px 8px',
                  textAlign: 'center',
                  minHeight: '100px',
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
                
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.74rem', color: '#FFFFFF', margin: '2px 0' }}>
                  {cell.label}
                </div>

                {/* Team Pawn Tokens on Cell */}
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', minHeight: '26px', alignItems: 'center' }}>
                  {teamsHere.map((t) => {
                    const isCurrentTurnPawn = teams[activeTeamIdx]?.id === t.id;
                    return (
                      <div
                        key={t.id}
                        style={{
                          background: '#FF6B1A',
                          color: '#FFFFFF',
                          borderRadius: '50%',
                          width: '26px',
                          height: '26px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85rem',
                          fontWeight: 900,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                          border: isCurrentTurnPawn ? '2px solid #FFC857' : '1px solid rgba(255,255,255,0.3)',
                          transform: isCurrentTurnPawn ? 'scale(1.2)' : 'scale(1)',
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
            border: '2px solid #FF6B1A',
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
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#FF6B1A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 900,
                border: '3px solid white',
                boxShadow: '0 4px 14px rgba(255, 107, 26, 0.4)',
              }}
            >
              {currentTeam.emoji}
            </div>

            <div>
              <div style={{ color: '#D1D5DB', fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.8rem' }}>
                GILIRAN KOCOK DADU:
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.6rem', color: '#FFFFFF' }}>
                {currentTeam.name}
              </div>
              <div style={{ color: '#FF6B1A', fontSize: '0.85rem', fontFamily: 'Poppins', fontWeight: 700 }}>
                📍 Posisi Bidak: Kotak #{positions[currentTeam.id] || 0} ({boardCells[positions[currentTeam.id] || 0]?.label})
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
                  background: 'rgba(255, 107, 26, 0.2)',
                  border: '2px solid #FF6B1A',
                  color: '#FF9F43',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Poppins',
                  fontWeight: 900,
                  fontSize: '2.2rem',
                  boxShadow: '0 4px 14px rgba(255, 107, 26, 0.3)',
                }}
              >
                {diceVal}
              </div>
            )}
            <button className="btn-primary" style={{ padding: '14px 36px', fontSize: '1.1rem' }} onClick={rollDice} disabled={isRolling}>
              🎲 {isRolling ? 'Mengocok Dadu...' : 'ROLL DICE (KOCOK DADU)'}
            </button>
          </div>
        </div>
      )}

      {/* Event Modal / Card */}
      {activeEvent && (
        <div
          style={{
            marginTop: '20px',
            background: '#242424',
            border: '2px solid #FF6B1A',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '8px' }}>
            {activeEvent.title}
          </h3>
          <p style={{ color: '#D1D5DB', fontSize: '0.95rem', marginBottom: '16px', lineHeight: 1.6 }}>
            {activeEvent.desc}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {(activeEvent.type === 'quiz' || activeEvent.type === 'challenge') && (
              <>
                <button
                  className="btn-success"
                  disabled={isRolling}
                  onClick={() => {
                    showToast(`✅ Tantangan/Kuis Berhasil! Bidak ${currentTeam?.name} aman di kotak ini.`, 'success');
                    nextTurn();
                  }}
                >
                  ✅ Berhasil (Aman & Lanjut Giliran)
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
            <button className="btn-ghost" disabled={isRolling} onClick={nextTurn} style={{ marginLeft: 'auto' }}>
              ⏭ Lewati & Next Giliran
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
