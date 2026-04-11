import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import { usePurchase } from '../../hooks/usePurchase'
import { PurchaseItemInfo } from '../../components/Purchase/PurchaseItemInfo'
import { PaymentSelect } from '../../components/Purchase/PaymentSelect'
import { AddressSection } from '../../components/Purchase/AddressSection'
import { PurchaseSummary } from '../../components/Purchase/PurchaseSummary'
import { PurchaseButton } from '../../components/Purchase/PurchaseButton'



/** 購入画面
 *
 * ・商品情報の表示
 * ・支払い方法の選択
 * ・配送先の表示
 * ・購入サマリーの表示
 * ・購入処理
 */
export const PurchasePage = () => {
  // URLパラメータから商品IDを取得
  const { itemId } = useParams()
  // カスタムフックから必要な状態と関数を取得
  const { item, address, loading, error, handlePurchase, paymentMethod, setPaymentMethod } = usePurchase(itemId)

  if (loading) return <p>Loading...</p>
  if(error) return <p className="text-red-500">{error}</p>
  if (!item) return null

return (
  <>
    <Header />
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-[1000px] mx-auto flex gap-10">
        {/* 左エリア */}
        <div className="flex-1">
          {/* 商品情報 */}
          <PurchaseItemInfo item={item} />
          {/* 支払い方法 */}
          <PaymentSelect
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          {/* 配送先 */}
          <AddressSection address={address} />
        </div>

        {/* 右エリア */}
        <div className="w-[300px]">
          {/* 購入サマリー */}
          <PurchaseSummary
            item={item}
            paymentMethod={paymentMethod}
          />
          {/* 購入ボタン */}
          <PurchaseButton
            onClick={handlePurchase}
          />
        </div>
      </div>
    </div>
  </>
)
}