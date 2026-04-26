import type { Item } from '../../types/item'
import { CONDITION_MAP } from '../../constants/condition/item.ts'

type Props = {
  item: Item
}

/** 商品説明と商品の情報を表示するコンポーネント */
export default function ItemInfo({ item }: Props) {
  return (
    <div className="mt-12">
      {/* 商品説明 */}
      <h2 className="text-3xl font-bold mb-2">商品説明</h2>

      <div className="text-xl mt-5 flex flex-col gap-4">
        <p>カラー：{item.color}</p>
        <p>{item.description}</p>
      </div>

      {/* 商品情報 */}
      <div className="text-base mt-16">
        <h2 className="text-3xl font-bold mb-5">商品の情報</h2>

        <div className="flex gap-6 text-xl">
          <p className="font-bold">カテゴリー</p>
          <p>{item.categories.map((c) => c.name).join(" / ")}</p>
        </div>

        <div className="flex gap-6 mt-5 text-xl">
          <p className="font-bold">商品の状態</p>
          <p>{CONDITION_MAP[item.condition]}</p>
        </div>
      </div>
    </div>
  )
}
