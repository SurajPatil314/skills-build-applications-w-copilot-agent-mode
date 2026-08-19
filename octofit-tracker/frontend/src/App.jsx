import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { API_BASE_URL } from './api.js';
import './App.css';

const navigation = [
  ['users', 'Members', Users],
  ['activities', 'Activities', Activities],
  ['teams', 'Teams', Teams],
  ['leaderboard', 'Leaderboard', Leaderboard],
  ['workouts', 'Workouts', Workouts],
];

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">OCTOFIT / FIELD NOTES</p>
          <h1>Move together.</h1>
        </div>
        <span className="api-status"><i /> API connected locally</span>
      </header>
      <nav className="app-nav" aria-label="Primary navigation">
        {navigation.map(([path, label]) => (
          <NavLink key={path} to={`/${path}`} className={({ isActive }) => isActive ? 'active' : ''}>
            {label}
          </NavLink>
        ))}
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          {navigation.map(([path, , Component]) => <Route key={path} path={`/${path}`} element={<Component />} />)}
        </Routes>
      </main>
      <footer className="app-footer">Data source: {API_BASE_URL}</footer>
    </div>
  );
}

export default App;
