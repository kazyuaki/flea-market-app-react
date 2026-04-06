import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from "../../components/Header/Header"
// import './ItemDetail.css'
import noImage from '../../assets/noimage.png'
import heart from '../../assets/heart.svg'
import bubble from '../../assets/speech-bubble.png'
// import type { Category } from '../../types/category'
import type { Item } from '../../types/item'

export default function ItemDetail() {
  const { id } = useParams()
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [comment, setComment] = useState('')

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

  /** コメントを送信 */
  const handleSubmit = async () => {
    if (!comment.trim()) return

    try {
      const res = await fetch(`/api/items/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment }),
      })

      if (!res.ok) throw new Error()

      const newComment = await res.json()

      setItem(prev => prev && {
        ...prev,
        comments_count: prev.comments_count + 1,
        comments: [...prev.comments, newComment],
      })

      setComment('')
    } catch {
      alert('コメント送信失敗')
    }
  }

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
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <p className="text-gray-500 text-m">{item.brand}</p>

          {/* 価格 */}
          <p className="text-xl mt-4">
            ¥{item.price.toLocaleString()}
            <span className="text-sm ml-1">(税込)</span>
          </p>

          {/* アイコン */}
          <div className="flex gap-6 mt-3 text-gray-500">
            <div className='column items-center'>
              <img src={heart} alt="お気に入り" className="w-5 h-5" />
              <span> {item.favorites_count}</span>
            </div>
            <div>
              <img src={bubble} alt="コメント" className="w-5 h-5" />
              <span>{item.comments_count}</span>
            </div>
          </div>
  
          {/* ボタン */}
          <button className="mt-6 w-full bg-red-500 text-white py-3 rounded">
            購入手続きへ
          </button>

          {/* 商品情報 */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">商品説明</h2>

            <div className="text-sm mt-5 column gap-8">
              <p>カラー：{ item.color}</p>
              <p>{item.description}</p>
            </div>

            <div className="text-sm mt-10 gap-3">
              <h2 className="text-xl font-bold mb-5">商品の情報</h2>
              <div className="flex gap-6">
                <p className='font-bold'>カテゴリー</p>
                <p>{item.categories.map(c => c.name).join(' / ')}</p>
              </div>

              <div className="flex gap-6 mt-5">
                <p className='font-bold'>商品の状態</p>
                <p>{conditionMap[item.condition]}</p>
              </div>
                <p className="mt-10">{item.description}</p>
            </div>
          </div>

          {/* コメント */}
          <div className="mt-8">
            <h2 className="text-xl text-gray-600 font-bold mb-2">
              コメント({item.comments_count})
            </h2>

            {item.comments.map(comment => (
              <div key={comment.id} className="bg-gray-100 p-3 rounded text-sm mb-2">
                
                {/* ユーザー情報 */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  <p className="font-bold">
                    {comment.user.name}
                  </p>
                </div>
            
                {/* コメント本文 */}
                <p className="text-gray-600">
                  {comment.content}
                </p>
            
              </div>
            ))}

            <div className='mt-3'>
              <h2 className="font-bold">商品へのコメント</h2>
              <textarea
                className="w-full border mt-4 p-2 rounded"
                rows={4}
                placeholder="コメントを入力"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!comment.trim()}
              className={`mt-3 w-full py-2 rounded text-white ${comment.trim() ? 'bg-red-500' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              コメントを送信する
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}