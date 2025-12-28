import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import NewRecipe from './pages/NewRecipe'
import RecipeDetail from './pages/RecipeDetail'
import Header from './components/Header'
import EditRecipe from './pages/EditRecipe'

const App = () => {
  return (
    <BrowserRouter>
      <div className="max-w-3xl mx-auto p-4">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
