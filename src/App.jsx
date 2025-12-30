import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewRecipe from './pages/NewRecipe'
import RecipeDetail from './pages/RecipeDetail'
import Header from './components/Header'
import EditRecipe from './pages/EditRecipe'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import MyRecipes from './pages/MyRecipes'

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full mx-auto p-4">
        <Header />
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />

          {/* 🔐 ruta protegida */}
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <NewRecipe />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mis-recetas"
            element={
              <ProtectedRoute>
                <MyRecipes />
              </ProtectedRoute>
            }
          />

          <Route path="/recipes/:id" element={<RecipeDetail />} />

          {/* (opcional) también deberías proteger editar */}
          <Route
            path="/recipes/:id/edit"
            element={
              <ProtectedRoute>
                <EditRecipe />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
