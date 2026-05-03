type Props = {
  isSold: boolean
}

/** 商品が売り切れの場合に表示するSOLDバッジ */
export const SoldBadge = ({ isSold }: Props) => {
  if (!isSold) return null

  return (
    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1">
      SOLD
    </div>
  )
}
