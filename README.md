# Horarios — MontessoriFlow

- `backend/` — API Express + Prisma (PostgreSQL). Se despliega en **Render**.
- `frontend/src/` — sitio estático HTML/JS. Se despliega en **Vercel**.

## Desarrollo local

```bash
cd backend
cp .env.example .env   # completar valores
npm install
npx prisma migrate deploy
npm run seed           # opcional, datos iniciales
npm run dev            # http://localhost:3000
```

El frontend se abre con cualquier servidor estático (p. ej. Live Server) en `localhost`;
`script/api.js` detecta `localhost` y llama a `http://localhost:3000`.
Agrega el origen del servidor estático a `CORS_ORIGIN` (admite varios separados por coma).

## Despliegue

### 1. Render (API)
1. New → **Blueprint** → seleccionar este repo (usa `render.yaml`),
   o New → Web Service con Root Directory `backend`,
   Build `npm install && npm run build`, Start `npm start`, Health check `/health`.
2. Variables: `DATABASE_URL`, `CORS_ORIGIN` (URL de Vercel), `JWT_SECRET`,
   `JWT_EXPIRES_IN`, `NODE_ENV=production`.
3. El build corre `prisma migrate deploy`. Para cargar datos iniciales: Shell → `npm run seed`.

### 2. Vercel (frontend)
1. Editar `frontend/src/vercel.json` y reemplazar la URL de Render si cambia (actual: `https://coordinacion-qgoz.onrender.com`).
2. New Project → este repo → Root Directory `frontend/src`, Framework *Other*, sin build.

En producción el frontend llama a `/api/...` y Vercel lo reenvía a Render, así la cookie
de sesión es del mismo dominio y funciona en todos los navegadores (incluido Safari).
