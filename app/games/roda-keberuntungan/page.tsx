'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { useToast } from '@/components/Toast';
import { playAudioEffect } from '@/lib/audio';
import Link from 'next/link';

interface WheelSegment {
  label: string;
  emoji: string;
  color: string;
  challengePrompt: string;
}

const segments: WheelSegment[] = [
  {
    label: 'Gerak Kaki',
    emoji: '🦶',
    color: '#FF6B35',
    challengePrompt: 'Lakukan 5x langkah segitiga & 3x lompatan dua kaki bersama tim di depan kelas!',
  },
  {
    label: 'Gerak Tangan',
    emoji: '🖐️',
    color: '#3498DB',
    challengePrompt: 'Demo gerakan Passing Atas Voli 10 kali secara serentak dan kompak!',
  },
  {
    label: 'Kelincahan',
    emoji: '⚡',
    color: '#2ECC71',
    challengePrompt: 'Lari zig-zag di tempat selama 15 detik penuh energi!',
  },
  {
    label: 'Kekuatan',
    emoji: '💪',
    color: '#9B59B6',
    challengePrompt: 'Tahan posisi plank selama 20 detik bersama seluruh anggota kelompok!',
  },
  {
    label: 'Strategi',
    emoji: '🧠',
    color: '#FFC857',
    challengePrompt: 'Sebutkan 3 perbedaan utama posisi pemain penyerang dan pemain bertahan!',
  },
  {
    label: 'Bonus Poin',
    emoji: '🎁',
    color: '#E74C3C',
    challengePrompt: 'Sebutkan 3 peraturan resmi bola voli / bola basket secara lantang & tepat!',
  },
];

export default function RodaKeberuntunganPage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState<WheelSegment | null>(null);
  const [spinCount, setSpinCount] = useState(1);
  const [awardTeamId, setAwardTeamId] = useState<string | null>(null);
  const [awardAmount, setAwardAmount] = useState<number>(5);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSpinWheel = () => {
    if (isSpinning) return;
    playAudioEffect('spin');
    setIsSpinning(true);
    setSelectedSegment(null);

    // Random spin turns (between 5 and 10 full turns) + offset
    const randomSegIndex = Math.floor(Math.random() * segments.length);
    const segAngle = 360 / segments.length;
    const targetAngle = 360 * 6 + (segments.length - randomSegIndex) * segAngle - segAngle / 2;
    const newTotalDegree = rotationDegree + targetAngle;

    setRotationDegree(newTotalDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const landedSeg = segments[randomSegIndex];
      setSelectedSegment(landedSeg);
      playAudioEffect('win');
      showToast(`🎡 RODA BERHENTI PADA: ${landedSeg.emoji} ${landedSeg.label}!`, 'success');
    }, 4000);
  };

  const handleAwardPoints = () => {
    if (!awardTeamId) {
      showToast('⚠️ Silakan pilih tim yang akan diberi poin!', 'warning');
      return;
    }
    playAudioEffect('correct');
    const team = teams.find((t) => t.id === awardTeamId);
    addPoints(awardTeamId, awardAmount, `Roda Keberuntungan (${selectedSegment?.label})`, 'game');
    showToast(`🎉 +${awardAmount} POIN diberikan kepada ${team?.name}!`, 'success');
  };

  const handleNextTurn = () => {
    playAudioEffect('click');
    setSpinCount((prev) => prev + 1);
    setSelectedSegment(null);
    setAwardTeamId(null);
  };

  const handleResetGame = () => {
    playAudioEffect('click');
    setSpinCount(1);
    setSelectedSegment(null);
    setRotationDegree(0);
    setAwardTeamId(null);
    showToast('🔄 Roda Keberuntungan di-reset', 'info');
  };

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
        <div style={{ fontSize: '3.5rem', marginBottom: '6px' }}>🎡</div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.5rem', color: '#FFC857', margin: 0, letterSpacing: '0.5px' }}>
          Roda Keberuntungan PJOK
        </h1>
        <p style={{ color: '#D1D5DB', fontSize: '1.1rem', marginTop: '6px' }}>
          Guru memutar roda keberuntungan di proyektor untuk menentukan tantangan fisik atau strategi kelompok!
        </p>
      </div>

      {/* Main Container */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'start' }}>
        {/* Left Column: Spin Wheel */}
        <div
          style={{
            background: '#242424',
            border: '2px solid #FFC857',
            borderRadius: '24px',
            padding: '36px 24px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(255, 200, 87, 0.2)',
          }}
        >
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, color: '#FFC857', fontSize: '1.2rem', marginBottom: '16px' }}>
            PUTARAN #{spinCount}
          </div>

          {/* Wheel Pointer Arrow */}
          <div style={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto 28px' }}>
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '16px solid transparent',
                borderRight: '16px solid transparent',
                borderTop: '28px solid #FF6B1A',
                zIndex: 10,
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
              }}
            />

            {/* SVG Wheel */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                boxShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 10px #FFC857',
                transform: `rotate(${rotationDegree}deg)`,
                transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.99, 0.18, 0.99)' : 'none',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                {segments.map((seg, idx) => {
                  const angle = 360 / segments.length;
                  const startAngle = idx * angle;
                  const endAngle = (idx + 1) * angle;
                  const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                  const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                  const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                  const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);
                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                  // Calculate label angle
                  const midAngle = startAngle + angle / 2;
                  const textRad = (Math.PI * (midAngle - 90)) / 180;
                  const textX = 50 + 32 * Math.cos(textRad);
                  const textY = 50 + 32 * Math.sin(textRad);

                  return (
                    <g key={idx}>
                      <path d={pathData} fill={seg.color} stroke="#171717" strokeWidth="1" />
                      <text
                        x={textX}
                        y={textY}
                        fill="#FFFFFF"
                        fontSize="5.5"
                        fontWeight="900"
                        fontFamily="Poppins"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                      >
                        {seg.emoji} {seg.label}
                      </text>
                    </g>
                  );
                })}
                <circle cx="50" cy="50" r="10" fill="#171717" stroke="#FFC857" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <button
            className="btn-primary"
            disabled={isSpinning}
            onClick={handleSpinWheel}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '1.3rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FFC857, #FF9F43)',
              color: '#171717',
              borderRadius: '16px',
            }}
          >
            {isSpinning ? '🌀 RODA SEDANG BERPUTAR...' : '🎡 PUTAR RODA SEKARANG!'}
          </button>
        </div>

        {/* Right Column: Challenge Details & Awarding */}
        <div
          style={{
            background: '#242424',
            border: '2px solid #3F3F46',
            borderRadius: '24px',
            padding: '36px 28px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          {selectedSegment ? (
            <div>
              <div
                style={{
                  background: `${selectedSegment.color}22`,
                  border: `2px solid ${selectedSegment.color}`,
                  borderRadius: '20px',
                  padding: '24px',
                  marginBottom: '24px',
                  textAlign: 'center',
                  animation: 'fadeIn 0.4s ease-in-out',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{selectedSegment.emoji}</div>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.6rem', color: selectedSegment.color, margin: '0 0 10px' }}>
                  TANTANGAN: {selectedSegment.label.toUpperCase()}
                </h3>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.3rem', color: '#FFFFFF', lineHeight: 1.5 }}>
                  {selectedSegment.challengePrompt}
                </div>
              </div>

              {/* Awarding Panel */}
              <div style={{ borderTop: '1px solid #3F3F46', paddingTop: '20px' }}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.9rem', color: '#D1D5DB', marginBottom: '12px' }}>
                  1. PILIH TIM TERBAIK YANG MENYELESAIKAN TANTANGAN:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                  {teams.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        playAudioEffect('click');
                        setAwardTeamId(t.id);
                      }}
                      style={{
                        background: awardTeamId === t.id ? '#FFC857' : '#171717',
                        color: awardTeamId === t.id ? '#171717' : '#FFFFFF',
                        border: '1.5px solid #3F3F46',
                        borderRadius: '12px',
                        padding: '10px',
                        fontFamily: 'Poppins',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                      }}
                    >
                      {t.emoji} {t.name}
                    </button>
                  ))}
                </div>

                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.9rem', color: '#D1D5DB', marginBottom: '12px' }}>
                  2. TENTUKAN JUMLAH POIN (1-10):
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        playAudioEffect('click');
                        setAwardAmount(num);
                      }}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        border: '1.5px solid #3F3F46',
                        background: awardAmount === num ? '#FF6B1A' : '#171717',
                        color: '#FFFFFF',
                        fontFamily: 'Poppins',
                        fontWeight: 900,
                        fontSize: '1rem',
                        cursor: 'pointer',
                      }}
                    >
                      +{num}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="btn-success" onClick={handleAwardPoints} style={{ flex: 1, padding: '14px', fontSize: '1rem', fontWeight: 900 }}>
                    🏆 Berikan +{awardAmount} Poin
                  </button>
                  <button className="btn-primary" onClick={handleNextTurn} style={{ padding: '14px 20px', fontSize: '1rem', fontWeight: 800 }}>
                    ⏭ Putaran Berikutnya
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9CA3AF' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎯</div>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '8px' }}>
                Siap Diputar!
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                Guru mengklik tombol <strong>"Putar Roda Sekarang!"</strong> di sebelah kiri untuk menentukan tantangan fisik atau strategi kelompok.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
