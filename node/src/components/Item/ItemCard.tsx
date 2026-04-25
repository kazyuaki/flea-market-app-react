import { Link } from 'react-router-dom'
import noImage from '../../assets/noimage.png'

type Item = {
  id: number
  name: string
  image_url: string
  status: string
}

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div style={{ width: '200px', position: 'relative' }}>
      <Link to ={`/items/${item.id}`}>
        {/* 画像 */}
        <img
          src={item.image_url || noImage}
          alt={item.name}
          className="w-[180px] h-[180px] object-cover"
        />

        {/* 商品名 */}
        <p>{item.name}</p>

        {/* SOLD */}
        {item.status === 'sold' && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1">
            SOLD
          </div>
        )}
        </Link>
    </div>
  )
}