# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, Bootstrap, and `react-router-dom`.

## Configuration

Define `VITE_CODESPACE_NAME` before starting Vite. Create `frontend/.env.local` with the Codespaces name:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then requests resources from `https://<codespace>-8000.app.github.dev/api/<component>/`. When the variable is unset, requests safely fall back to `http://localhost:8000` so the app never creates an `https://undefined-8000...` URL.

## Run

From the repository root:

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
 
 
