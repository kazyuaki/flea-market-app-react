import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemList from './pages/ItemList'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/items" element={<ItemList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
