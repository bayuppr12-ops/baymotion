import { Team } from '@/types';

export const defaultTeams: Team[] = [
  {
    id: 'team-a',
    name: 'SMASHERS',
    color: '#FF6B1A',
    emoji: '🔥',
    points: 140,
    sportsmanship: 50,
    cooperation: 50,
    discipline: 40,
    badges: ['fairplay', 'teamwork'],
    gamesPlayed: 5,
    correctAnswers: 12,
  },
  {
    id: 'team-b',
    name: 'VOLLEY STARS',
    color: '#38BDF8',
    emoji: '⭐',
    points: 115,
    sportsmanship: 40,
    cooperation: 45,
    discipline: 30,
    badges: ['super-smash'],
    gamesPlayed: 4,
    correctAnswers: 10,
  },
  {
    id: 'team-c',
    name: 'SPIKE TEAM',
    color: '#4ADE80',
    emoji: '⚡',
    points: 90,
    sportsmanship: 30,
    cooperation: 35,
    discipline: 25,
    badges: ['speed-demon'],
    gamesPlayed: 4,
    correctAnswers: 8,
  },
  {
    id: 'team-d',
    name: 'BLOCK MASTERS',
    color: '#FACC15',
    emoji: '🛡️',
    points: 75,
    sportsmanship: 25,
    cooperation: 30,
    discipline: 20,
    badges: ['wall-block'],
    gamesPlayed: 3,
    correctAnswers: 6,
  },
];

export const teamColors = [
  '#FF6B1A', '#38BDF8', '#4ADE80', '#FACC15',
  '#C084FC', '#F43F5E', '#FB923C', '#2DD4BF',
];

export const teamEmojis = ['🔥', '⭐', '⚡', '🛡️', '🏆', '💎', '🎯', '🚀'];
