import ResourceView from './ResourceView.jsx';

export default function Teams() {
	return (
		<ResourceView
			resource="teams"
			title="Teams"
			description="Small groups with a shared reason to show up."
			fields={[
				{ key: 'name', label: 'Team' },
				{ key: 'description', label: 'Description' },
				{ key: 'members', label: 'Members' },
			]}
		/>
	);
}
