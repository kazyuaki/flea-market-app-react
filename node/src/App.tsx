import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemList from './pages/Item/ItemList'
import ItemDetail from './pages/Item/ItemDetail'
import { PurchasePage } from './pages/Purchase/PurchasePage'
import { ChangeAddressPage } from './pages/Purchase/ChangeAddressPage'
import { LoginPage } from './pages/Auth/LoginPage'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/purchase/:itemId" element={<PurchasePage />} />
          <Route path="/purchase/address/:itemId" element={<ChangeAddressPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
