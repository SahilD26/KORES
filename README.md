# Kores Foundry Console

A single-page dashboard for foundry production gap & root-cause analysis, built with React + Vite + Recharts.

## Develop locally

```bash
npm install      # first time only
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs a single self-contained file to dist/index.html
npm run preview  # preview the production build
```

## Deploy

Connected to Netlify. Every push to the `main` branch triggers an automatic
build (`npm run build`) and deploy. Netlify config lives in `netlify.toml`.
