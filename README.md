# Recipes Frontend

Frontend en React + Vite para consumir la API de recetas con autenticacion y
CRUD completo.

---

## Enlaces de entrega

- Repo: https://github.com/eKs-stack/recipes-frontend
- Deploy (Vercel): https://guardatureceta.com/

## Tecnologias

- React 19
- Vite
- React Router
- Tailwind CSS
- Axios
- SweetAlert2

## Funcionalidades

- Registro e inicio de sesion (token en localStorage)
- Rutas protegidas para crear y editar recetas
- Listado, detalle, creacion, edicion y borrado de recetas
- Gestión de errores y confirmaciones con SweetAlert2

## Levantar local (Frontend + Backend)

### Backend (API)

1. En otra terminal, entra al repo `recipes-backend` (por ejemplo `../recipes-backend`).
2. Instala dependencias:

```bash
npm install
```

3. Crea `.env` en la raiz:

```env
PORT=3000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_jwt
```

4. Inicia la API:

```bash
npm run dev
```

API en `http://localhost:3000`.

### Frontend (este repo)

1. Crea `.env` en la raiz:

```env
VITE_API_URL=http://localhost:3000/api
```

2. Instala y ejecuta:

```bash
npm install
npm run dev
```

App en `http://localhost:5173`.

## Instalacion y ejecucion (solo frontend)

Si ya tienes un backend corriendo o quieres usar el backend remoto:

```bash
npm install
npm run dev
```

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto:

```env
# Backend local
VITE_API_URL=http://localhost:3000/api
```

Si no defines `VITE_API_URL`, el frontend usa por defecto:
`https://recipes-backend-d7dm.onrender.com/api`.

---

## Deploy (Vercel)

1. Importa el repo en Vercel.
2. Configura:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Variables de entorno:
   - `VITE_API_URL=https://<tu-servicio>.onrender.com/api`
4. Despliega. Vercel detecta Vite automaticamente.

---

## Backend en Render

El frontend necesita apuntar al backend desplegado en Render usando `VITE_API_URL`.

## Endpoints usados

- Auth: `POST /api/auth/login`, `POST /api/auth/register`
- Recipes: `GET/POST /api/recipes`,
  `GET/PUT/DELETE /api/recipes/:id`

Las rutas protegidas requieren `Authorization: Bearer <token>`.

## Build

```bash
npm run build
npm run preview
```

## Solucion de problemas

- 400 "Credenciales invalidas": el usuario no existe en el backend o la
  contrasena no coincide. Registra la cuenta en el mismo backend definido por
  `VITE_API_URL`.
- 401 al crear/editar/borrar: verifica que el token exista y sea valido.
