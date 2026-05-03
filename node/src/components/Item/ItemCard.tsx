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

  return (
    <div style={{ width: "200px", position: "relative" }}>
      <Link to={`/items/${item.id}`}>
        {/* 画像 */}
        <img
          src={item.image_url || noImage}
          alt={item.name}
          className={`w-[180px] h-[180px] object-cover ${
            isSold ? "opacity-50" : ""
          }`}
        />

        {/* 商品名 */}
        <p>{item.name}</p>

        {/* SOLD */}
        <SoldBadge isSold={isSold} />
      </Link>
    </div>
  )
}
