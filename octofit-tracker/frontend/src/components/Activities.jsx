import ResourceView from './ResourceView.jsx';

export default function Activities() {
	return (
		<ResourceView
			resource="activities"
			title="Activities"
			description="A clear view of every effort logged by the team."
			fields={[
				{ key: 'type', label: 'Activity' },
				{ key: 'durationMinutes', label: 'Minutes' },
				{ key: 'calories', label: 'Calories' },
				{ key: 'completedAt', label: 'Completed' },
			]}
		/>
	);
}
