'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { achievements } from '@/data/achievements';
import Link from 'next/link';

const rankEmojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];

export default function RankingPage() {
  const { teams, getSortedTeams } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [prevOrder, setPrevOrder] = useState<string[]>([]);
  const [animatedId, setAnimatedId] = useState<string | null>(null);

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  const rawSorted = mounted ? getSortedTeams() : teams;
  const sorted = rawSorted && rawSorted.length > 0 ? rawSorted : teams;

  useEffect(() => {
    if (!mounted) return;
    const newOrder = sorted.map((t) => t.id);
    const changed = newOrder.some((id, i) => prevOrder[i] !== id);
    if (changed && prevOrder.length > 0) {
      const movedUp = newOrder.find((id, i) => prevOrder.indexOf(id) > i);
      if (movedUp) {
        setAnimatedId(movedUp);
        setTimeout(() => setAnimatedId(null), 800);
      }
    }
    setPrevOrder(newOrder);
  }, [sorted.map((t) => t.id).join(',')]);

  const totalPoints = sorted.reduce((acc, t) => acc + t.points, 0);

  if (!mounted) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#D1D5DB' }}>
      Loading Leaderboard...
    </div>
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '8px', animation: 'float 3s ease-in-out infinite' }}>🏆</div>
        <h1
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            color: '#FFFFFF',
            marginBottom: '8px',
          }}
        >
          PAPAN SKOR & LEADERBOARD KELAS
        </h1>
        <p style={{ color: '#D1D5DB', fontSize: '1.02rem' }}>
          Ranking kelompok diperbarui secara real-time berdasarkan aktivitas kelas
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
          <div style={{ background: '#242424', border: '1px solid rgba(255, 107, 26, 0.4)', borderRadius: '100px', padding: '8px 20px', color: '#FF6B1A', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.88rem' }}>
            👥 {sorted.length} Kelompok Bertanding
          </div>
          <div style={{ background: '#242424', border: '1px solid rgba(255, 200, 87, 0.4)', borderRadius: '100px', padding: '8px 20px', color: '#FFC857', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.88rem' }}>
            ⭐ {totalPoints} Total XP Kelas
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {sorted.length >= 3 && (
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            {/* 2nd Place */}
            <div style={{ textAlign: 'center', flex: 1, maxWidth: '220px' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '6px' }}>🥈</div>
              <div
                style={{
                  background: 'linear-gradient(180deg, #242424 0%, #1A1A1A 100%)',
                  border: '2.5px solid #9CA3AF',
                  borderRadius: '20px 20px 0 0',
                  padding: '24px 16px',
                  height: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '4px' }}>{sorted[1]?.emoji}</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF', textAlign: 'center' }}>
                  {sorted[1]?.name}
                </div>
                <div style={{ color: '#D1D5DB', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'Poppins', marginTop: '4px' }}>
                  {sorted[1]?.points} XP
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div style={{ textAlign: 'center', flex: 1, maxWidth: '240px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '6px', animation: 'float 2s ease-in-out infinite' }}>🥇</div>
              <div
                style={{
                  background: 'linear-gradient(180deg, #242424 0%, #1A1A1A 100%)',
                  border: '3px solid #FFC857',
                  borderRadius: '20px 20px 0 0',
                  padding: '28px 16px',
                  height: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 12px 36px rgba(255, 200, 87, 0.35)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>{sorted[0]?.emoji}</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.15rem', color: '#FFC857', textAlign: 'center' }}>
                  {sorted[0]?.name}
                </div>
                <div style={{ color: '#FFC857', fontWeight: 900, fontSize: '1.5rem', fontFamily: 'Poppins', marginTop: '4px' }}>
                  {sorted[0]?.points} XP
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div style={{ textAlign: 'center', flex: 1, maxWidth: '220px' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '6px' }}>🥉</div>
              <div
                style={{
                  background: 'linear-gradient(180deg, #242424 0%, #1A1A1A 100%)',
                  border: '2.5px solid #F97316',
                  borderRadius: '20px 20px 0 0',
                  padding: '24px 16px',
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '4px' }}>{sorted[2]?.emoji}</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.95rem', color: '#FB923C', textAlign: 'center' }}>
                  {sorted[2]?.name}
                </div>
                <div style={{ color: '#FB923C', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'Poppins', marginTop: '4px' }}>
                  {sorted[2]?.points} XP
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              height: '8px',
              background: 'linear-gradient(90deg, #242424, #FFC857, #242424)',
              borderRadius: '4px',
            }}
          />
        </div>
      )}

      {/* Full Leaderboard Card List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
        {sorted.map((team, i) => {
          const maxPoints = sorted[0]?.points || 1;
          const percent = maxPoints > 0 ? (team.points / maxPoints) * 100 : 0;
          const isAnimated = animatedId === team.id;

          return (
            <div
              key={team.id}
              style={{
                background: '#242424',
                border: i === 0 ? '2px solid #FFC857' : '1.5px solid #3F3F46',
                borderRadius: '20px',
                padding: '22px 26px',
                transition: 'all 0.4s ease',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
                animation: isAnimated ? 'rank-change 0.8s ease' : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                {/* Rank */}
                <div
                  style={{
                    fontSize: i < 3 ? '2.2rem' : '1.4rem',
                    minWidth: '44px',
                    textAlign: 'center',
                  }}
                >
                  {rankEmojis[i]}
                </div>

                {/* Team emoji */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: '#171717',
                    border: `2px solid ${team.color || '#FF6B1A'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    flexShrink: 0,
                  }}
                >
                  {team.emoji}
                </div>

                {/* Name + progress bar */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.15rem', color: team.color || '#FFFFFF' }}>
                        {team.name}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '2px' }}>
                        {team.badges.map((badgeId) => {
                          const badge = achievements.find((a) => a.id === badgeId);
                          return badge ? (
                            <span key={badgeId} style={{ fontSize: '1rem' }} title={badge.name}>
                              {badge.emoji}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontFamily: 'Poppins',
                          fontWeight: 900,
                          fontSize: '1.6rem',
                          color: team.color || (i === 0 ? '#FFC857' : i === 1 ? '#D1D5DB' : i === 2 ? '#FB923C' : '#FF6B1A'),
                        }}
                      >
                        {team.points}
                      </div>
                      <div style={{ color: '#D1D5DB', fontSize: '0.78rem', fontFamily: 'Poppins', fontWeight: 800 }}>
                        XP POIN
                      </div>
                    </div>
                  </div>
                  <div className="progress-bar" style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)' }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${percent}%`,
                        background: `linear-gradient(90deg, ${team.color || '#FF6B1A'}, #FF9F43)`,
                        transition: 'width 0.8s ease',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Sub-scores */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px', paddingLeft: '118px', flexWrap: 'wrap' }}>
                {[
                  { icon: '💪', label: 'Sportif', value: team.sportsmanship, bg: '#171717', border: 'rgba(255, 107, 26, 0.4)', text: '#FF6B1A' },
                  { icon: '🤝', label: 'Kerja Sama', value: team.cooperation, bg: '#171717', border: 'rgba(255, 159, 67, 0.4)', text: '#FF9F43' },
                  { icon: '📋', label: 'Disiplin', value: team.discipline, bg: '#171717', border: 'rgba(255, 200, 87, 0.4)', text: '#FFC857' },
                  { icon: '🎮', label: 'Games', value: team.gamesPlayed, bg: '#171717', border: '#3F3F46', text: '#FFFFFF' },
                  { icon: '🎯', label: 'Jawaban Benar', value: team.correctAnswers, bg: '#171717', border: '#3F3F46', text: '#FFFFFF' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: stat.bg,
                      border: `1px solid ${stat.border}`,
                      borderRadius: '8px',
                      padding: '5px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.78rem',
                      color: stat.text,
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                    }}
                  >
                    {stat.icon} {stat.label}: <span style={{ color: '#FFFFFF', marginLeft: '2px', fontWeight: 900 }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabel Rincian Poin & Statistik Kelompok */}
      <div
        style={{
          background: '#242424',
          border: '1.5px solid #3F3F46',
          borderRadius: '24px',
          padding: '28px',
          marginBottom: '48px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          overflowX: 'auto',
        }}
      >
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📊 Tabel Rincian Statistik & Pencapaian Tim
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid #3F3F46', color: '#FF6B1A', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.85rem' }}>
              <th style={{ padding: '12px 10px' }}>POS</th>
              <th style={{ padding: '12px 10px' }}>KELOMPOK</th>
              <th style={{ padding: '12px 10px' }}>TOTAL XP</th>
              <th style={{ padding: '12px 10px' }}>SPORTIF</th>
              <th style={{ padding: '12px 10px' }}>KERJA SAMA</th>
              <th style={{ padding: '12px 10px' }}>DISIPLIN</th>
              <th style={{ padding: '12px 10px' }}>GAMES</th>
              <th style={{ padding: '12px 10px' }}>LENCANA BADGE</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t, idx) => (
              <tr key={t.id} style={{ borderBottom: '1px solid #3F3F46', fontSize: '0.9rem', color: '#FFFFFF' }}>
                <td style={{ padding: '14px 10px', fontFamily: 'Poppins', fontWeight: 900 }}>{idx + 1}</td>
                <td style={{ padding: '14px 10px', fontFamily: 'Poppins', fontWeight: 800 }}>
                  <span style={{ marginRight: '6px' }}>{t.emoji}</span> {t.name}
                </td>
                <td style={{ padding: '14px 10px', fontFamily: 'Poppins', fontWeight: 900, color: '#FFC857' }}>{t.points} XP</td>
                <td style={{ padding: '14px 10px', color: '#FF6B1A' }}>+{t.sportsmanship}</td>
                <td style={{ padding: '14px 10px', color: '#FF9F43' }}>+{t.cooperation}</td>
                <td style={{ padding: '14px 10px', color: '#FFC857' }}>+{t.discipline}</td>
                <td style={{ padding: '14px 10px' }}>{t.gamesPlayed} Main</td>
                <td style={{ padding: '14px 10px' }}>
                  {t.badges.length > 0 ? (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {t.badges.map((b) => {
                        const bgObj = achievements.find((a) => a.id === b);
                        return <span key={b} title={bgObj?.name}>{bgObj?.emoji}</span>;
                      })}
                    </div>
                  ) : (
                    <span style={{ color: '#D1D5DB', fontSize: '0.8rem' }}>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Box Panduan Sistem Perolehan Poin */}
      <div
        style={{
          background: '#242424',
          border: '1.5px solid rgba(255, 107, 26, 0.4)',
          borderRadius: '24px',
          padding: '28px',
          marginBottom: '48px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          💡 Panduan Sistem Perolehan Poin XP
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { icon: '🎯', title: 'Jawaban Kuis Benar', points: '+10 XP', desc: 'Menjawab soal kuis interaktif dengan tepat' },
            { icon: '🎮', title: 'Kemenangan Game', points: '+30 XP', desc: 'Memenangkan sesi game & tantangan kelas' },
            { icon: '💪', title: 'Sikap Sportif', points: '+10 XP', desc: 'Menunjukkan kejujuran & menghargai lawan' },
            { icon: '🤝', title: 'Kerja Sama Kelompok', points: '+10 XP', desc: 'Kekompakan & saling bantu antar anggota' },
            { icon: '📋', title: 'Kedisiplinan Kelas', points: '+5 XP', desc: 'Mengikuti instruksi guru & menjaga ketertiban' },
          ].map((guide) => (
            <div key={guide.title} style={{ background: '#171717', border: '1px solid #3F3F46', borderRadius: '14px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.8rem' }}>{guide.icon}</span>
                <span style={{ background: 'rgba(255, 107, 26, 0.25)', border: '1px solid #FF6B1A', color: '#FF6B1A', fontFamily: 'Poppins', fontWeight: 900, fontSize: '0.85rem', borderRadius: '100px', padding: '4px 10px' }}>
                  {guide.points}
                </span>
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '4px' }}>
                {guide.title}
              </div>
              <div style={{ color: '#D1D5DB', fontSize: '0.8rem', lineHeight: 1.4 }}>{guide.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daftar Lencana & Prestasi (Badges Showcase) */}
      <div
        style={{
          background: '#242424',
          border: '1.5px solid #3F3F46',
          borderRadius: '24px',
          padding: '28px',
          marginBottom: '48px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🎖️ Daftar Lencana & Badge Prestasi
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
          {achievements.map((badge) => (
            <div key={badge.id} style={{ background: '#171717', border: '1px solid #3F3F46', borderRadius: '14px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ fontSize: '2.4rem', flexShrink: 0 }}>{badge.emoji}</div>
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.92rem', color: '#FFC857', marginBottom: '2px' }}>
                  {badge.name}
                </div>
                <div style={{ color: '#D1D5DB', fontSize: '0.78rem', lineHeight: 1.3 }}>{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/guru" style={{ textDecoration: 'none' }}>
          <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>👨‍🏫 Kelola Poin Guru</button>
        </Link>
        <Link href="/projector" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>📺 Tampilkan di Proyektor</button>
        </Link>
      </div>
    </div>
  );
}
