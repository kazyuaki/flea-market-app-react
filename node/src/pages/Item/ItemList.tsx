import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Toast } from "../../components/Common/Toast"
import "./ItemList.css"
import { useItemList } from "../../hooks/useItemList"
import ItemTabs from "../../components/Item/ItemTabs"
import ItemListContent from "../../components/Item/ItemListContent"
import { NormalLayout } from "../../components/Layouts/NormalLayout"

type ItemTab = "recommend" | "mylist"
type ToastVariant = "success" | "error"

type ItemListLocationState = {
  toast?: {
    variant?: ToastVariant
    message: string
  }
}

/** 商品一覧ページのコンポーネント */
export default function ItemList() {
  /** 1. ルーティング・パラメータ管理 */
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  /** 2. タブ状態の管理 */
  const tab = searchParams.get("tab")
  const activeTab: ItemTab = tab === "mylist" ? "mylist" : "recommend"

  /** 3. トースト通知の状態管理 */
  const toastState = (location.state as ItemListLocationState | null)?.toast
  const [toast, setToast] = useState<ItemListLocationState["toast"] | null>(
    () => toastState ?? null,
  )

  /** 4. データ取得（API連携） */
  const { items, loading, error } = useItemList(activeTab)

  /** タブ切り替え時にURLクエリを更新する */
  useEffect(() => {
    if (!toastState?.message) return

    navigate(
      {
        pathname: location.pathname,
        search: location.search,
      },
      {
        replace: true,
        state: null,
      },
    )
  }, [location.pathname, location.search, navigate, toastState])

  /** トースト表示の自動消去 */
  useEffect(() => {
    if (!toast) return

    const timeoutId = window.setTimeout(() => {
      setToast(null)
    }, 2000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [toast])

  return (
    <>
      {/* メインコンテンツ */}
      <NormalLayout showMyPageHeader={true}>
        {/* トースト通知 */}
        <Toast
          message={toast?.message ?? ""}
          isVisible={toast !== null}
          variant={toast?.variant ?? "success"}
        />

        {/* タブ切り替え */}
        <ItemTabs activeTab={activeTab} />

        {/* 商品一覧 */}
        <ItemListContent items={items} loading={loading} error={error} />
      </NormalLayout>
    </>
  )
}
