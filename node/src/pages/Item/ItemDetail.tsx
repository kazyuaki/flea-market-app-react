import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from "../../components/Layouts/Header/Header"
import ItemInfo from '../../components/Item/ItemInfo.tsx'
import CommentList from '../../components/Item/CommentList'
import CommentForm from '../../components/Item/CommentForm'
import { useItemDetail } from '../../hooks/useItemDetail.ts'
import ItemSummary from '../../components/Item/ItemSummary.tsx'
import ItemImage from '../../components/Item/ItemImage.tsx'
import { postComment } from '../../api/commentApi.ts'

/** 商品詳細画面
 *
 * ・商品情報の表示
 * ・コメントの表示
 * ・コメントの投稿
 */
export default function ItemDetail() {
  /** 状態管理 */
  const { id } = useParams()
  const { item, setItem, loading, error } = useItemDetail(id) 
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  /** コメントを送信 */
  const handleSubmit = async () => {
    if (!comment.trim() || !item) return

    try {
      // APIでコメントを保存
      const newComment = await postComment(id!, comment)
      // ローカルの状態も更新して、即座に反映させる
      setItem({
        ...item,
        comments_count: item.comments_count + 1,
        comments: [...item.comments, newComment],
      })
      // フォームをリセット
      setComment('')
    } catch {
      alert('コメント送信失敗')
    }
  }

  /* 購入手続きへ */
  const handlePurchaseClick = () => {
    if (!id) return
    navigate(`/purchase/${id}`)
  }

  /* ローディング / エラー / 空状態の分岐表示 */
  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!item) return null

  /** 商品が取得できた状態のUI */
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      {/* メインコンテンツ */}
      <div className="max-w-[1000px] mx-auto p-10 flex gap-10">
        
        {/* 左：画像 */}
        <ItemImage src={item.image_url} alt={item.name} />

        {/* 右：情報 */}
        <div className="flex-1">
          {/* 商品概要コンポーネント */}
          <ItemSummary item={item} />

        {/* 購入手続きへ ボタン */}
          <button
            onClick={handlePurchaseClick}
            className="mt-6 w-full bg-red-500 text-white py-3 rounded">
          購入手続きへ
        </button>

          {/* 商品情報 */}
          <ItemInfo item={item} />

          {/* コメント */}
          <div className="mt-8">
            <CommentList
              comments={item.comments}
              count={item.comments_count}
            />
            <CommentForm
              comment={comment}
              setComment={setComment}
              onSubmit={handleSubmit}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
