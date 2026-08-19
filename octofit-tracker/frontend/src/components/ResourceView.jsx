import { useEffect, useState } from 'react';
import { fetchResource } from '../api.js';

function displayValue(value) {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export default function ResourceView({ resource, title, description, fields }) {
  const [records, setRecords] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    let cancelled = false;
    fetchResource(resource)
      .then((data) => { if (!cancelled) { setRecords(data); setState({ loading: false, error: '' }); } })
      .catch((error) => { if (!cancelled) setState({ loading: false, error: error.message }); });
    return () => { cancelled = true; };
  }, [resource]);

  return (
    <section className="resource-view">
      <div className="resource-heading">
        <div><p className="eyebrow">LIVE DIRECTORY</p><h2>{title}</h2><p>{description}</p></div>
        <strong>{records.length.toString().padStart(2, '0')} records</strong>
      </div>
      {state.loading && <p className="notice">Loading {title.toLowerCase()}...</p>}
      {state.error && <p className="notice error">{state.error}. Is the API running on port 8000?</p>}
      {!state.loading && !state.error && records.length === 0 && <p className="notice">No records yet.</p>}
      {!state.loading && !state.error && records.length > 0 && (
        <div className="table-wrap"><table><thead><tr>{fields.map((field) => <th key={field.key}>{field.label}</th>)}</tr></thead><tbody>
          {records.map((record, index) => <tr key={record._id || index}>{fields.map((field) => <td key={field.key}>{displayValue(record[field.key])}</td>)}</tr>)}
        </tbody></table></div>
      )}
    </section>
  );
}
