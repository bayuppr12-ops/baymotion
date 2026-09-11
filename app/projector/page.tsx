'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import Timer from '@/components/Timer';
import Link from 'next/link';

export default function ProjectorPage() {
  const { teams, getSortedTeams } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'timer'>('leaderboard');

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  if (!mounted) return null;

  const sorted = getSortedTeams();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#171717',
        color: '#FFFFFF',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Bar for controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #3F3F46', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '2.5rem' }}>📺</span>
          <div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.8rem', color: '#FF6B1A', margin: 0 }}>
              BAYMOTION — PROJECTOR DISPLAY
            </h1>
            <div style={{ color: '#D1D5DB', fontSize: '0.9rem', fontFamily: 'Poppins' }}>
              Tampilan Layar Proyektor Kelas
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn-ghost"
            onClick={() => setActiveTab('leaderboard')}
            style={{
              borderColor: activeTab === 'leaderboard' ? '#FF6B1A' : undefined,
              color: activeTab === 'leaderboard' ? '#FF6B1A' : undefined,
              background: activeTab === 'leaderboard' ? '#242424' : undefined,
            }}
          >
            🏆 Leaderboard
          </button>
          <button
            className="btn-ghost"
            onClick={() => setActiveTab('timer')}
            style={{
              borderColor: activeTab === 'timer' ? '#FF6B1A' : undefined,
              color: activeTab === 'timer' ? '#FF6B1A' : undefined,
              background: activeTab === 'timer' ? '#242424' : undefined,
            }}
          >
            ⏱ Timer Besar
          </button>
          <button className="btn-secondary" onClick={toggleFullscreen}>
            {isFullscreen ? '↙ Keluar Fullscreen' : '⛶ FULLSCREEN PROYEKTOR'}
          </button>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button className="btn-ghost">✕ Tutup</button>
          </Link>
        </div>
      </div>

      {/* Main Display Area */}
      {activeTab === 'leaderboard' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '3.5rem', color: '#FFFFFF', margin: 0 }}>
              🏆 LEADERBOARD KELAS 🏆
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            {sorted.map((team, idx) => (
              <div
                key={team.id}
                style={{
                  background: '#242424',
                  border: `3px solid ${team.color || (idx === 0 ? '#FFC857' : idx === 1 ? '#9CA3AF' : idx === 2 ? '#F97316' : '#3F3F46')}`,
                  borderRadius: '24px',
                  padding: '32px',
                  textAlign: 'center',
                  boxShadow: idx === 0 ? '0 12px 36px rgba(255, 200, 87, 0.35)' : '0 8px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : team.emoji}
                </div>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.2rem', color: team.color || '#FFFFFF', margin: '0 0 12px' }}>
                  {team.name}
                </h3>
                <div
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 900,
                    fontSize: '4rem',
                    color: idx === 0 ? '#FFC857' : idx === 1 ? '#D1D5DB' : idx === 2 ? '#FB923C' : '#FF6B1A',
                    lineHeight: 1,
                  }}
                >
                  {team.points}
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.2rem', color: '#D1D5DB', marginTop: '8px' }}>
                  POIN XP
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'timer' && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '800px' }}>
            <Timer projector large />
          </div>
        </div>
      )}

      {/* Footer marquee / ticker */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #3F3F46', paddingTop: '16px', textAlign: 'center', color: '#D1D5DB', fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem' }}>
        🏐 BAYMOTION — Belajar, Bergerak, Bermain, dan Berprestasi! · Created by Bayu Pria Pratama
      </div>
    </div>
  );
}
