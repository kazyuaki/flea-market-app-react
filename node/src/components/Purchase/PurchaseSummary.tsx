export const PurchaseSummary = ({
  item,
  paymentMethod,
}: {
  item: {
    price: number
  }
  paymentMethod: string
}) => {
  return (
    <>
      {/* サマリーカード */}
      <div className="mt-5 border border-gray-500 bg-white p-8 text-lg xl:text-xl">
        <div className="flex justify-between gap-4 border-b border-gray-500 pb-4">
          <span className="text-lg text-gray-600">商品代金</span>
          <span className="text-2xl font-bold">
            ¥{item.price.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between gap-4 pt-4">
          <span className="text-lg text-gray-600">支払い方法</span>
          <span className="text-xl font-semibold">
            {paymentMethod === "1" && "コンビニ"}
            {paymentMethod === "2" && "カード"}
          </span>
        </div>
      </div>
    </>
  )
}
