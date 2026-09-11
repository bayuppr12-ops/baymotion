'use client';

import { useState } from 'react';
import { Team } from '@/types';

interface RandomTeamPickerProps {
  teams: Team[];
  onBonusAwarded: (teamId: string) => void;
}

export function RandomTeamPicker({ teams, onBonusAwarded }: RandomTeamPickerProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [rollingIdx, setRollingIdx] = useState(0);
  const [hasAwarded, setHasAwarded] = useState(false);

  const startRoll = () => {
    if (teams.length === 0) return;
    setIsRolling(true);
    setSelectedTeam(null);
    setHasAwarded(false);

    let rolls = 0;
    const maxRolls = 20; // 2 seconds if interval is 100ms
    
    const interval = setInterval(() => {
      setRollingIdx((prev) => (prev + 1) % teams.length);
      rolls++;
      
      if (rolls >= maxRolls) {
        clearInterval(interval);
        const randomWinner = teams[Math.floor(Math.random() * teams.length)];
        setSelectedTeam(randomWinner);
        setIsRolling(false);
      }
    }, 100);
  };

  const handleAward = () => {
    if (selectedTeam && !hasAwarded) {
      onBonusAwarded(selectedTeam.id);
      setHasAwarded(true);
    }
  };

  if (teams.length === 0) return null;

  return (
    <div style={{
      background: '#171717',
      border: '1px solid #3F3F46',
      borderRadius: '16px',
      padding: '24px',
      marginTop: '32px',
      textAlign: 'center',
      animation: 'fade-in 0.5s ease'
    }}>
      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#FFC857', marginBottom: '8px' }}>
        🎁 KESEMPATAN BONUS (+5 Poin)
      </div>
      
      <div style={{ marginBottom: '20px', color: '#D1D5DB', fontSize: '0.9rem' }}>
        Acak kelompok untuk menjawab pertanyaan penjelasan!
      </div>

      {isRolling && (
        <div style={{
          fontSize: '1.5rem',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 900,
          color: '#FFFFFF',
          padding: '16px',
          background: '#242424',
          borderRadius: '12px',
          border: '2px dashed #FF6B1A',
          animation: 'pulse 0.5s infinite',
          marginBottom: '20px',
          display: 'inline-block'
        }}>
          {teams[rollingIdx]?.emoji} {teams[rollingIdx]?.name}
        </div>
      )}

      {selectedTeam && !isRolling && (
        <div style={{
          padding: '16px',
          background: 'rgba(255, 107, 26, 0.1)',
          borderRadius: '12px',
          border: '2px solid #FF6B1A',
          marginBottom: '20px',
          animation: 'bounce-in 0.5s ease',
          display: 'inline-block'
        }}>
          <div style={{ fontSize: '0.9rem', color: '#FF9F43', fontWeight: 700, marginBottom: '8px' }}>
            KELOMPOK TERPILIH:
          </div>
          <div style={{ fontSize: '1.8rem', fontFamily: 'Poppins, sans-serif', fontWeight: 900, color: '#FFFFFF' }}>
            {selectedTeam.emoji} {selectedTeam.name}
          </div>
        </div>
      )}

      {!isRolling && !selectedTeam && (
        <button className="btn-primary" onClick={startRoll} style={{ fontSize: '1rem', padding: '12px 32px' }}>
          🎲 Acak Kelompok
        </button>
      )}

      {selectedTeam && !isRolling && !hasAwarded && (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-success" onClick={handleAward}>
            ⭐ Berhasil (+5 Poin)
          </button>
          <button className="btn-ghost" onClick={startRoll}>
            🔄 Acak Ulang
          </button>
          <button className="btn-secondary" onClick={() => setHasAwarded(true)}>
            ❌ Gagal (Lewati)
          </button>
        </div>
      )}

      {hasAwarded && (
        <div style={{ color: '#10B981', fontWeight: 700, fontSize: '1rem' }}>
          ✅ Sesi Bonus Selesai
        </div>
      )}
    </div>
  );
}
