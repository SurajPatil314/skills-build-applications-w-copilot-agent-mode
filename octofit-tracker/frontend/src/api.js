const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
export const hasCodespaceApi = Boolean(codespaceName);

function recordsFromPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  for (const key of ['data', 'results', 'items']) {
    const records = recordsFromPayload(payload[key]);
    if (records.length > 0 || Array.isArray(payload[key])) return records;
  }

  return [];
}

export async function fetchResource(resource) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/`);

  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`);
  }

  const payload = await response.json();
  return recordsFromPayload(payload);
}
