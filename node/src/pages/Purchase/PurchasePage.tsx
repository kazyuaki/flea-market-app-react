import { useParams } from 'react-router-dom'
import { usePurchase } from '../../hooks/usePurchase'
import { PurchaseItemInfo } from '../../components/Purchase/PurchaseItemInfo'
import { PaymentSelect } from '../../components/Purchase/PaymentSelect'
import { AddressSection } from '../../components/Purchase/AddressSection'
import { PurchaseSummary } from '../../components/Purchase/PurchaseSummary'
import { PurchaseButton } from '../../components/Purchase/PurchaseButton'
import { useNavigate } from 'react-router-dom'
import { PurchaseLayout } from '../../components/Layouts/PurchaseLayout'



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

  const navigate = useNavigate()

  const handleChangeAddress = () => {
    if (!itemId) return
    navigate(`/purchase/address/${itemId}`)
  }

  if (loading) return <p>Loading...</p>
  if(error) return <p className="text-red-500">{error}</p>
  if (!item) return null

return (
  <PurchaseLayout
    main={
      <>
        <PurchaseItemInfo item={item} />
        <PaymentSelect
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
        <AddressSection
          address={address}
          onClick={handleChangeAddress}
        />
      </>
    }
    sidebar={
      <>
        <PurchaseSummary
          item={item}
          paymentMethod={paymentMethod}
        />
        <PurchaseButton
          onClick={handlePurchase}
          label="購入する"
        />
      </>
    }
  />
)
}
