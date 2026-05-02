import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { completeCheckout } from "../../api/purchaseApi"
import { FormLayout } from "../../components/Layouts/FormLayout"

export const PurchaseSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (!sessionId) {
      return
    }

    const completePurchase = async () => {
      try {
        await completeCheckout(sessionId)
        navigate("/mypage?tab=purchased", { replace: true })
      } catch (error) {
        console.error(error)
      }
    }

    void completePurchase()
  }, [navigate, sessionId])

  return (
    <FormLayout title="購入完了">
      <p className="text-center text-lg font-bold">
        {sessionId
          ? "購入情報を確認しています..."
          : "決済情報を確認できませんでした。"}
      </p>
    </FormLayout>
  )
}
