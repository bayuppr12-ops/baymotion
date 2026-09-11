'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Team, PointLog, ClassSession } from '@/types';
import { defaultTeams } from '@/data/teams';

interface GameStore {
  // State
  teams: Team[];
  pointLogs: PointLog[];
  currentSession: string;
  isTeacherMode: boolean;
  isProjectorMode: boolean;

  // Team Actions
  setTeams: (teams: Team[]) => void;
  addTeam: (name: string, color: string, emoji: string) => void;
  removeTeam: (id: string) => void;
  updateTeamName: (id: string, name: string) => void;
  updateTeamColor: (id: string, color: string, emoji: string) => void;
  resetAllScores: () => void;

  // Point Actions
  addPoints: (teamId: string, amount: number, reason: string, category: PointLog['category']) => void;
  removePoints: (teamId: string, amount: number, reason: string) => void;
  addSportsmanship: (teamId: string, amount: number) => void;
  addCooperation: (teamId: string, amount: number) => void;
  addDiscipline: (teamId: string, amount: number) => void;

  // Badge Actions
  addBadge: (teamId: string, badgeId: string) => void;
  removeBadge: (teamId: string, badgeId: string) => void;

  // Mode Actions
  setTeacherMode: (value: boolean) => void;
  setProjectorMode: (value: boolean) => void;

  // Sorted teams getter
  getSortedTeams: () => Team[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      teams: defaultTeams,
      pointLogs: [],
      currentSession: new Date().toLocaleDateString('id-ID'),
      isTeacherMode: false,
      isProjectorMode: false,

      setTeams: (teams) => set({ teams }),

      addTeam: (name, color, emoji) =>
        set((state) => ({
          teams: [
            ...state.teams,
            {
              id: generateId(),
              name,
              color,
              emoji,
              points: 0,
              sportsmanship: 0,
              cooperation: 0,
              discipline: 0,
              badges: [],
              gamesPlayed: 0,
              correctAnswers: 0,
            },
          ],
        })),

      removeTeam: (id) =>
        set((state) => ({
          teams: state.teams.filter((t) => t.id !== id),
        })),

      updateTeamName: (id, name) =>
        set((state) => ({
          teams: state.teams.map((t) => (t.id === id ? { ...t, name } : t)),
        })),

      updateTeamColor: (id, color, emoji) =>
        set((state) => ({
          teams: state.teams.map((t) => (t.id === id ? { ...t, color, emoji } : t)),
        })),

      resetAllScores: () =>
        set((state) => ({
          teams: state.teams.map((t) => ({
            ...t,
            points: 0,
            sportsmanship: 0,
            cooperation: 0,
            discipline: 0,
            badges: [],
            gamesPlayed: 0,
            correctAnswers: 0,
          })),
          pointLogs: [],
        })),

      addPoints: (teamId, amount, reason, category) =>
        set((state) => {
          const team = state.teams.find((t) => t.id === teamId);
          if (!team) return state;
          const log: PointLog = {
            id: generateId(),
            teamId,
            teamName: team.name,
            amount,
            reason,
            timestamp: Date.now(),
            category,
          };
          return {
            teams: state.teams.map((t) =>
              t.id === teamId ? { ...t, points: t.points + amount } : t
            ),
            pointLogs: [log, ...state.pointLogs].slice(0, 100),
          };
        }),

      removePoints: (teamId, amount, reason) =>
        set((state) => {
          const team = state.teams.find((t) => t.id === teamId);
          if (!team) return state;
          const log: PointLog = {
            id: generateId(),
            teamId,
            teamName: team.name,
            amount: -amount,
            reason,
            timestamp: Date.now(),
            category: 'manual',
          };
          return {
            teams: state.teams.map((t) =>
              t.id === teamId ? { ...t, points: Math.max(0, t.points - amount) } : t
            ),
            pointLogs: [log, ...state.pointLogs].slice(0, 100),
          };
        }),

      addSportsmanship: (teamId, amount) =>
        set((state) => ({
          teams: state.teams.map((t) =>
            t.id === teamId
              ? { ...t, sportsmanship: t.sportsmanship + amount, points: t.points + amount }
              : t
          ),
        })),

      addCooperation: (teamId, amount) =>
        set((state) => ({
          teams: state.teams.map((t) =>
            t.id === teamId
              ? { ...t, cooperation: t.cooperation + amount, points: t.points + amount }
              : t
          ),
        })),

      addDiscipline: (teamId, amount) =>
        set((state) => ({
          teams: state.teams.map((t) =>
            t.id === teamId
              ? { ...t, discipline: t.discipline + amount, points: t.points + amount }
              : t
          ),
        })),

      addBadge: (teamId, badgeId) =>
        set((state) => ({
          teams: state.teams.map((t) =>
            t.id === teamId && !t.badges.includes(badgeId)
              ? { ...t, badges: [...t.badges, badgeId] }
              : t
          ),
        })),

      removeBadge: (teamId, badgeId) =>
        set((state) => ({
          teams: state.teams.map((t) =>
            t.id === teamId
              ? { ...t, badges: t.badges.filter((b) => b !== badgeId) }
              : t
          ),
        })),

      setTeacherMode: (value) => set({ isTeacherMode: value }),
      setProjectorMode: (value) => set({ isProjectorMode: value }),

      getSortedTeams: () => {
        const current = get().teams;
        const valid = current && current.length > 0 ? current : defaultTeams;
        return [...valid].sort((a, b) => b.points - a.points);
      },
    }),
    {
      name: 'baymotion-storage',
      skipHydration: true,
    }
  )
);
