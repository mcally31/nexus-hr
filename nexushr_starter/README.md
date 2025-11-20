# Nexus HR

Full-stack HR operations demo built with React 19, Vite, Tailwind CSS, Express, and Prisma. The project includes authentication, leave management, expenses, documents, directory search, and an AI assistant stub.

## Monorepo layout
- `client/`: React + Vite frontend
- `server/`: Express + Prisma backend

## Getting started
1. Install dependencies from the repo root:
   ```bash
   npm install
   ```
2. Environment variables:
   - Create `server/.env` with `DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, and `CLIENT_ORIGIN`.
3. Database:
   ```bash
   cd server
   npx prisma migrate dev --name init
   ```
4. Run dev servers:
   ```bash
   cd server && npm run dev
   cd client && npm run dev
   ```

The backend exposes REST endpoints under `/api/*` while the frontend consumes them with Axios.
