import { Link } from "react-router-dom"
import noImage from "../../assets/noimage.png"
import { SoldBadge } from "../Common/SoldBadge"

type Item = {
  id: number
  name: string
  image_url: string
  status: string
}

export default function ItemCard({ item }: { item: Item }) {
  const isSold = item.status === "sold"
  const isWithdrawn = item.status === "withdrawn"
  const isUnavailable = isSold || isWithdrawn

  return (
    <div className="item-card">
      <Link to={`/items/${item.id}`} className="item-card-link">
        {/* 画像 */}
        <img
          src={item.image_url || noImage}
          alt={item.name}
          className={`item-card-image ${isUnavailable ? "opacity-50" : ""}`}
        />

        {/* 商品名 */}
        <p className="item-card-name">{item.name}</p>

        {/* SOLD */}
        <SoldBadge isSold={isSold} />
        {isWithdrawn && (
          <div className="absolute top-0 left-0 bg-gray-700 text-white text-xs px-2 py-1">
            取り下げ済み
          </div>
        )}
      </Link>
    </div>
  )
}
