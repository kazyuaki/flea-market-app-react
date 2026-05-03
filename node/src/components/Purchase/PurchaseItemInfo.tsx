import noimage from "../../assets/noimage.png"
import type { Item } from "../../types/item"

type Props = {
  item: Item
}

/** 商品情報コンポーネント */
export const PurchaseItemInfo = ({ item }: Props) => {
  return (
    <>
      <div className="flex items-center gap-10 border-b border-gray-500 pb-8">
        <img
          src={item.image_url ?? noimage}
          alt=""
          className="h-[240px] w-[240px] object-cover bg-gray-300"
        />
        <div>
          <p className="text-3xl font-bold">{item.name}</p>
          <p className="mt-3 text-3xl font-bold">
            ¥{item.price.toLocaleString()}
          </p>
        </div>
      </div>
    </>
  )
}
