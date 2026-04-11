import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemList from './pages/Item/ItemList'
import ItemDetail from './pages/Item/ItemDetail'
import { PurchasePage } from './pages/Purchase/PurchasePage'
import { ChangeAddressPage } from './pages/Purchase/ChangeAddressPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/items" element={<ItemList />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/purchase/:itemId" element={<PurchasePage />} />
        <Route path="/purchase/address/:itemId" element={<ChangeAddressPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
