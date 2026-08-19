import ResourceView from './ResourceView.jsx';

export default function Workouts() {
	return (
		<ResourceView
			resource="workouts"
			title="Workouts"
			description="Practical sessions for whatever energy you brought today."
			fields={[
				{ key: 'name', label: 'Workout' },
				{ key: 'difficulty', label: 'Difficulty' },
				{ key: 'durationMinutes', label: 'Minutes' },
				{ key: 'exercises', label: 'Exercises' },
			]}
		/>
	);
}
