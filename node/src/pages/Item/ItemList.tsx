import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Toast } from "../../components/Common/Toast"
import Header from "../../components/Layouts/Header/Header"
import './ItemList.css'
import { useItemList } from '../../hooks/useItemList'
import ItemTabs from '../../components/Item/ItemTabs'
import ItemListContent from '../../components/Item/ItemListContent'

type ItemTab = 'recommend' | 'mylist'
type ToastVariant = "success" | "error"

type ItemListLocationState = {
  toast?: {
    variant?: ToastVariant
    message: string
  }
}

/** 商品一覧ページのコンポーネント */
export default function ItemList() {
  /** タブの状態をURLクエリから取得 */
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const tab = searchParams.get('tab')
  const activeTab: ItemTab = tab === 'mylist' ? 'mylist' : 'recommend'
  const toastState = (location.state as ItemListLocationState | null)?.toast
  const [toast, setToast] = useState<ItemListLocationState["toast"] | null>(
    () => toastState ?? null,
  )
  
  /** 状態管理 */ 
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
    <div className="page">
      <Header />
      <Toast
        message={toast?.message ?? ""}
        isVisible={toast !== null}
        variant={toast?.variant ?? "success"}
      />
      { /* メインコンテンツ */ }
      <div className="container">
       {/* タブ切り替え */ }
       <ItemTabs activeTab={activeTab} />
        {/* 商品一覧 */ }
        <div className="items">
          <ItemListContent
            items={items}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}
