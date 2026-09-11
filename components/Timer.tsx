'use client';

import { useState, useEffect, useRef } from 'react';

interface TimerProps {
  large?: boolean;
  projector?: boolean;
}

const timerOptions = [
  { label: '30 Detik', seconds: 30 },
  { label: '1 Menit', seconds: 60 },
  { label: '90 Detik', seconds: 90 },
  { label: '2 Menit', seconds: 120 },
  { label: '3 Menit', seconds: 180 },
  { label: '5 Menit', seconds: 300 },
];

export default function Timer({ large = false, projector = false }: TimerProps) {
  const [selectedSeconds, setSelectedSeconds] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const playBeep = (frequency: number, duration: number) => {
    try {
      if (!audioRef.current) {
        audioRef.current = new AudioContext();
      }
      const ctx = audioRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (_) {}
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsDone(true);
            playBeep(800, 0.5);
            setTimeout(() => playBeep(600, 0.5), 300);
            setTimeout(() => playBeep(1000, 1), 600);
            return 0;
          }
          if (prev <= 6) playBeep(880, 0.15);
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const handleStart = () => {
    setIsDone(false);
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setIsDone(false);
    setTimeLeft(selectedSeconds);
  };

  const handleSelect = (seconds: number) => {
    setSelectedSeconds(seconds);
    setTimeLeft(seconds);
    setIsRunning(false);
    setIsDone(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const percentage = (timeLeft / selectedSeconds) * 100;
  const isWarning = timeLeft <= 10 && timeLeft > 0;

  const fontSize = projector ? '8rem' : large ? '5rem' : '3.5rem';
  const containerPadding = projector ? '40px' : large ? '32px' : '24px';

  return (
    <div
      style={{
        background: '#132F4C',
        borderRadius: '24px',
        padding: containerPadding,
        border: isDone
          ? '2px solid #EF4444'
          : isWarning
          ? '2px solid #F5B942'
          : '1px solid rgba(255, 255, 255, 0.12)',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      {isDone ? (
        <div>
          <div style={{ fontSize: projector ? '5rem' : '3rem', marginBottom: '12px', animation: 'bounce-in 0.5s ease' }}>
            ⏰
          </div>
          <div
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 900,
              fontSize: projector ? '3rem' : '2rem',
              color: '#EF4444',
            }}
          >
            WAKTU HABIS!
          </div>
        </div>
      ) : (
        <div
          className={isWarning ? 'animate-countdown' : ''}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
            fontSize: fontSize,
            color: isDone ? '#EF4444' : isWarning ? '#F5B942' : '#F8FAFC',
            letterSpacing: '4px',
            lineHeight: 1,
          }}
        >
          {timeString}
        </div>
      )}

      {/* Progress bar */}
      <div className="progress-bar" style={{ marginTop: '16px', height: projector ? '12px' : '8px', background: 'rgba(255, 255, 255, 0.1)' }}>
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            background:
              percentage <= 20
                ? 'linear-gradient(90deg, #EF4444, #F5B942)'
                : 'linear-gradient(90deg, #0F766E, #2563EB)',
          }}
        />
      </div>

      {/* Timer options */}
      {!projector && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
          {timerOptions.map((opt) => (
            <button
              key={opt.seconds}
              onClick={() => handleSelect(opt.seconds)}
              style={{
                padding: '6px 14px',
                borderRadius: '100px',
                border: '1.5px solid',
                borderColor: selectedSeconds === opt.seconds ? '#10B981' : 'rgba(255, 255, 255, 0.15)',
                background: selectedSeconds === opt.seconds ? '#0F766E' : '#102A43',
                color: selectedSeconds === opt.seconds ? '#FFFFFF' : '#A8BED3',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
        {!isRunning ? (
          <button
            className="btn-success"
            onClick={handleStart}
            style={{ fontSize: projector ? '1.2rem' : '1rem', padding: projector ? '16px 40px' : '12px 28px' }}
          >
            {timeLeft === selectedSeconds ? '▶ MULAI' : '▶ LANJUT'}
          </button>
        ) : (
          <button
            className="btn-danger"
            onClick={handlePause}
            style={{ fontSize: projector ? '1.2rem' : '1rem', padding: projector ? '16px 40px' : '12px 28px' }}
          >
            ⏸ PAUSE
          </button>
        )}
        <button
          className="btn-ghost"
          onClick={handleReset}
          style={{ fontSize: projector ? '1.2rem' : '1rem' }}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
