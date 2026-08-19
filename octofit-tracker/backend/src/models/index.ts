import { model, Schema, type Model } from 'mongoose';

export type ResourceRecord = Record<string, unknown>;
export type ResourceModel = Model<ResourceRecord>;

const userSchema = new Schema<ResourceRecord>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile: {
      type: new Schema({ goal: String, level: String, weeklyTarget: Number }, { _id: false }),
      required: true,
    },
  },
  { timestamps: true },
);

const teamSchema = new Schema<ResourceRecord>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<ResourceRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema<ResourceRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<ResourceRecord>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String }],
  },
  { timestamps: true },
);

export const User = model<ResourceRecord>('User', userSchema, 'users');
export const Team = model<ResourceRecord>('Team', teamSchema, 'teams');
export const Activity = model<ResourceRecord>('Activity', activitySchema, 'activities');
export const LeaderboardEntry = model<ResourceRecord>(
  'LeaderboardEntry',
  leaderboardSchema,
  'leaderboard',
);
export const Workout = model<ResourceRecord>('Workout', workoutSchema, 'workouts');
