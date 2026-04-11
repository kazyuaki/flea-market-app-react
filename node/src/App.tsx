import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemList from './pages/Item/ItemList'
import ItemDetail from './pages/Item/ItemDetail'
import { PurchasePage } from './pages/Purchase/PurchasePage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/items" element={<ItemList />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/purchase/:itemId" element={<PurchasePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
