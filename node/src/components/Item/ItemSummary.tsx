import type { Item } from '../../types/item'
import heart from '../../assets/heart.svg'
import bubble from '../../assets/speech-bubble.png'

type Props = {
  item: Item
}

/** 商品の概要を表示するコンポーネント */
export default function ItemSummary({ item }: Props) {
  return (
    <>
      {/* 商品名 */}
      <h1 className="text-3xl font-bold">{item.name}</h1>
      <p className="text-gray-500">{item.brand}</p>

      {/* 価格 */}
      <p className="text-xl mt-4">
        ¥{item.price.toLocaleString()}
        <span className="text-sm ml-1">(税込)</span>
      </p>

      {/* アイコン */}
      <div className="flex gap-6 mt-3 text-gray-500">
        <div className="flex flex-col items-center">
          <img src={heart} alt="お気に入り" className="w-5 h-5" />
          <span>{item.favorites_count}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={bubble} alt="コメント" className="w-5 h-5" />
          <span>{item.comments_count}</span>
        </div>
      </div>

    </>
  )
}