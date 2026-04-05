import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from "../../components/Header/Header"
// import './ItemDetail.css'
import noImage from '../../assets/noimage.png'

// カテゴリーの型定義
type Category = {
  id: number
  name: string
}

// 商品の型定義
type Item = {
  id: number
  name: string
  price: number
  description: string
  image_url: string
  condition: number
  status: string
  favorites_count: number
  comments_count: number
  categories: Category[]
}

export default function ItemDetail() {
  const { id } = useParams()
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
  
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
      
        const res = await fetch(`/api/items/${id}`)
        if (!res.ok) throw new Error()
        
        const data = await res.json()
  
        if (!cancelled) {
          setItem(data.data)
        }
      } catch {
        if (!cancelled) {
          setError('商品情報の取得に失敗しました')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

  fetchData()

  return () => {
    cancelled = true
  }
}, [id])

  if (loading) return <p>Loading...</p>

  if (error) return <p className="text-red-500">{error}</p>

  if (!item) return null

  const conditionMap: Record<number, string> = {
    1: '良好',
    2: '目立った傷や汚れなし',
    3: 'やや傷や汚れあり',
    4: '状態が悪い'
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* メインコンテンツ */}
      <div className="max-w-[1000px] mx-auto p-10 flex gap-10">
        
        {/* 左：画像 */}
        <img
          src={item.image_url || noImage}
          alt={item.name}
          className="w-[400px] h-[400px] object-cover bg-gray-200"
        />

        {/* 右：情報 */}
        <div className="flex-1">

          {/* 商品名 */}
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p className="text-gray-400 text-sm">ブランド名</p>

          {/* 価格 */}
          <p className="text-xl mt-4">
            ¥{item.price.toLocaleString()}
            <span className="text-sm ml-1">(税込)</span>
          </p>

          {/* アイコン */}
          <div className="flex gap-6 mt-3 text-gray-500">
            <span>♡ {item.favorites_count}</span>
            <span>💬 {item.comments_count}</span>
          </div>
  
          {/* ボタン */}
          <button className="mt-6 w-full bg-red-500 text-white py-3 rounded">
            購入手続きへ
          </button>

          {/* 商品情報 */}
          <div className="mt-6">
            <h2 className="font-bold mb-2">商品の情報</h2>

            <div className="text-sm">
              <p>カテゴリー：{item.categories.map(c => c.name).join(' / ')}</p>
              <p>商品の状態：{conditionMap[item.condition]}</p>
            </div>
          </div>

          {/* コメント */}
          <div className="mt-8">
            <h2 className="font-bold mb-2">コメント(1)</h2>

            <div className="bg-gray-200 p-3 rounded text-sm">
              こちらにコメントが入ります。
            </div>

            <textarea
              className="w-full border mt-4 p-2 rounded"
              rows={4}
              placeholder="コメントを入力"
            />

            <button className="mt-3 w-full bg-red-500 text-white py-2 rounded">
              コメントを送信する
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}