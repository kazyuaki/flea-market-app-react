import ItemCard from "./ItemCard"
import type { Item } from "../../types/item"

type Props = {
  items: Item[]
  loading: boolean
  error: string | null
}

/** 商品一覧のコンテンツ部分を担当するコンポーネント */
export default function ItemListContent({ items, loading, error }: Props) {
  if (loading) return <p className="ml-10">Loading...</p>

  if (error) return <p className="text-red-500">{error}</p>

  if (items.length === 0) {
    return <p className="empty mt-11">商品がありません</p>
  }

  return (
    <div className="items">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}
