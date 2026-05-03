import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ItemInfo from "../../components/Item/ItemInfo.tsx"
import { useItemDetail } from "../../hooks/useItemDetail.ts"
import ItemSummary from "../../components/Item/ItemSummary.tsx"
import ItemImage from "../../components/Item/ItemImage.tsx"
import { postComment, deleteComment } from "../../api/commentApi.ts"
import ItemDetailLayout from "../../components/Layouts/ItemDetailLayout.tsx"
import { PurchaseButton } from "../../components/Purchase/PurchaseButton.tsx"
import ItemCommentSection from "../../components/Item/Comment/ItemCommentSection.tsx"
import { toggleFavorite } from "../../api/favoriteApi.ts"
import { Toast } from "../../components/Common/Toast.tsx"
import { useAuthContext } from "../../context/useAuthContext.ts"
import { SoldBadge } from "../../components/Common/SoldBadge.tsx"
import { CommonButton } from "../../components/Common/CommonButton.tsx"

type ToastVariant = "success" | "error"

type ItemDetailLocationState = {
  toast?: {
    variant?: ToastVariant
    message: string
  }
}

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
  const { user } = useAuthContext()
  const [comment, setComment] = useState("")
  const [showLoginToast, setShowLoginToast] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const toastState = (location.state as ItemDetailLocationState | null)?.toast
  const [toast, setToast] = useState<ItemDetailLocationState["toast"] | null>(
    () => toastState ?? null,
  )

  const isOwner = user && item ? user.id === item.user_id : false

  const isSold = item?.status === "sold"

  /* お気に入りのトグル処理 */
  const handleFavoriteClick = async () => {
    if (!item) return

    if (!user) {
      setShowLoginToast(true)
      return
    }

    const previousItem = { ...item }
    const isAdding = !item.is_favorited

    setItem({
      ...item,
      is_favorited: isAdding,
      favorites_count: isAdding
        ? item.favorites_count + 1
        : item.favorites_count - 1,
    })

    try {
      const result = await toggleFavorite(id!)

      setItem((current) => {
        if (!current) return current

        return {
          ...current,
          is_favorited: result.is_favorited,
          favorites_count: result.favorites_count,
        }
      })
      console.log("お気に入りの更新に成功:", result)
    } catch (error) {
      console.error("お気に入りの更新に失敗:", error)
      setItem(previousItem)
      alert("お気に入りの更新に失敗しました")
    }
  }

  /** コメントを送信 */
  const handleSubmit = async () => {
    if (!comment.trim() || !item) return

    if (!user) {
      setShowLoginToast(true)
      return
    }

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

  /* コメントを削除 */
  const handleDeleteComment = async (commentId: number) => {
    if (!item) return

    try {
      await deleteComment(commentId)

      setItem({
        ...item,
        comments_count: item.comments_count - 1,
        comments: item.comments.filter((c) => c.id !== commentId),
      })
    } catch {
      alert("コメントの削除に失敗しました")
    }
  }

  /* 購入手続きへ */
  const handlePurchaseClick = () => {
    if (!id) return

    if (isOwner) return

    if (!user) {
      setShowLoginToast(true)
      return
    }

    navigate(`/purchase/${id}`)
  }

  const handleEditClick = () => {
    if (!id) return

    navigate(`/items/${id}/edit`)
  }

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

  /** 未ログイン時のトースト表示を自動消去する */
  useEffect(() => {
    if (!showLoginToast) return

    const timeoutId = window.setTimeout(() => {
      setShowLoginToast(false)
    }, 2000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [showLoginToast])

  /** トースト表示を自動消去する */
  useEffect(() => {
    if (!toast) return

    const timeoutId = window.setTimeout(() => {
      setToast(null)
    }, 2000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [toast])

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
      <Toast
        message="ログインしてください"
        isVisible={showLoginToast}
        variant="error"
      />
      <Toast
        message={toast?.message ?? ""}
        isVisible={toast !== null}
        variant={toast?.variant ?? "success"}
      />

      <ItemDetailLayout
        /** 左：画像 */
        image={
          <>
            <ItemImage
              src={item.image_url}
              alt={item.name}
              className={isSold ? "grayscale opacity-50" : ""}
            />
            <SoldBadge isSold={isSold} />
          </>
        }
        /** 右：情報 */
        content={
          <>
            <ItemSummary
              item={item}
              onFavoriteClick={handleFavoriteClick}
              disabled={isOwner || isSold}
            />
            {isOwner && (
              <CommonButton
                type="button"
                onClick={handleEditClick}
                className="mt-10 text-2xl"
              >
                商品情報を編集する
              </CommonButton>
            )}
            <PurchaseButton
              onClick={handlePurchaseClick}
              label="購入手続きへ"
              disabled={isOwner || isSold}
            />
            <ItemInfo item={item} />
            <ItemCommentSection
              comments={item.comments}
              count={item.comments_count}
              comment={comment}
              setComment={setComment}
              onSubmit={handleSubmit}
              onDelete={handleDeleteComment}
            />
          </>
        }
      ></ItemDetailLayout>
    </>
  )
}
