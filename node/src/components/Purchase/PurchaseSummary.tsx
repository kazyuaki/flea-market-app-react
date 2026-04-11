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
      {/* サマリーカード */ }
      <div className="border border-gray-500 bg-white p-8 mt-5">
        <div className="flex justify-between border-b border-gray-500 pb-3">
          <span>商品代金</span>
          <span>¥{item.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between pt-3">
          <span>支払い方法</span>
          <span>
            {paymentMethod === '1' && 'コンビニ'}
            {paymentMethod === '2' && 'カード'}
          </span>
        </div>
      </div>
    </>
  )
}
