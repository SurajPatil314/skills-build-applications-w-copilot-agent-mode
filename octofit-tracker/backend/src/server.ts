import express from 'express';

import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
import createResourceRouter from './routes/index.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    status: 'ok',
    health: '/api/health',
    resources: ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts'],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', createResourceRouter(User));
app.use('/api/teams', createResourceRouter(Team));
app.use('/api/activities', createResourceRouter(Activity));
app.use('/api/leaderboard', createResourceRouter(LeaderboardEntry));
app.use('/api/workouts', createResourceRouter(Workout));

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});
