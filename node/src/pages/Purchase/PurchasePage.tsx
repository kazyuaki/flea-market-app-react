import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePurchase } from '../../hooks/usePurchase'
import { PurchaseItemInfo } from '../../components/Purchase/PurchaseItemInfo'
import { PaymentSelect } from '../../components/Purchase/PaymentSelect'
import { AddressSection } from '../../components/Purchase/AddressSection'
import { PurchaseSummary } from '../../components/Purchase/PurchaseSummary'
import { PurchaseButton } from '../../components/Purchase/PurchaseButton'
import { useNavigate } from 'react-router-dom'
import { PurchaseLayout } from '../../components/Layouts/PurchaseLayout'
import { ConfirmDialog } from '../../components/Common/ConfirmDialog'



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
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  // カスタムフックから必要な状態と関数を取得
  const { item, address, loading, error, handlePurchase, paymentMethod, setPaymentMethod } = usePurchase(itemId)

  const navigate = useNavigate()

  const handleChangeAddress = () => {
    if (!itemId) return
    navigate(`/purchase/address/${itemId}`)
  }

  const handlePurchaseClick = () => {
    setIsPurchaseDialogOpen(true)
  }

  const handleConfirmPurchase = async () => {
    if (isPurchasing) return

    setIsPurchasing(true)

    try {
      await handlePurchase()
      setIsPurchaseDialogOpen(false)
    } finally {
      setIsPurchasing(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if(error) return <p className="text-red-500">{error}</p>
  if (!item) return null

return (
  <>
    <ConfirmDialog
      isOpen={isPurchaseDialogOpen}
      title="この商品を購入しますか？"
      message={`商品代金 ¥${item.price.toLocaleString()} の購入手続きに進みます。`}
      confirmLabel="購入する"
      onConfirm={handleConfirmPurchase}
      onCancel={() => setIsPurchaseDialogOpen(false)}
      isProcessing={isPurchasing}
      variant="danger"
    />
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
            onClick={handlePurchaseClick}
            label="購入する"
          />
        </>
      }
    />
  </>
)
}
