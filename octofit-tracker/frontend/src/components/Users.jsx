import ResourceView from './ResourceView.jsx';

export default function Users() {
	return <ResourceView resource="users" title="Members" description="The people powering this week's momentum." fields={[{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'profile', label: 'Profile' }]} />;
}
