'use client';

import Link from 'next/link';

const games = [
  {
    id: 'quiz-battle',
    title: 'Quiz Battle',
    desc: 'Kuis kelompok interaktif per materi pembelajaran PJOK. Pilih materi dan uji kekompakan tim!',
    emoji: '🧠',
    color: '#FF6B1A',
    tagBg: 'rgba(255, 107, 26, 0.25)',
    border: 'rgba(255, 107, 26, 0.5)',
    players: 'Seluruh Kelas',
    duration: '15-20 menit',
    type: 'Kuis Kelompok',
  },
  {
    id: 'tebak-gerakan',
    title: 'Tebak Gerakan',
    desc: 'Lihat ilustrasi teknik, kelompok menebak nama gerakannya. Cepat dan akurat!',
    emoji: '🤸',
    color: '#FF6B1A',
    tagBg: 'rgba(255, 107, 26, 0.25)',
    border: 'rgba(255, 107, 26, 0.5)',
    players: 'Kelompok',
    duration: '10-15 menit',
    type: 'Tebak Gambar',
  },
  {
    id: 'detektif-kesalahan',
    title: 'Detektif Kesalahan',
    desc: 'Temukan kesalahan teknik dalam situasi yang ditampilkan. Siapa detektif terbaik?',
    emoji: '🔍',
    color: '#EF4444',
    tagBg: 'rgba(239, 68, 68, 0.25)',
    border: 'rgba(239, 68, 68, 0.5)',
    players: 'Kelompok',
    duration: '10-15 menit',
    type: 'Analisis',
  },
  {
    id: 'volley-board',
    title: 'Volley Board',
    desc: 'Board game digital! Lempar dadu, pindah kotak, dapat kuis atau tantangan!',
    emoji: '🎲',
    color: '#FFC857',
    tagBg: 'rgba(255, 200, 87, 0.25)',
    border: 'rgba(255, 200, 87, 0.5)',
    players: '2-4 Kelompok',
    duration: '20-30 menit',
    type: 'Board Game',
  },
  {
    id: 'siapa-cepat',
    title: 'Siapa Cepat Dia Dapat',
    desc: 'Pertanyaan muncul, siapa yang tercepat angkat tangan mendapat kesempatan menjawab!',
    emoji: '⚡',
    color: '#FFC857',
    tagBg: 'rgba(255, 200, 87, 0.25)',
    border: 'rgba(255, 200, 87, 0.5)',
    players: 'Seluruh Kelas',
    duration: '10-15 menit',
    type: 'Kecepatan',
  },
  {
    id: 'sports-charades',
    title: 'Sports Charades',
    desc: 'Satu siswa memperagakan gerakan tanpa bicara, tim lain menebak tekniknya!',
    emoji: '🎭',
    color: '#FF9F43',
    tagBg: 'rgba(255, 159, 67, 0.25)',
    border: 'rgba(255, 159, 67, 0.5)',
    players: 'Kelompok 4-6 orang',
    duration: '15-20 menit',
    type: 'Pantomim',
  },
  {
    id: 'grand-prix',
    title: 'Grand Prix Rebut & Gerak',
    desc: 'Tim berlomba melakukan gerakan fisik acak! Guru memilih tim tercepat untuk menjawab kuis.',
    emoji: '🏎️',
    color: '#FF6B1A',
    tagBg: 'rgba(255, 107, 26, 0.25)',
    border: 'rgba(255, 107, 26, 0.5)',
    players: 'Seluruh Kelas',
    duration: '15-20 menit',
    type: 'Rebut & Gerak',
  },
  {
    id: 'roda-keberuntungan',
    title: 'Roda Keberuntungan',
    desc: 'Putar roda spin 6 segmen untuk menentukan tantangan fisik atau strategi kelompok!',
    emoji: '🎡',
    color: '#FFC857',
    tagBg: 'rgba(255, 200, 87, 0.25)',
    border: 'rgba(255, 200, 87, 0.5)',
    players: 'Kelompok 4-6 orang',
    duration: '15-20 menit',
    type: 'Spin Wheel',
  },
  {
    id: 'memory-match',
    title: 'Memory Match & Gerak',
    desc: 'Cari pasangan kartu teknik olahraga & peragakan gerakan fisik di depan kelas untuk +5 Poin!',
    emoji: '🃏',
    color: '#9B59B6',
    tagBg: 'rgba(155, 89, 182, 0.25)',
    border: 'rgba(155, 89, 182, 0.5)',
    players: 'Kelompok',
    duration: '15-20 menit',
    type: 'Memory Match',
  },
];

export default function GamesPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎮</div>
        <h1
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#FFFFFF',
            marginBottom: '12px',
          }}
        >
          Game Arena
        </h1>
        <p style={{ color: '#D1D5DB', maxWidth: '540px', margin: '0 auto', fontSize: '1.02rem', lineHeight: 1.7 }}>
          Semua game dirancang untuk <strong style={{ color: '#FFFFFF' }}>dimainkan bersama di kelas</strong> tanpa HP siswa. Guru mengoperasikan, seluruh kelas berpartisipasi!
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
          {['📺 Proyektor Ready', '📵 Tanpa HP', '👥 Berbasis Kelompok', '🏃 Aktivitas Fisik'].map((tag) => (
            <div
              key={tag}
              style={{
                background: '#242424',
                border: '1px solid #3F3F46',
                borderRadius: '100px',
                padding: '6px 18px',
                color: '#FFFFFF',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '0.84rem',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Energetic Slanted Games Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`} style={{ textDecoration: 'none' }}>
            <div className="slanted-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#242424', border: '1.5px solid #3F3F46' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ fontSize: '2.8rem' }}>{game.emoji}</div>
                <div
                  style={{
                    background: game.tagBg,
                    border: `1px solid ${game.border}`,
                    borderRadius: '100px',
                    padding: '4px 14px',
                    color: game.color,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {game.type}
                </div>
              </div>

              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  color: '#FFFFFF',
                  marginBottom: '10px',
                }}
              >
                {game.title}
              </h2>
              <p style={{ color: '#D1D5DB', fontSize: '0.92rem', lineHeight: 1.6, flex: 1 }}>
                {game.desc}
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid #3F3F46',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ fontSize: '0.8rem', color: '#D1D5DB', fontFamily: 'Poppins', fontWeight: 600 }}>
                  👥 {game.players}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#D1D5DB', fontFamily: 'Poppins', fontWeight: 600 }}>
                  ⏱ {game.duration}
                </div>
              </div>

              <div
                style={{
                  marginTop: '16px',
                  color: '#FF6B1A',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Mulai Game →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom tip */}
      <div
        style={{
          marginTop: '48px',
          background: '#242424',
          border: '1.5px solid rgba(255, 107, 26, 0.4)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{ fontSize: '2.2rem', flexShrink: 0 }}>💡</div>
        <div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 800, color: '#FF6B1A', marginBottom: '6px', fontSize: '1.05rem' }}>
            Tips untuk Guru
          </div>
          <div style={{ color: '#D1D5DB', fontSize: '0.94rem', lineHeight: 1.7 }}>
            Kombinasikan beberapa game untuk sesi pembelajaran yang lebih seru! Mulai dengan Quiz Battle untuk mengecek pemahaman, lanjutkan dengan Siapa Cepat untuk menguji kecepatan merespons, dan tutup dengan Sports Charades untuk sesi yang menyenangkan.
          </div>
        </div>
      </div>
    </div>
  );
}
