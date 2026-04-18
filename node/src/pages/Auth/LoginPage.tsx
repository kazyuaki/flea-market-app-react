import { Link, useNavigate } from "react-router-dom"
import { InputField } from "../../components/Common/InputField"
import { CommonButton } from "../../components/Common/CommonButton"
import { FormLayout } from "../../components/Layouts/FormLayout"
import { FormContainer } from "../../components/Common/FormContainer"
import type { SubmitEvent } from "react"
import { useAuthContext } from "../../context/useAuthContext"
import type { LoginForm } from "../../hooks/useLoginForm"
import { useLoginForm } from "../../hooks/useLoginForm"
import type { Field } from "../../types/form"

export const LoginPage = () => {
  /// ナビゲーション、認証コンテキスト、フォームの状態管理をセットアップ
  const navigate = useNavigate()
  const { fetchUser } = useAuthContext()
  const { form, displayErrors, isSubmitDisabled, handleChange, handleSubmit } =
    useLoginForm()
  
  /* フォームフィールドの定義 */
  const fields: Field<LoginForm>[] = [
    {
      name: "email",
      label: "メールアドレス",
      type: "email",
      placeholder: "example@email.com",
    },
    {
      name: "password",
      label: "パスワード",
      type: "password",
      placeholder: "8文字以上のパスワード",
    },
  ]

  // フォームの送信処理
  const handleSubmitWithRedirect = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const success = await handleSubmit()

    if (success) {
      await fetchUser()
      navigate("/items")
    }
  }

  return (
    <FormLayout title="ログイン">
      <FormContainer>
        <form onSubmit={handleSubmitWithRedirect}>
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              value={form[field.name]}
              error={displayErrors[field.name]?.[0]}
              type={field.type}
              placeholder={field.placeholder}
              onChange={(value) => handleChange(field.name, value)}
            />
          ))}

          <CommonButton type="submit" disabled={isSubmitDisabled}>
            ログイン
          </CommonButton>

          <p className="mt-4 text-center text-sm">
            <Link to="/register" className="text-blue-600 hover:underline">
              会員登録画面へ
            </Link>
          </p>
        </form>
      </FormContainer>
    </FormLayout>
  )
}
