'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { useToast } from '@/components/Toast';
import { playAudioEffect } from '@/lib/audio';
import Link from 'next/link';

interface MemoryCard {
  id: number;
  pairId: string;
  title: string;
  emoji: string;
  theoryQuestion: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const basePairs = [
  {
    pairId: 'pass-bawah',
    title: 'Passing Bawah',
    emoji: '⬇️',
    theoryQuestion: 'Jelaskan posisi kaki, lutut ditekuk, dan perkenaan lengan bawah yang benar saat melakukan Passing Bawah Voli!',
  },
  {
    pairId: 'smash-voli',
    title: 'Smash Voli',
    emoji: '💥',
    theoryQuestion: 'Sebutkan 4 tahapan utama dalam gerakan Smash Voli (Awalan, Tolakan, Pukulan, dan Mendarat)!',
  },
  {
    pairId: 'dribble-basket',
    title: 'Dribble Basket',
    emoji: '⛹️‍♂️',
    theoryQuestion: 'Sebutkan 2 jenis kesalahan/pelanggaran utama saat mendribble bola basket (Traveling & Double Dribble)!',
  },
  {
    pairId: 'shoot-basket',
    title: 'Shoot Basket',
    emoji: '🎯',
    theoryQuestion: 'Jelaskan kepanjangan dari rumus BEEF dalam shooting basket (Balance, Eyes, Elbow, Follow through)!',
  },
  {
    pairId: 'servis-atas',
    title: 'Servis Atas',
    emoji: '💨',
    theoryQuestion: 'Berapa cm idealnya bola dilambungkan di atas kepala sebelum dipukul pada teknik Servis Atas?',
  },
  {
    pairId: 'block-voli',
    title: 'Block Voli',
    emoji: '🛡️',
    theoryQuestion: 'Jelaskan tujuan utama gerakan Block di atas net dan aturan pelanggaran menyentuh jaring (touch net)!',
  },
  {
    pairId: 'heading-soccer',
    title: 'Heading Sepak Bola',
    emoji: '🗣️',
    theoryQuestion: 'Mengapa menyundul bola wajib menggunakan DAHI (jidat) dan bukan ubun-ubun atau samping kepala?',
  },
  {
    pairId: 'layup-basket',
    title: 'Lay-up Shoot',
    emoji: '🦘',
    theoryQuestion: 'Jelaskan pola langkah kaki (berapa langkah) yang diperbolehkan sebelum melompat memasukkan bola pada Lay-up Shoot!',
  },
];

function generateShuffledCards(): MemoryCard[] {
  const cards: MemoryCard[] = [];
  let idCounter = 0;
  basePairs.forEach((pair) => {
    // Add two of each
    cards.push({ id: idCounter++, ...pair, isFlipped: false, isMatched: false });
    cards.push({ id: idCounter++, ...pair, isFlipped: false, isMatched: false });
  });
  return cards.sort(() => Math.random() - 0.5);
}

export default function MemoryMatchPage() {
  const { teams, addPoints } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [activeTeamIdx, setActiveTeamIdx] = useState(0);
  const [pendingMatchPair, setPendingMatchPair] = useState<MemoryCard | null>(null);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setCards(generateShuffledCards());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTeam = teams[activeTeamIdx % (teams.length || 1)] || teams[0];

  const handleCardClick = (clickedCard: MemoryCard) => {
    if (clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length >= 2 || pendingMatchPair) return;

    playAudioEffect('card');
    const updatedCards = cards.map((c) => (c.id === clickedCard.id ? { ...c, isFlipped: true } : c));
    setCards(updatedCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (first.pairId === second.pairId) {
        // MATCHED!
        playAudioEffect('win');
        setPendingMatchPair(first);
        showToast(`🎉 KARTU COCOK! ${currentTeam?.name} MENDAPAT TANTANGAN TEORI: ${first.title}!`, 'success');
      } else {
        // MISMATCH!
        playAudioEffect('wrong');
        showToast(`❌ Kartu tidak cocok! Giliran berpindah ke tim berikutnya.`, 'warning');
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === first.id || c.id === second.id ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
          setActiveTeamIdx((prev) => prev + 1);
        }, 1400);
      }
    }
  };

  const handleTheorySuccess = () => {
    if (!pendingMatchPair) return;
    playAudioEffect('correct');
    addPoints(currentTeam.id, 5, `Memory Match Teori (${pendingMatchPair.title})`, 'game');

    // Mark matched cards
    setCards((prev) =>
      prev.map((c) => (c.pairId === pendingMatchPair.pairId ? { ...c, isMatched: true, isFlipped: true } : c))
    );

    showToast(`🧠 JAWABAN TEORI BENAR! ${currentTeam.name} mendapatkan +5 Poin!`, 'success');
    setPendingMatchPair(null);
    setFlippedCards([]);
    setActiveTeamIdx((prev) => prev + 1);
  };

  const handleTheoryFailed = () => {
    if (!pendingMatchPair) return;
    playAudioEffect('wrong');
    showToast(`⚠️ Jawaban belum tepat. Poin 0, kartu tetap terbuka!`, 'info');

    setCards((prev) =>
      prev.map((c) => (c.pairId === pendingMatchPair.pairId ? { ...c, isMatched: true, isFlipped: true } : c))
    );

    setPendingMatchPair(null);
    setFlippedCards([]);
    setActiveTeamIdx((prev) => prev + 1);
  };

  const handleResetGame = () => {
    playAudioEffect('click');
    setCards(generateShuffledCards());
    setFlippedCards([]);
    setPendingMatchPair(null);
    setActiveTeamIdx(0);
    showToast('🔄 Game Memory Match Teori diulang dengan kartu baru!', 'info');
  };

  const matchedCount = cards.filter((c) => c.isMatched).length / 2;
  const isGameOver = matchedCount === 8;

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
            🔄 Reset Kartu
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '6px' }}>🃏</div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.5rem', color: '#9B59B6', margin: 0, letterSpacing: '0.5px' }}>
          Memory Match Teori PJOK
        </h1>
        <p style={{ color: '#D1D5DB', fontSize: '1.1rem', marginTop: '6px' }}>
          Buka pasang kartu teknik olahraga! Tim yang menemukan pasangan cocok WAJIB menjawab pertanyaan teori PJOK di depan kelas untuk +5 Poin!
        </p>
      </div>

      {/* Turn & Status Indicator Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #242424, #171717)',
          border: '2px solid #9B59B6',
          borderRadius: '20px',
          padding: '18px 28px',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 8px 25px rgba(155, 89, 182, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.95rem', color: '#D1D5DB' }}>GILIRAN SEKARANG:</span>
          <span
            style={{
              background: '#9B59B6',
              color: '#FFFFFF',
              fontFamily: 'Poppins',
              fontWeight: 900,
              fontSize: '1.2rem',
              padding: '6px 20px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>{currentTeam?.emoji}</span> {currentTeam?.name}
          </span>
        </div>

        <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.1rem', color: '#FFC857' }}>
          PASANGAN TERBUKA: {matchedCount} / 8
        </div>
      </div>

      {/* Theory Challenge Modal / Banner */}
      {pendingMatchPair && (
        <div
          style={{
            background: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '32px',
            textAlign: 'center',
            boxShadow: '0 10px 35px rgba(155, 89, 182, 0.4)',
            animation: 'bounce 0.4s ease-in-out',
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>{pendingMatchPair.emoji}</div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.1rem', color: '#FFC857', letterSpacing: '1px', textTransform: 'uppercase' }}>
            🎉 PASANGAN COCOK: {pendingMatchPair.title.toUpperCase()}!
          </div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.75rem', color: '#FFFFFF', margin: '12px 0 16px', lineHeight: 1.45 }}>
            💬 TANTANGAN TEORI UNTUK {currentTeam?.emoji} {currentTeam?.name}:
          </h2>
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '16px',
              padding: '20px 24px',
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.5,
              marginBottom: '24px',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            "{pendingMatchPair.theoryQuestion}"
          </div>
          <p style={{ color: '#E2E8F0', fontSize: '1rem', marginBottom: '24px' }}>
            Siswa menjawab secara lisan. Guru menilai jawaban teori: Tekan <strong>"Jawaban Teori Benar 🧠"</strong> untuk +5 Poin!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn-success" onClick={handleTheorySuccess} style={{ padding: '16px 36px', fontSize: '1.2rem', fontWeight: 900 }}>
              Jawaban Teori Benar 🧠 (+5 Poin)
            </button>
            <button className="btn-danger" onClick={handleTheoryFailed} style={{ padding: '16px 36px', fontSize: '1.2rem', fontWeight: 900 }}>
              Kurang Tepat ❌ (0 Poin)
            </button>
          </div>
        </div>
      )}

      {/* 4x4 Grid Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '32px' }}>
        {cards.map((card, idx) => {
          const isFaceUp = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.id}
              disabled={isFaceUp || pendingMatchPair !== null}
              onClick={() => handleCardClick(card)}
              style={{
                height: '140px',
                borderRadius: '20px',
                border: `2px solid ${card.isMatched ? '#10B981' : isFaceUp ? '#9B59B6' : '#3F3F46'}`,
                background: card.isMatched ? 'rgba(16, 185, 129, 0.25)' : isFaceUp ? '#242424' : 'linear-gradient(135deg, #2D2D32, #1C1C20)',
                color: '#FFFFFF',
                fontFamily: 'Poppins',
                fontWeight: 900,
                fontSize: isFaceUp ? '1.1rem' : '1.8rem',
                cursor: isFaceUp ? 'default' : 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isFaceUp ? '0 4px 15px rgba(155, 89, 182, 0.3)' : '0 4px 10px rgba(0,0,0,0.5)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isFaceUp ? 'scale(1)' : 'scale(0.98)',
              }}
            >
              {isFaceUp ? (
                <>
                  <span style={{ fontSize: '2.5rem' }}>{card.emoji}</span>
                  <span style={{ fontSize: '0.95rem', color: card.isMatched ? '#6EE7B7' : '#E2E8F0', textAlign: 'center', padding: '0 8px' }}>
                    {card.title}
                  </span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '2.2rem', color: '#9B59B6' }}>❓</span>
                  <span style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>#{idx + 1}</span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Game Over Banner */}
      {isGameOver && (
        <div
          style={{
            background: 'linear-gradient(135deg, #10B981, #059669)',
            borderRadius: '24px',
            padding: '36px',
            textAlign: 'center',
            boxShadow: '0 10px 35px rgba(16, 185, 129, 0.4)',
            animation: 'fadeIn 0.5s ease-in-out',
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '8px' }}>🎉</div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.2rem', color: '#FFFFFF', margin: 0 }}>
            SELAMAT! SELURUH TANTANGAN TEORI TERJAWAB!
          </h2>
          <p style={{ color: '#E2E8F0', fontSize: '1.1rem', marginTop: '8px', marginBottom: '24px' }}>
            Seluruh tim telah menjawab pertanyaan teori PJOK dengan hebat di depan kelas!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="btn-primary" onClick={handleResetGame} style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 900, background: '#171717' }}>
              🔄 Mainkan Lagi dengan Kartu Baru
            </button>
            <Link href="/ranking" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ padding: '16px 32px', fontSize: '1.1rem', background: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}>
                🏆 Lihat Leaderboard Kelas
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
