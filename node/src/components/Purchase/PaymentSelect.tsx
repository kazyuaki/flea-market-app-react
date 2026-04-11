/** 支払い方法選択コンポーネント */
export const PaymentSelect = ({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}) => {
  return (
    <>
      {/* 支払い方法 */ }
        <div className="mt-6 border-b border-gray-500 pb-6">
          <h3 className="font-bold mb-3">支払い方法</h3>
          <select
            className="border border-gray-500 px-3 py-2 rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="1">コンビニ支払い</option>
            <option value="2">カード支払い</option>
          </select>
        </div>
    </>
  )
}