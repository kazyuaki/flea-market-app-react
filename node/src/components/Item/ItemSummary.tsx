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
      <h1 className="text-4xl font-bold">{item.name}</h1>
      <p className="text-xl text-gray-500 ml-2">{item.brand}</p>

      {/* 価格 */}
      <p className="text-3xl mt-8">
        ¥{item.price.toLocaleString()}
        <span className="text-xl ml-1">(税込)</span>
      </p>

      {/* アイコン */}
      <div className="flex gap-6 mt-8 text-2xl text-gray-500">
        <div className="flex flex-col items-center">
          <img src={heart} alt="お気に入り" className="w-12 h-12" />
          <span>{item.favorites_count}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={bubble} alt="コメント" className="w-11 h-11" />
          <span>{item.comments_count}</span>
        </div>
      </div>
    </>
  )
}