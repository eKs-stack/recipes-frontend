# Recipes Frontend

Frontend en React + Vite para consumir la API de recetas con autenticacion y
CRUD completo.

## Tecnologias

- React 19
- Vite
- React Router
- Tailwind CSS
- Axios

## Funcionalidades

- Registro e inicio de sesion (token en localStorage)
- Rutas protegidas para crear y editar recetas
- Listado, detalle, creacion, edicion y borrado de recetas

## Instalacion y ejecucion

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
