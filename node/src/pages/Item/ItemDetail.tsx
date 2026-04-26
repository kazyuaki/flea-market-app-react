import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ItemInfo from "../../components/Item/ItemInfo.tsx"
import { useItemDetail } from "../../hooks/useItemDetail.ts"
import ItemSummary from "../../components/Item/ItemSummary.tsx"
import ItemImage from "../../components/Item/ItemImage.tsx"
import { postComment } from "../../api/commentApi.ts"
import ItemDetailLayout from "../../components/Layouts/ItemDetailLayout.tsx"
import { PurchaseButton } from "../../components/Purchase/PurchaseButton.tsx"
import ItemCommentSection from "../../components/Item/Comment/ItemCommentSection.tsx"

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
  const [comment, setComment] = useState("")
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
      setComment("")
    } catch {
      alert("コメント送信失敗")
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

  /**
   * 商品詳細コンポーネント
   * レイアウトコンポーネントに画像と情報を渡す
   * 購入ボタンをクリックすると購入画面へ遷移
   * コメントリストとコメントフォームも表示
   */
  return (
    <>
      <ItemDetailLayout
        /** 左：画像 */
        image={<ItemImage src={item.image_url} alt={item.name} />}
        /** 右：情報 */
        content={
          <>
            <ItemSummary item={item} />
            <PurchaseButton
              onClick={handlePurchaseClick}
              label="購入手続きへ"
            />
            <ItemInfo item={item} />
            <ItemCommentSection
              comments={item.comments}
              count={item.comments_count}
              comment={comment}
              setComment={setComment}
              onSubmit={handleSubmit}
            />
          </>
        }
      ></ItemDetailLayout>
    </>
  )
}
