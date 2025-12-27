import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import NewRecipe from './pages/NewRecipe'

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/new">Nueva receta</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewRecipe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
