# Presidents API

API REST bilingüe (EN/ES) de presidentes, partidos y países, construida con Fastify, TypeScript y MongoDB (Mongoose). Incluye una web estática (landing, documentación y about) servida desde la raíz.

## Requisitos
- Node.js 18+
- MongoDB (URI de conexión)

## Configuración
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea tu archivo de entorno a partir del ejemplo y configura las variables:
   ```bash
   cp .env.example .env
   ```
   Variables:
   - `MONGODB_URI`: cadena de conexión a MongoDB
   - `PORT`: puerto del servidor (por defecto `3000`)
   - `NODE_ENV`: `development` | `production`

> No versionar `.env` ni credenciales. En Vercel, define `MONGODB_URI` en Environment Variables.

## Scripts
- `npm run dev` — servidor en desarrollo (watch)
- `npm run build` — compila a `dist/`
- `npm start` — ejecuta `dist/server.js`
- `npm run import` — importa datos desde `data/` a MongoDB
- `npm run typecheck` / `npm run lint` — verificación de tipos
- `npm test` — pruebas (Vitest + MongoDB en memoria)

## Endpoints principales
Base API: `/api/v1/:lang` (`lang`: `en` | `es`)

- `GET /health` — estado del servicio y BD
- `GET /api/v1/:lang/countries` — lista países
- `GET /api/v1/:lang/countries/:isoCode` — detalle país
- `GET /api/v1/:lang/countries/:isoCode/presidents` — presidentes por país
- `GET /api/v1/:lang/parties?country=PE` — lista partidos
- `GET /api/v1/:lang/parties/:code?country=PE` — detalle partido
- `GET /api/v1/:lang/presidents` — lista presidentes (filtros: `country`, `party`, `from`, `to`, `page`, `limit`)
- `GET /api/v1/:lang/presidents/:slug` — detalle presidente

## Web
- `/` — landing
- `/docs` — documentación
- `/about` — acerca de

## Despliegue en Vercel
El proyecto incluye `api/index.js` (handler serverless que reutiliza `buildApp()`), `vercel.json` (build/rewrites) y caché de conexión MongoDB para entornos serverless. Configura `MONGODB_URI` en las variables de entorno del proyecto en Vercel y despliega desde el repositorio.
