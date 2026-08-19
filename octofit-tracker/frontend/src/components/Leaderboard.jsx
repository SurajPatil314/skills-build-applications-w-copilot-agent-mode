import ResourceView from './ResourceView.jsx';
export default function Leaderboard() { return <ResourceView resource="leaderboard" title="Leaderboard" description="Friendly competition, measured in points." fields={[{ key: 'rank', label: 'Rank' }, { key: 'userId', label: 'Member' }, { key: 'points', label: 'Points' }, { key: 'period', label: 'Period' }]} />; }
