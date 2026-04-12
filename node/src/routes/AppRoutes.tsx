import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/Auth/LoginPage";
import ItemList from "../pages/Item/ItemList";
import ItemDetail from "../pages/Item/ItemDetail";
import { PurchasePage } from "../pages/Purchase/PurchasePage";
import { ChangeAddressPage } from "../pages/Purchase/ChangeAddressPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

/** アプリケーションのルーティングを定義するコンポーネント */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* 未ログインユーザーのみアクセス可能 */}
      {/* ログイン画面・会員登録画面・メール認証画面 */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* 全ユーザーがアクセス可能 */}
      {/* 商品一覧・詳細 */}
      <Route path="/items" element={<ItemList />} />
      <Route path="/items/:id" element={<ItemDetail />} />

      


      {/* 認証されたユーザーのみアクセス可能 */}

      {/* 購入画面・住所変更画面 */}
      <Route
        path="/purchase/:itemId"
        element={
          <ProtectedRoute>
            <PurchasePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/purchase/address/:itemId"
        element={
          <ProtectedRoute>
            <ChangeAddressPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<ItemList />} />
    </Routes>
  );
};
