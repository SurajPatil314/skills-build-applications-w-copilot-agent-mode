import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        profile: { goal: 'Build endurance', level: 'intermediate', weeklyTarget: 4 },
      },
      {
        name: 'Jordan Williams',
        email: 'jordan.williams@example.com',
        profile: { goal: 'Improve strength', level: 'beginner', weeklyTarget: 3 },
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        profile: { goal: 'Run a half marathon', level: 'advanced', weeklyTarget: 5 },
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Sunrise Striders',
        description: 'A supportive team for early morning movement.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Lunchtime Lifters',
        description: 'Short, focused strength sessions during the workday.',
        members: [users[1]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        type: 'Run',
        durationMinutes: 42,
        calories: 390,
        completedAt: new Date('2026-08-18T06:30:00Z'),
      },
      {
        userId: users[1]._id,
        teamId: teams[1]._id,
        type: 'Strength training',
        durationMinutes: 35,
        calories: 260,
        completedAt: new Date('2026-08-18T12:15:00Z'),
      },
      {
        userId: users[2]._id,
        teamId: teams[0]._id,
        type: 'Cycling',
        durationMinutes: 60,
        calories: 520,
        completedAt: new Date('2026-08-17T07:00:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[2]._id, teamId: teams[0]._id, points: 1280, rank: 1, period: '2026-W33' },
      { userId: users[0]._id, teamId: teams[0]._id, points: 1040, rank: 2, period: '2026-W33' },
      { userId: users[1]._id, teamId: teams[1]._id, points: 760, rank: 3, period: '2026-W33' },
    ]);

    await Workout.insertMany([
      {
        name: 'Full-body foundation',
        description: 'A balanced session for building consistent strength.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Plank'],
      },
      {
        name: 'Tempo run builder',
        description: 'Intervals that develop sustainable running speed.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Warm-up jog', 'Tempo intervals', 'Recovery jog', 'Cool-down'],
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
