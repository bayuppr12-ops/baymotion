'use client';

import React, { useState, useEffect } from 'react';

interface QuestionTimerProps {
  currentIdx: number | string;
  duration?: number;
  isPaused?: boolean;
  onTimeUp?: () => void;
  style?: React.CSSProperties;
}

export function QuestionTimer({
  currentIdx,
  duration = 20,
  isPaused = false,
  onTimeUp,
  style,
}: QuestionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer on question change or duration update
  useEffect(() => {
    setTimeLeft(duration);
  }, [currentIdx, duration]);

  // Countdown timer logic
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onTimeUp) {
            setTimeout(() => onTimeUp(), 0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIdx, isPaused, timeLeft, onTimeUp]);

  const isWarning = timeLeft <= 10 && timeLeft > 5;
  const isUrgent = timeLeft <= 5 && timeLeft > 0;
  const isTimeUp = timeLeft === 0;

  // Dynamic visual styling per requirement:
  // 20-11s: normal (#FF6B1A)
  // 10-6s: warning (#FFC857)
  // 5-0s: urgent (#EF4444 + pulse)
  let bg = '#171717';
  let border = 'rgba(255, 107, 26, 0.5)';
  let textColor = '#FF6B1A';
  let animation: string | undefined = undefined;

  if (isTimeUp) {
    bg = 'rgba(239, 68, 68, 0.2)';
    border = '#EF4444';
    textColor = '#FCA5A5';
  } else if (isUrgent) {
    bg = 'rgba(239, 68, 68, 0.25)';
    border = '#EF4444';
    textColor = '#EF4444';
    animation = 'pulse 0.8s ease-in-out infinite';
  } else if (isWarning) {
    bg = 'rgba(255, 159, 67, 0.25)';
    border = '#FF9F43';
    textColor = '#FFC857';
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: bg,
        border: `2px solid ${border}`,
        borderRadius: '100px',
        padding: '8px 24px',
        color: textColor,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 900,
        fontSize: '1.2rem',
        boxShadow: isUrgent ? '0 0 18px rgba(239, 68, 68, 0.7)' : '0 4px 16px rgba(0, 0, 0, 0.4)',
        animation: animation,
        transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
        userSelect: 'none',
        ...style,
      }}
    >
      <span style={{ fontSize: '1.4rem' }}>{isTimeUp ? '⏰' : '⏱️'}</span>
      <span>{isTimeUp ? 'WAKTU HABIS!' : `WAKTU: ${timeLeft}s`}</span>
    </div>
  );
}

// Custom hook to share timer state with component logic if needed
export function useQuestionTimer(currentIdx: number | string, duration = 20, isPaused = false, onTimeUp?: () => void) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [currentIdx, duration]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onTimeUp) {
            setTimeout(() => onTimeUp(), 0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIdx, isPaused, timeLeft, onTimeUp]);

  return {
    timeLeft,
    isTimeUp: timeLeft === 0,
    resetTimer: () => setTimeLeft(duration),
  };
}
