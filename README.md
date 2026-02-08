# Recipes Frontend

Frontend en React + Vite para consumir la API de recetas.

## Enlaces

- Repo: [https://github.com/eKs-stack/recipes-frontend](https://github.com/eKs-stack/recipes-frontend)
- Deploy: [https://guardatureceta.com/](https://guardatureceta.com/)

## Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Axios (auth)
- Fetch (recipes)
- SweetAlert2

## Qué hace

- Registro, login y logout.
- Rutas protegidas para usuarios autenticados.
- Ruta de admin para gestion global.
- Listado publico, detalle, crear, editar y borrar recetas.
- Favoritos ligados al usuario en backend.

## Sesion (estado actual)

- Ya no se guarda JWT en `localStorage`.
- El backend guarda la sesion en cookie `httpOnly`.
- El frontend manda credenciales en cada request protegida:
  - `axios` con `withCredentials: true`
  - `fetch` con `credentials: 'include'`

## Arranque local

1. Arranca backend (`recipes-backend`) en `http://localhost:3000`.
2. Crea `/Users/aleks/Desktop/REPOS/PERSONALES/recipes-frontend/.env`.
3. Instala y ejecuta:

```bash
npm install
npm run dev
```

App local: `http://localhost:5173`

## Variables de entorno

```env
VITE_API_URL=http://localhost:3000/api
```

Si no defines `VITE_API_URL`, usa por defecto `https://recipes-backend-gilt.vercel.app/api`.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

## Estructura principal

- `src/main.jsx`: monta `AuthProvider` y `FavoritesProvider`.
- `src/App.jsx`: rutas publicas/protegidas/admin.
- `src/services/auth.jsx`: login/register/me/logout.
- `src/services/recipes.jsx`: CRUD y favoritos.
- `src/context/AuthProvider.jsx`: estado de sesion y refresco de usuario.
- `src/context/FavoritesProvider.jsx`: estado de favoritos por usuario.

## Deploy (Vercel)

1. Importa el repo.
2. Build Command: `npm run build`.
3. Output Directory: `dist`.
4. Variable: `VITE_API_URL=<URL_API>/api`.
5. En backend, agrega tu dominio frontend a `CORS_ORIGINS`.

## Troubleshooting

- Si ves datos de produccion en local: revisa `VITE_API_URL` y reinicia `npm run dev`.
- Si login falla por `401/403`: revisa que el backend este enviando cookie y que el frontend use credenciales.
- Si aparece `429` en auth: espera ventana del rate limit o revisa configuracion de limiter en backend.

