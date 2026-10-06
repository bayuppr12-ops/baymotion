'use client';

import { useState, useEffect, useMemo } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { detectiveQuestions } from '@/data/questions';
import { materials } from '@/data/materials';
import { useToast } from '@/components/Toast';
import Link from 'next/link';
import { RandomTeamPicker } from '@/components/RandomTeamPicker';

const ALL = 'semua';

export default function DetektifKesalahanPage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [materialFilter, setMaterialFilter] = useState<string>(ALL);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answeringTeam, setAnsweringTeam] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    // Dukungan tautan langsung, mis. /games/detektif-kesalahan?materi=bulutangkis
    const param = new URLSearchParams(window.location.search).get('materi');
    if (param && detectiveQuestions.some((q) => q.material === param)) {
      setMaterialFilter(param);
    }
    setMounted(true);
  }, []);

  // Daftar materi yang memiliki kasus detektif
  const materialTabs = useMemo(() => {
    return materials
      .map((m) => ({
        id: m.id,
        title: m.title,
        emoji: m.emoji,
        count: detectiveQuestions.filter((q) => q.material === m.id).length,
      }))
      .filter((m) => m.count > 0);
  }, []);

  const filteredQuestions = useMemo(
    () => (materialFilter === ALL ? detectiveQuestions : detectiveQuestions.filter((q) => q.material === materialFilter)),
    [materialFilter]
  );

  if (!mounted) return null;

  const currentQ = filteredQuestions[currentIdx] ?? filteredQuestions[0];
  const activeMaterial = materialTabs.find((m) => m.id === materialFilter);
  const isBadminton = materialFilter === 'bulutangkis';

  const resetRound = () => {
    setSelectedOpt(null);
    setAnsweringTeam(null);
    setRevealed(false);
  };

  const handleSelectMaterial = (id: string) => {
    if (id === materialFilter) return;
    setMaterialFilter(id);
    setCurrentIdx(0);
    resetRound();
  };

  const handleNext = () => {
    resetRound();
    if (currentIdx < filteredQuestions.length - 1) {
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
    const label = activeMaterial ? `Detektif Kesalahan (${activeMaterial.title})` : 'Detektif Kesalahan';
    addPoints(answeringTeam, points, label, 'game');
    showToast(`✅ ${team?.name} mendapatkan +${points} poin!`, 'success');
  };

  const handleBonusAwarded = (teamId: string) => {
    addPoints(teamId, 5, `Detektif Kesalahan Bonus (Solusi)`, 'bonus');
    showToast(`⭐ Bonus +5 Poin diberikan!`, 'success');
  };

  const tabStyle = (selected: boolean): React.CSSProperties => ({
    background: selected ? '#EF4444' : '#171717',
    border: `2px solid ${selected ? '#EF4444' : '#3F3F46'}`,
    borderRadius: '14px',
    padding: '10px 16px',
    cursor: 'pointer',
    color: selected ? '#FFFFFF' : '#D1D5DB',
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '0.86rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
    boxShadow: selected ? '0 6px 18px rgba(239, 68, 68, 0.35)' : '0 4px 16px rgba(0, 0, 0, 0.3)',
  });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      <ToastContainer />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Link href="/games">
          <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>← Kembali</button>
        </Link>
        <div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#FFFFFF', margin: 0 }}>
            🔍 Detektif Kesalahan
          </h1>
          <div style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>Analisis &amp; temukan kesalahan teknik</div>
        </div>
      </div>

      {/* Material selector */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '10px' }}>
          PILIH MATERI KASUS:
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
          <button id="detektif-materi-semua" onClick={() => handleSelectMaterial(ALL)} style={tabStyle(materialFilter === ALL)}>
            <span style={{ fontSize: '1.1rem' }}>🗂️</span>
            <span>Semua Materi ({detectiveQuestions.length})</span>
          </button>
          {materialTabs.map((m) => (
            <button
              key={m.id}
              id={`detektif-materi-${m.id}`}
              onClick={() => handleSelectMaterial(m.id)}
              style={tabStyle(materialFilter === m.id)}
            >
              <span style={{ fontSize: '1.1rem' }}>{m.emoji}</span>
              <span>
                {m.title} ({m.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Badminton banner */}
      {isBadminton && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(16, 185, 129, 0.05))',
            border: '1.5px solid rgba(16, 185, 129, 0.45)',
            borderRadius: '16px',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div style={{ fontSize: '2rem' }}>🏸</div>
          <div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, color: '#6EE7B7' }}>Mode Detektif Bulu Tangkis</div>
            <div style={{ color: '#D1D5DB', fontSize: '0.86rem', lineHeight: 1.5 }}>
              {filteredQuestions.length} kasus: sikap siap &amp; footwork, pegangan raket, smash, netting, drop shot, lob, aturan servis, skor
              deuce, hingga keselamatan bermain.
            </div>
          </div>
        </div>
      )}

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
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
            }}
          >
            KASUS DETEKTIF #{currentIdx + 1} / {filteredQuestions.length}
          </div>
          {currentQ.subTopic && (
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(255, 200, 87, 0.15)',
                border: '1px solid rgba(255, 200, 87, 0.4)',
                borderRadius: '100px',
                padding: '4px 14px',
                color: '#FFC857',
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: '0.78rem',
              }}
            >
              {materialTabs.find((m) => m.id === currentQ.material)?.emoji} {currentQ.subTopic}
            </div>
          )}
        </div>


        {/* Scene illustration */}
        {currentQ.imageEmoji && (
          <div
            style={{
              textAlign: 'center',
              fontSize: '3.2rem',
              letterSpacing: '6px',
              background: '#171717',
              border: '1px dashed #3F3F46',
              borderRadius: '18px',
              padding: '18px 12px',
              marginBottom: '20px',
            }}
            aria-hidden="true"
          >
            {currentQ.imageEmoji}
          </div>
        )}

        <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.3rem', color: '#FFFFFF', lineHeight: 1.5, marginBottom: '24px' }}>
          🕵️ {currentQ.text}
        </h2>

        {/* Options */}
        {currentQ.options && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '24px' }}>
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
              <button id="detektif-analisis" className="btn-secondary" onClick={() => setRevealed(true)}>
                🔍 Analisis Kasus
              </button>
            ) : (
              <button id="detektif-benar" className="btn-success" onClick={handleReward} disabled={!answeringTeam} style={{ opacity: !answeringTeam ? 0.5 : 1 }}>
                ✅ Benar (+10 Poin)
              </button>
            )}
            <button id="detektif-berikutnya" className="btn-ghost" onClick={handleNext} style={{ marginLeft: 'auto' }}>
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
