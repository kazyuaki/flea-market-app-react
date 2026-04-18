import axios from "../../lib/axios"
import { FormLayout } from "../../components/Layouts/FormLayout"
import { CommonButton } from "../../components/Common/CommonButton"

const mailhogUrl = import.meta.env.VITE_MAILHOG_URL ?? "http://localhost:8025"

export const VerifyPage = () => {
  const openMailhog = () => {
    window.open(mailhogUrl, "_blank", "noopener,noreferrer")
  }

  const handleResend = async () => {
    try {
      await axios.post("/email/verification-notification")
      alert("認証メールを再送しました。")
    } catch {
      alert("認証メールの再送に失敗しました。")
    }
  }

  return (
    <FormLayout title="">
      <div className="flex flex-col items-center justify-center text-center space-y-6 mt-20">
        <p className="text-lg font-bold">
          登録していただいたメールアドレスに認証メールを送付しました。
          <br />
          メール認証を完了してください。
        </p>

        <CommonButton
          onClick={openMailhog}
          variant="secondary"
          className="px-6 py-2 w-64"
        >
          認証はこちらから
        </CommonButton>

        <button
          onClick={handleResend}
          className="text-blue-600 hover:underline text-sm"
        >
          認証メールを再送する
        </button>
      </div>
    </FormLayout>
  )
}
