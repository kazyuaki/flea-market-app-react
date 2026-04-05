import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from "../components/Header"
import './ItemList.css'
import ItemCard from '../components/ItemCard'

// 商品の型定義
type Item = {
  id: number
  name: string
  brand: string
  price: number
  description: string
  image_url: string
  condition: string
  status: string
}

export default function ItemList() {
  // 状態管理
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // タブの状態をURLクエリから取得
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') === 'mylist' ? 'mylist' : 'recommend'

  // 商品データの取得
  useEffect(() => {
    setLoading(true)
    setError(null)

    let cancelled = false

    const loadItems = async () => {
      try {
        const res = await fetch(`/api/items?tab=${activeTab}`)
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        const data = await res.json()
        if (!cancelled) {
          setItems(data.data)
        }
      } catch {
        if (!cancelled) {
          setError('取得失敗')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadItems()

    return () => {
      cancelled = true
    }
  }, [activeTab])
  
  return (
    <div className="page">
      <Header />

      <div className="container">

        <div className="tabs">
          <Link
            to="/items"
            className={`tab ${activeTab === 'recommend' ? 'active-recommend' : ''}`}
          >
            おすすめ
          </Link>

          <Link
            to="/items?tab=mylist"
            className={`tab ${activeTab === 'mylist' ? 'active-mylist' : ''}`}
          >
            マイリスト
          </Link>
        </div>

        <div className="items">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : items.length > 0 ? (
            items.map(item => (
              <ItemCard key={item.id} item={item} />
            ))
          ) : (
            <p className="empty">商品がありません</p>
          )}
        </div>
        
      </div>
    </div>
  )
}