import noimage from "../../assets/noimage.png"
import type { Item } from "../../types/item"

type Props = {
  item: Item
}

/** 商品情報コンポーネント */
export const PurchaseItemInfo = ({ item }: Props) => {
  return (
    <>
      <div className="flex gap-6 items-center border-b border-gray-500 pb-6">
        <img
          src={item.image_url ?? noimage}
          alt=""
          className="w-[120px] h-[120px] object-cover bg-gray-300"
        />
        <div>
          <p className="text-lg font-bold">{item.name}</p>
          <p className="text-xl font-bold mt-2">
            ¥{item.price.toLocaleString()}
          </p>
        </div>
      </div>
    </>
  )
}