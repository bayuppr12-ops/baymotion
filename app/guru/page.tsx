'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { teamColors, teamEmojis } from '@/data/teams';
import { achievements } from '@/data/achievements';
import { useToast } from '@/components/Toast';
import Link from 'next/link';

export default function GuruPage() {
  const {
    teams,
    pointLogs,
    isTeacherMode,
    setTeacherMode,
    addTeam,
    removeTeam,
    updateTeamName,
    updateTeamColor,
    resetAllScores,
    addPoints,
    removePoints,
    addSportsmanship,
    addCooperation,
    addDiscipline,
    addBadge,
    removeBadge,
  } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedColor, setSelectedColor] = useState(teamColors[0]);
  const [selectedEmoji, setSelectedEmoji] = useState(teamEmojis[0]);
  const [manualPoints, setManualPoints] = useState<Record<string, string>>({});
  const [manualReason, setManualReason] = useState<Record<string, string>>({});

  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    useGameStore.persist.rehydrate();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'guru' || pinInput.length > 0) {
      setTeacherMode(true);
      showToast('🔑 Login Mode Guru berhasil!', 'success');
    } else {
      showToast('❌ PIN salah! (Petunjuk: masukkan angka/teks bebas)', 'error');
    }
  };

  const handleAddTeam = () => {
    if (!newTeamName.trim()) { showToast('Masukkan nama kelompok!', 'error'); return; }
    addTeam(newTeamName.trim(), selectedColor, selectedEmoji);
    setNewTeamName('');
    showToast(`✅ Kelompok ${newTeamName} berhasil ditambahkan!`, 'success');
  };

  const handleAddManualPoints = (teamId: string) => {
    const pts = parseInt(manualPoints[teamId] || '0');
    const reason = manualReason[teamId] || 'Poin tambahan dari Guru';
    if (isNaN(pts) || pts <= 0) { showToast('Masukkan jumlah poin yang valid!', 'error'); return; }
    addPoints(teamId, pts, reason, 'manual');
    setManualPoints((prev) => ({ ...prev, [teamId]: '' }));
    setManualReason((prev) => ({ ...prev, [teamId]: '' }));
    showToast(`✅ +${pts} poin diberikan!`, 'success');
  };

  const handleRemoveManualPoints = (teamId: string) => {
    const pts = parseInt(manualPoints[teamId] || '0');
    const reason = manualReason[teamId] || 'Pengurangan poin dari Guru';
    if (isNaN(pts) || pts <= 0) { showToast('Masukkan jumlah poin yang valid!', 'error'); return; }
    removePoints(teamId, pts, reason);
    setManualPoints((prev) => ({ ...prev, [teamId]: '' }));
    setManualReason((prev) => ({ ...prev, [teamId]: '' }));
    showToast(`⚠️ -${pts} poin dikurangi!`, 'info');
  };

  if (!isTeacherMode) {
    return (
      <div style={{ maxWidth: '450px', margin: '60px auto', padding: '0 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
        <ToastContainer />
        <div
          style={{
            background: '#242424',
            border: '1.5px solid #3F3F46',
            borderRadius: '24px',
            padding: '36px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>👨‍🏫</div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '8px' }}>
            MODE GURU
          </h1>
          <p style={{ color: '#D1D5DB', fontSize: '0.9rem', marginBottom: '24px' }}>
            Panel kontrol khusus guru untuk mengelola kelas & poin.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.85rem', color: '#D1D5DB', display: 'block', marginBottom: '6px', textAlign: 'left' }}>
                PIN Akses Guru:
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="Masukkan PIN (default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '4px', color: '#FFFFFF' }}
                autoFocus
              />
            </div>
            <button type="submit" className="btn-secondary" style={{ padding: '14px', fontSize: '1rem' }}>
              🔓 Masuk Mode Guru
            </button>
          </form>
          <div style={{ color: '#D1D5DB', fontSize: '0.78rem', marginTop: '16px' }}>
            (PIN Default: <strong style={{ color: '#FF6B1A' }}>1234</strong>)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      <ToastContainer />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '2rem' }}>👨‍🏫</span>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.8rem', color: '#FFFFFF', margin: 0 }}>
              DASHBOARD GURU
            </h1>
          </div>
          <p style={{ color: '#D1D5DB', fontSize: '0.9rem', margin: 0 }}>
            Kelola kelompok, tambah/kurang poin, beri badge, dan kontrol permainan.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-ghost" onClick={() => setTeacherMode(false)}>
            🔒 Keluar Mode Guru
          </button>
          <Link href="/ranking" style={{ textDecoration: 'none' }}>
            <button className="btn-primary">🏆 Lihat Leaderboard</button>
          </Link>
        </div>
      </div>

      {/* Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        
        {/* 1. Tambah Kelompok Baru */}
        <div style={{ background: '#242424', border: '1.5px solid #3F3F46', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.2rem', color: '#FF6B1A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ➕ Tambah Kelompok Baru
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              className="input-field"
              placeholder="Nama Kelompok (contoh: SPIKE TIM)"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />

            <div>
              <label style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.8rem', color: '#D1D5DB', display: 'block', marginBottom: '6px' }}>
                Pilih Icon Emoji:
              </label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {teamEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    style={{
                      background: selectedEmoji === emoji ? '#FF6B1A' : '#171717',
                      border: `1px solid ${selectedEmoji === emoji ? '#FF6B1A' : '#3F3F46'}`,
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.8rem', color: '#D1D5DB', display: 'block', marginBottom: '6px' }}>
                Pilih Warna Tema:
              </label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {teamColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      background: color,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: selectedColor === color ? '3px solid #FFFFFF' : 'none',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>

            <button className="btn-primary" onClick={handleAddTeam} style={{ marginTop: '8px' }}>
              + Tambahkan Kelompok
            </button>
          </div>
        </div>

        {/* 2. Reset / Danger Zone */}
        <div style={{ background: '#242424', border: '1.5px solid rgba(239, 68, 68, 0.4)', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.2rem', color: '#EF4444', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚠️ Reset Data Kelas
          </h2>
          <p style={{ color: '#D1D5DB', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Mereset seluruh skor, poin karakter, dan log aktivitas untuk sesi baru.
          </p>
          <button
            className="btn-danger"
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin mereset SELURUH skor kelompok?')) {
                resetAllScores();
                showToast('🔄 Seluruh skor berhasil direset!', 'info');
              }
            }}
          >
            🔄 Reset Seluruh Skor & Poin
          </button>
        </div>

      </div>

      {/* 3. Pengelolaan Kelompok & Poin */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '20px' }}>
          👥 Kelola Kelompok & Poin ({teams.length} Kelompok)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {teams.map((t) => (
            <div
              key={t.id}
              style={{
                background: '#242424',
                border: `2px solid ${t.color || '#3F3F46'}`,
                borderRadius: '20px',
                padding: '20px',
                boxShadow: `0 8px 30px rgba(0, 0, 0, 0.5)`,
              }}
            >
              {/* Header card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.8rem' }}>{t.emoji}</span>
                  <input
                    value={t.name}
                    onChange={(e) => updateTeamName(t.id, e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `2px solid ${t.color || '#3F3F46'}`,
                      color: t.color || '#FF6B1A',
                      fontFamily: 'Poppins',
                      fontWeight: 900,
                      fontSize: '1.2rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <button
                  onClick={() => removeTeam(t.id)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '1.1rem' }}
                  title="Hapus Kelompok"
                >
                  🗑️
                </button>
              </div>

              {/* Theme Color Picker Selector Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', background: '#171717', borderRadius: '10px', padding: '6px 12px', border: '1px solid #3F3F46' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'Poppins', fontWeight: 700, color: '#D1D5DB' }}>
                  🎨 Warna Tema:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {teamColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateTeamColor(t.id, color, t.emoji)}
                      style={{
                        background: color,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: t.color === color ? '2px solid #FFFFFF' : 'none',
                        cursor: 'pointer',
                        transform: t.color === color ? 'scale(1.25)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                      }}
                      title={`Ganti warna tema ke ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Points summary */}
              <div style={{ background: '#171717', border: `1.5px solid ${t.color || '#FF6B1A'}`, borderRadius: '12px', padding: '12px', marginBottom: '16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.8rem', color: t.color || '#FF6B1A' }}>
                  {t.points} <span style={{ fontSize: '0.9rem', color: '#D1D5DB' }}>XP</span>
                </div>
              </div>

              {/* Character points buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '16px' }}>
                <button
                  onClick={() => { addSportsmanship(t.id, 10); showToast(`💪 +10 Sportivitas ke ${t.name}`, 'success'); }}
                  style={{ background: '#171717', border: '1px solid rgba(255, 107, 26, 0.4)', borderRadius: '8px', padding: '8px 4px', color: '#FF6B1A', fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer' }}
                >
                  💪 +10 Sportif
                </button>
                <button
                  onClick={() => { addCooperation(t.id, 10); showToast(`🤝 +10 Kerja Sama ke ${t.name}`, 'success'); }}
                  style={{ background: '#171717', border: '1px solid rgba(255, 159, 67, 0.4)', borderRadius: '8px', padding: '8px 4px', color: '#FF9F43', fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer' }}
                >
                  🤝 +10 Kerja Sama
                </button>
                <button
                  onClick={() => { addDiscipline(t.id, 5); showToast(`📋 +5 Disiplin ke ${t.name}`, 'success'); }}
                  style={{ background: '#171717', border: '1px solid rgba(255, 200, 87, 0.4)', borderRadius: '8px', padding: '8px 4px', color: '#FFC857', fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer' }}
                >
                  📋 +5 Disiplin
                </button>
              </div>

              {/* Manual Point Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <input
                  type="number"
                  placeholder="Jumlah Poin..."
                  className="input-field"
                  value={manualPoints[t.id] || ''}
                  onChange={(e) => setManualPoints((prev) => ({ ...prev, [t.id]: e.target.value }))}
                  style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                />
                <input
                  placeholder="Alasan (opsional)..."
                  className="input-field"
                  value={manualReason[t.id] || ''}
                  onChange={(e) => setManualReason((prev) => ({ ...prev, [t.id]: e.target.value }))}
                  style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-success" style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }} onClick={() => handleAddManualPoints(t.id)}>
                    + Tambah Poin
                  </button>
                  <button className="btn-danger" style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }} onClick={() => handleRemoveManualPoints(t.id)}>
                    - Kurang Poin
                  </button>
                </div>
              </div>

              {/* Badge Management */}
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.75rem', color: '#D1D5DB', marginBottom: '6px' }}>
                  BERIKAN BADGE:
                </div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {achievements.map((badge) => {
                    const hasBadge = t.badges.includes(badge.id);
                    return (
                      <button
                        key={badge.id}
                        onClick={() => {
                          if (hasBadge) removeBadge(t.id, badge.id);
                          else addBadge(t.id, badge.id);
                        }}
                        style={{
                          background: hasBadge ? 'rgba(255, 200, 87, 0.25)' : '#171717',
                          border: `1px solid ${hasBadge ? '#FFC857' : '#3F3F46'}`,
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontFamily: 'Poppins',
                          fontWeight: 700,
                          color: hasBadge ? '#FFC857' : '#D1D5DB',
                        }}
                        title={badge.name}
                      >
                        {badge.emoji} {badge.name}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 4. Recent Activity Logs */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '16px' }}>
          📜 Log Aktivitas Poin Terakhir
        </h2>
        <div style={{ background: '#242424', border: '1.5px solid #3F3F46', borderRadius: '16px', padding: '16px', maxHeight: '300px', overflowY: 'auto' }}>
          {pointLogs.length === 0 ? (
            <div style={{ color: '#D1D5DB', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>
              Belum ada aktivitas poin.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pointLogs.map((log) => (
                <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #3F3F46', paddingBottom: '8px' }}>
                  <div>
                    <span style={{ fontFamily: 'Poppins', fontWeight: 700, color: '#FFFFFF', fontSize: '0.9rem' }}>{log.teamName}: </span>
                    <span style={{ color: '#D1D5DB', fontSize: '0.85rem' }}>{log.reason}</span>
                  </div>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 900, color: log.amount > 0 ? '#10B981' : '#EF4444', fontSize: '0.95rem' }}>
                    {log.amount > 0 ? `+${log.amount}` : log.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
