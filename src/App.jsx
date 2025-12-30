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
import Favorites from './pages/Favorites'
import Admin from './pages/Admin'
import AdminRoute from './components/AdminRoute'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />

        <div className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favorites />} />

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

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />

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
      </div>
    </BrowserRouter>
  )
}

export default App
