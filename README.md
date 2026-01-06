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
- Fetch (API nativa)
- SweetAlert2

## Funcionalidades

- Registro e inicio de sesion (token en localStorage)
- Rutas protegidas para crear y editar recetas
- Listado, detalle, creacion, edicion y borrado de recetas
- Gestión de errores y confirmaciones con SweetAlert2

## Levantar local (Frontend)

1. Asegura que el backend este corriendo (ver https://github.com/eKs-stack/recipes-backend).
2. Crea `.env` en la raiz (ver "Variables de entorno").
3. Instala y ejecuta:

```bash
npm install
npm run dev
```

App en `http://localhost:5173`.

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto:

```env
# Backend local
VITE_API_URL=http://localhost:3000/api
```

Si no defines `VITE_API_URL`, el frontend usa por defecto:
`https://recipes-backend-gilt.vercel.app/api`.

---

## Deploy (Vercel)

1. Importa el repo en Vercel.
2. Configura:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Variables de entorno:
   - `VITE_API_URL=https://recipes-backend-gilt.vercel.app/api`
4. Despliega. Vercel detecta Vite automaticamente.

---

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
