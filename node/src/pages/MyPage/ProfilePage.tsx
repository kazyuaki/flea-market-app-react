import type { ChangeEvent, SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import { FormLayout } from "../../components/Layouts/FormLayout"
import type { Field } from "../../types/form"
import type { ProfileInput } from "../../types/profile"
import { FormContainer } from "../../components/Common/FormContainer"
import { InputField } from "../../components/Common/InputField"
import { CommonButton } from "../../components/Common/CommonButton"
import { useProfileForm } from "../../hooks/useProfileForm"
import { useAuthContext } from "../../context/useAuthContext"



/** プロフィール入力画面 */
export const ProfilePage = () => {
  const navigate = useNavigate()
  const { fetchUser } = useAuthContext()

  /* フォームフィールドの定義 */
  const fields: Field<ProfileInput>[] = [
    {
      name: "name",
      label: "お名前",
      placeholder: "例）山田 太郎",
    },
    {
      name: "postal_code",
      label: "郵便番号",
      placeholder: "例）123-4567",
    },
    {
      name: "address",
      label: "住所",
      placeholder: "例）東京都渋谷区1-2-3",
    },
    {
      name: "building_name",
      label: "建物名",
      placeholder: "例）渋谷ビル 101号室",
      optional: true,
    },
    {
      name: "phone_number",
      label: "電話番号",
      placeholder: "例）090-1234-5678",
    },
  ]

  const {
    form,
    displayErrors,
    loading,
    isSubmitDisabled,
    preview,
    handleChange,
    handleImageChange,
    handleSubmit,
  } = useProfileForm()

  /* 画像入力の変更処理 */
  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e.target.files?.[0] ?? null)
  }

  /* フォームの送信処理 */
  const handleSubmitWithRedirect = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const success = await handleSubmit()

    if (success) {
      await fetchUser()
      navigate("/items")
    }
  }


  return (
    <FormLayout title="プロフィール設定">
      <FormContainer className="max-w-[760px]">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          {preview ? (
            <img
              src={preview}
              alt="プレビュー"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-300" />
          )}

          <label className="cursor-pointer">
            <span className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50">
              画像を選択する
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageInputChange}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleSubmitWithRedirect} className="mx-auto max-w-[520px]">
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.optional ? `${field.label}（任意）` : field.label}
              value={form[field.name] ?? ""}
              error={displayErrors[field.name]?.[0]}
              placeholder={field.placeholder}
              type={field.type}
              className="mx-auto"
              onChange={(value) => handleChange(field.name, value)}
            />
          ))}

          <CommonButton type="submit" disabled={loading || isSubmitDisabled}>
            {loading ? "更新中..." : "更新する"}
          </CommonButton>
        </form>
      </FormContainer>
    </FormLayout>
  )
}
