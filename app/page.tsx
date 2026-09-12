'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';

const menuItems = [
  { href: '/materi', icon: '📚', label: 'Materi', desc: 'Pelajari materi PJOK lengkap', color: '#FF6B1A', bg: '#242424', border: 'rgba(255, 107, 26, 0.4)', tagBg: 'rgba(255, 107, 26, 0.2)' },
  { href: '/video', icon: '🎥', label: 'Video', desc: 'Tonton video pembelajaran', color: '#FF9F43', bg: '#242424', border: 'rgba(255, 159, 67, 0.4)', tagBg: 'rgba(255, 159, 67, 0.2)' },
  { href: '/games', icon: '🎮', label: 'Games', desc: '7 game seru untuk kelas', color: '#FF6B1A', bg: '#242424', border: 'rgba(255, 107, 26, 0.4)', tagBg: 'rgba(255, 107, 26, 0.2)' },
  { href: '/ranking', icon: '🏆', label: 'Ranking', desc: 'Papan skor kelompok', color: '#FFC857', bg: '#242424', border: 'rgba(255, 200, 87, 0.4)', tagBg: 'rgba(255, 200, 87, 0.2)' },
  { href: '/kuis', icon: '🧠', label: 'Kuis', desc: 'Uji pengetahuan kamu', color: '#FFC857', bg: '#242424', border: 'rgba(255, 200, 87, 0.4)', tagBg: 'rgba(255, 200, 87, 0.2)' },
  { href: '/refleksi', icon: '💡', label: 'Refleksi', desc: 'Renungkan hasil belajar', color: '#FF9F43', bg: '#242424', border: 'rgba(255, 159, 67, 0.4)', tagBg: 'rgba(255, 159, 67, 0.2)' },
  { href: '/guru', icon: '👨‍🏫', label: 'Mode Guru', desc: 'Panel kontrol guru', color: '#FF6B1A', bg: '#242424', border: 'rgba(255, 107, 26, 0.4)', tagBg: 'rgba(255, 107, 26, 0.2)' },
  { href: '/projector', icon: '📺', label: 'Proyektor', desc: 'Tampilkan di layar besar', color: '#FF9F43', bg: '#242424', border: 'rgba(255, 159, 67, 0.4)', tagBg: 'rgba(255, 159, 67, 0.2)' },
];

const floatingEmojis = ['🏐', '⚽', '🏀', '🏃', '🤸', '💪', '🏆', '🎯'];

export default function HomePage() {
  const { teams, getSortedTeams } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState(0);

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
    const interval = setInterval(() => {
      setActiveEmoji((prev) => (prev + 1) % floatingEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ overflowX: 'hidden', background: '#171717', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 20px 40px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #171717 0%, #242424 100%)',
        }}
      >
        {/* Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 107, 26, 0.18) 0%, rgba(255, 159, 67, 0.12) 45%, transparent 70%)',
            pointerEvents: 'none',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Floating sports emojis */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          {floatingEmojis.map((emoji, idx) => (
            <div
              key={idx}
              className="absolute text-4xl animate-float"
              style={{
                top: `${(idx * 23 + 12) % 80}%`,
                left: `${(idx * 29 + 8) % 90}%`,
                animationDelay: `${idx * 0.4}s`,
                filter: idx === activeEmoji ? 'drop-shadow(0 0 12px #FF6B1A)' : undefined,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge top */}
          <div
            className="hero-animate-title"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 107, 26, 0.18)',
              border: '1px solid #FF6B1A',
              borderRadius: '100px',
              padding: '6px 20px',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(255, 107, 26, 0.25)',
            }}
          >
            <span style={{ fontSize: '1rem' }}>⚡</span>
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: '0.85rem',
                color: '#FF6B1A',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              MEDIA PEMBELAJARAN INTERAKTIF PJOK
            </span>
          </div>

          {/* Title */}
          <div className="hero-animate-title" style={{ marginBottom: '20px' }}>
            <div
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                color: '#FF9F43',
                marginBottom: '6px',
                letterSpacing: '0.5px',
              }}
            >
              &quot;Where Sport Comes Alive&quot;
            </div>
            <h1
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(3.2rem, 8.5vw, 5.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-1.5px',
                margin: 0,
              }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, #FF6B1A 0%, #FF9F43 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                BAYMOTION
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="hero-animate-subtitle"
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#D1D5DB',
              maxWidth: '720px',
              lineHeight: 1.6,
              marginBottom: '36px',
              fontWeight: 600,
            }}
          >
            Website olahraga seru berbasis digital untuk siswa. Pelajari materi, jawab kuis interaktif, selesaikan tantangan fisik, dan tingkatkan poin kelompokmu!
          </p>

          {/* Action buttons */}
          <div
            className="hero-animate-content"
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '44px',
            }}
          >
            <Link href="/materi" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '14px 34px' }}>
                🚀 MULAI PETUALANGAN
              </button>
            </Link>
            <Link href="/materi" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ fontSize: '1.05rem', padding: '14px 34px' }}>
                📚 LIHAT MATERI
              </button>
            </Link>
            <Link href="/games" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ fontSize: '1.05rem', padding: '14px 28px' }}>
                🎮 GAMES
              </button>
            </Link>
            <Link href="/guru" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ fontSize: '1.05rem', padding: '14px 28px' }}>
                👨‍🏫 MODE GURU
              </button>
            </Link>
          </div>

          {/* Stats badges */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '🎮', label: '7 Games Interaktif', color: '#242424', border: 'rgba(255, 107, 26, 0.4)', text: '#FF6B1A' },
              { icon: '📚', label: '13 Materi PJOK', color: '#242424', border: 'rgba(255, 159, 67, 0.4)', text: '#FF9F43' },
              { icon: '🏆', label: 'Sistem Poin & Ranking', color: '#242424', border: 'rgba(255, 200, 87, 0.4)', text: '#FFC857' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: stat.color,
                  border: `1px solid ${stat.border}`,
                  borderRadius: '100px',
                  padding: '8px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: stat.text,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                }}
              >
                <span>{stat.icon}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </div>

        {/* Creator Signature */}
        <div className="hero-creator-signature hero-animate-creator">
          <div className="creator-divider-line" />
          <span className="creator-label">CREATED & DEVELOPED BY</span>
          <span className="creator-name">BAYU PRIA PRATAMA</span>
        </div>
      </section>

      {/* 2. ANGLED SECTION TRANSITION */}
      <div style={{ height: '3vw', background: 'linear-gradient(180deg, #242424 0%, #171717 100%)', transform: 'skewY(-1.5deg)', margin: '20px 0' }} />

      {/* 3. ALUR PEMBELAJARAN */}
      <section style={{ padding: '40px 20px 80px', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-block', background: '#242424', border: '1px solid rgba(255, 107, 26, 0.4)', borderRadius: '100px', padding: '6px 18px', color: '#FF6B1A', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '12px' }}>
            ATHLETIC STEPS
          </div>
          <h2 className="section-title" style={{ fontSize: '2.2rem', margin: 0, color: '#FFFFFF' }}>
            📋 Alur Pembelajaran Kelas
          </h2>
          <p style={{ color: '#D1D5DB', fontSize: '0.98rem', marginTop: '6px' }}>7 Tahapan praktis penggunaan BAYMOTION di kelas</p>
        </div>

        <div className="track-step-container">
          {[
            { emoji: '📖', step: '01', label: 'LIHAT', desc: 'Buka materi di proyektor' },
            { emoji: '🤔', step: '02', label: 'PIKIRKAN', desc: 'Guru ajukan pertanyaan' },
            { emoji: '💬', step: '03', label: 'DISKUSIKAN', desc: 'Kelompok berdiskusi' },
            { emoji: '🏃', step: '04', label: 'BERGERAK', desc: 'Lakukan aktivitas fisik' },
            { emoji: '🎮', step: '05', label: 'BERMAIN', desc: 'Main games interaktif' },
            { emoji: '🏆', step: '06', label: 'DAPATKAN POIN', desc: 'Guru input skor & ranking' },
            { emoji: '💡', step: '07', label: 'REFLEKSI', desc: 'Renungkan hasil belajar' },
          ].map((item) => (
            <div key={item.step} className="track-step-item" style={{ background: '#242424', borderBottomColor: '#FF6B1A' }}>
              <div className="track-step-number" style={{ color: '#FF6B1A' }}>
                <span style={{ fontSize: '1.4rem' }}>{item.emoji}</span>
                <span>{item.step}</span>
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '0.98rem', color: '#FFFFFF', marginBottom: '4px' }}>
                {item.label}
              </div>
              <div style={{ color: '#D1D5DB', fontSize: '0.84rem', lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EDITORIAL MAGAZINE SPLIT SECTION */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="editorial-split">
          {/* Visual Showcase Side */}
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #242424 0%, #1A1A1A 100%)',
              border: '1.5px solid rgba(255, 107, 26, 0.5)',
              borderRadius: '28px',
              padding: '40px 32px',
              color: '#FFFFFF',
              boxShadow: '0 12px 36px -6px rgba(0, 0, 0, 0.6)',
              overflow: 'hidden',
            }}
          >
            {/* Speed Lines Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 12px, transparent 12px, transparent 24px)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-block', background: 'rgba(255, 107, 26, 0.25)', border: '1px solid #FF6B1A', borderRadius: '100px', padding: '6px 16px', fontSize: '0.78rem', fontFamily: 'Poppins', fontWeight: 800, letterSpacing: '1px', marginBottom: '20px', color: '#FF9F43' }}>
                EXCELLENCE IN SPORT EDUCATION
              </div>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🏆</div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2rem', color: '#FFFFFF', marginBottom: '12px', lineHeight: 1.2 }}>
                Kurikulum PJOK Terstruktur
              </h3>
              <p style={{ color: '#D1D5DB', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '28px' }}>
                Materi disajikan secara visual, padat, dan dilengkapi dengan gambar peragaan teknik dasar passing, service, smash, hingga strategi permainan bola besar.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/materi" style={{ textDecoration: 'none' }}>
                  <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
                    📖 Buka Modul Materi
                  </button>
                </Link>
                <Link href="/video" style={{ textDecoration: 'none' }}>
                  <button className="btn-secondary" style={{ padding: '12px 20px', fontSize: '0.9rem' }}>
                    🎥 Putar Video
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Editorial Index Side */}
          <div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.85rem', color: '#FF6B1A', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
              MODUL MATERI KHUSUS
            </div>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '24px' }}>
              Modul Pembelajaran PJOK
            </h2>

            <div>
              {[
                { number: '01', emoji: '🏐', title: 'Bola Voli', desc: 'Passing, Servis, Smash, Block, Peraturan & Formasi', href: '/materi/bola-voli' },
                { number: '02', emoji: '⚽', title: 'Sepak Bola', desc: 'Passing, Control, Dribbling, Heading, Shooting, & Offside', href: '/materi/sepak-bola' },
                { number: '03', emoji: '🏀', title: 'Bola Basket', desc: 'Chest pass, Dribble, Lay-up, Shooting BEEF, & Pivot', href: '/materi/bola-basket' },
                { number: '04', emoji: '🏃', title: 'Atletik (Mother of Sports)', desc: 'Sprint, Start Jongkok, Estafet, Lompat Jauh, Tolak Peluru', href: '/materi/atletik' },
                { number: '05', emoji: '🤸', title: 'Senam Lantai & Ritmik', desc: 'Guling Depan, Guling Belakang, Sikap Lilin, Kayang, Meroda', href: '/materi/senam' },
                { number: '06', emoji: '💪', title: 'Kebugaran Jasmani', desc: 'Daya Tahan, Kekuatan, Kelentukan, Kelincahan, & TKJI', href: '/materi/kebugaran' },
              ].map((item) => (
                <Link key={item.number} href={item.href} style={{ textDecoration: 'none' }}>
                  <div className="editorial-hairline" style={{ display: 'flex', gap: '16px', alignItems: 'center', cursor: 'pointer' }}>
                    <div className="editorial-number-badge" style={{ color: '#FF6B1A', fontSize: '1.8rem' }}>{item.number}</div>
                    <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{item.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '2px' }}>
                        {item.title}
                      </div>
                      <div style={{ color: '#D1D5DB', fontSize: '0.86rem', lineHeight: 1.4 }}>
                        {item.desc}
                      </div>
                    </div>
                    <div style={{ color: '#FF9F43', fontWeight: 900 }}>→</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. GAMES SECTION */}
      <section style={{ padding: '60px 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{ display: 'inline-block', background: '#242424', border: '1px solid rgba(255, 107, 26, 0.4)', borderRadius: '100px', padding: '6px 18px', color: '#FF6B1A', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '12px' }}>
            HIGH ENERGY ARENA
          </div>
          <h2 className="section-title" style={{ fontSize: '2.2rem', margin: 0, color: '#FFFFFF' }}>
            🎮 9 Game & Tantangan Interaktif
          </h2>
          <p style={{ color: '#D1D5DB', fontSize: '0.98rem', marginTop: '6px' }}>Tingkatkan keaktifan & kerja sama tim siswa di kelas!</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { href: '/games/volley-board', icon: '🎲', title: 'Sports Board Game', tag: 'Papan Interaktif', desc: 'Kocak dadu, jalankan bidak kelompok, jawab kuis di setiap kotak!' },
            { href: '/games/grand-prix', icon: '🏎️', title: 'Grand Prix Rebut & Gerak', tag: 'Rebut & Gerak', desc: 'Lomba gerakan fisik acak & jawab kuis kelompok!' },
            { href: '/games/roda-keberuntungan', icon: '🎡', title: 'Roda Keberuntungan', tag: 'Spin Wheel', desc: 'Putar roda spin 6 segmen untuk tantangan fisik!' },
            { href: '/games/memory-match', icon: '🃏', title: 'Memory Match & Gerak', tag: 'Memory Match', desc: 'Jodohkan kartu & peragakan teknik fisik di depan kelas!' },
            { href: '/games/detektif-kesalahan', icon: '🔍', title: 'Detektif Kesalahan', tag: 'Analisis Gerak', desc: 'Analisis foto/video gerakan salah dan beri perbaikan!' },
            { href: '/games/siapa-cepat', icon: '⚡', title: 'Siapa Cepat!', tag: 'Refleks Cepat', desc: 'Rebutan menjawab pertanyaan kuis dengan mengangkat kartu!' },
          ].map((game) => (
            <Link key={game.href} href={game.href} style={{ textDecoration: 'none' }}>
              <div className="slanted-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#242424' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '2.4rem' }}>{game.icon}</span>
                  <span style={{ background: 'rgba(255, 107, 26, 0.25)', border: '1px solid #FF6B1A', color: '#FF9F43', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.72rem', borderRadius: '100px', padding: '4px 12px' }}>
                    {game.tag}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '8px' }}>
                  {game.title}
                </h3>
                <p style={{ color: '#D1D5DB', fontSize: '0.88rem', lineHeight: 1.5, flex: 1 }}>{game.desc}</p>
                <div style={{ marginTop: '16px', color: '#FF6B1A', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Mainkan Game →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5.5 LIVE RANKING / LEADERBOARD PREVIEW SECTION */}
      <section style={{ padding: '60px 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-block', background: '#242424', border: '1px solid rgba(255, 200, 87, 0.4)', borderRadius: '100px', padding: '6px 18px', color: '#FFC857', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '12px' }}>
            CLASS CHAMPIONS
          </div>
          <h2 className="section-title" style={{ fontSize: '2.2rem', margin: 0, color: '#FFFFFF' }}>
            🏆 Papan Skor & Leaderboard Kelas
          </h2>
          <p style={{ color: '#D1D5DB', fontSize: '0.98rem', marginTop: '6px' }}>Pantau perolehan XP poin kelompok secara langsung di kelas!</p>
        </div>

        {/* Podium Preview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {(mounted ? getSortedTeams() : teams).slice(0, 4).map((team, idx) => (
            <div
              key={team.id}
              style={{
                background: '#242424',
                border: `2px solid ${idx === 0 ? '#FFC857' : idx === 1 ? '#9CA3AF' : idx === 2 ? '#F97316' : '#3F3F46'}`,
                borderRadius: '20px',
                padding: '24px',
                textAlign: 'center',
                boxShadow: idx === 0 ? '0 8px 30px rgba(255, 200, 87, 0.25)' : '0 4px 20px rgba(0, 0, 0, 0.4)',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : team.emoji}
              </div>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.25rem', color: '#FFFFFF', margin: '0 0 6px' }}>
                {team.name}
              </h3>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.2rem', color: idx === 0 ? '#FFC857' : idx === 1 ? '#D1D5DB' : idx === 2 ? '#FB923C' : '#FF6B1A' }}>
                {team.points} <span style={{ fontSize: '0.9rem', color: '#D1D5DB' }}>XP</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '12px' }}>
                <span style={{ background: '#171717', border: '1px solid rgba(255, 107, 26, 0.4)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', color: '#FF6B1A', fontWeight: 700 }}>
                  💪 {team.sportsmanship}
                </span>
                <span style={{ background: '#171717', border: '1px solid rgba(255, 159, 67, 0.4)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', color: '#FF9F43', fontWeight: 700 }}>
                  🤝 {team.cooperation}
                </span>
                <span style={{ background: '#171717', border: '1px solid rgba(255, 200, 87, 0.4)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', color: '#FFC857', fontWeight: 700 }}>
                  📋 {team.discipline}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/ranking" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.02rem' }}>
              🏆 Buka Full Leaderboard & Papan Skor →
            </button>
          </Link>
        </div>
      </section>

      {/* 6. ONE SCREEN ANGLED BANNER */}
      <section
        style={{
          background: 'linear-gradient(135deg, #242424 0%, #1A1A1A 100%)',
          color: '#FFFFFF',
          padding: '60px 20px',
          clipPath: 'polygon(0 0, 100% 3vw, 100% 100%, 0 calc(100% - 3vw))',
          margin: '40px 0',
          borderTop: '1px solid #3F3F46',
          borderBottom: '1px solid #3F3F46',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>📺</div>
          <h2
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
              marginBottom: '16px',
              color: '#FFFFFF',
            }}
          >
            ONE SCREEN — MANY STUDENTS
          </h2>
          <p
            style={{
              color: '#D1D5DB',
              fontSize: '1.08rem',
              lineHeight: 1.7,
              marginBottom: '32px',
              fontWeight: 500,
            }}
          >
            Guru membuka website di laptop, tampilkan lewat proyektor, dan seluruh kelas bisa belajar bersama.{' '}
            <strong style={{ color: '#FFC857' }}>Tidak perlu setiap siswa membawa HP!</strong>
          </p>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {['🖥️ 1 Laptop Guru', '📡 1 Proyektor Kelas', '👥 Seluruh Siswa Terlibat', '📵 Bebas Gangguan HP'].map((item) => (
              <div
                key={item}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid #3F3F46',
                  borderRadius: '12px',
                  padding: '12px 22px',
                  color: '#FFFFFF',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ALL MENU DIRECTORY */}
      <section style={{ padding: '60px 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', color: '#FFFFFF' }}>
            🗺️ Direktori Lengkap Menu
          </h2>
          <p style={{ color: '#D1D5DB' }}>Akses cepat ke seluruh fitur BAYMOTION</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  background: '#242424',
                  border: `1.5px solid ${item.border}`,
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: item.tagBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF' }}>
                    {item.label}
                  </div>
                  <div style={{ color: '#D1D5DB', fontSize: '0.82rem' }}>{item.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer
        style={{
          borderTop: '1px solid #3F3F46',
          background: '#1A1A1A',
          padding: '48px 20px',
          textAlign: 'center',
          color: '#D1D5DB',
          fontSize: '0.9rem',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏆</div>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '4px' }}>
          BAYMOTION
        </div>
        <div style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
          Media Pembelajaran PJOK Interaktif · Learn • Move • Challenge
        </div>
        <div
          style={{
            fontSize: '0.78rem',
            color: '#9CA3AF',
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          CREATED & DEVELOPED BY
        </div>
        <div
          style={{
            fontSize: '1.1rem',
            color: '#FF6B1A',
            fontWeight: 900,
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '1px',
            marginTop: '2px',
          }}
        >
          BAYU PRIA PRATAMA
        </div>
      </footer>
    </div>
  );
}
