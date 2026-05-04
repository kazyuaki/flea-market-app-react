import type { ChangeEvent, SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import { FormLayout } from "../../components/Layouts/FormLayout"
import { FormContainer } from "../../components/Common/FormContainer"
import { CommonButton } from "../../components/Common/CommonButton"
import { useProfileForm } from "../../hooks/useProfileForm"
import { useAuthContext } from "../../context/useAuthContext"
import { ProfileImageUpload } from "../../components/MyPage/ProfileImageUpload"
import { ProfileFormFields } from "../../components/MyPage/ProfileFormFields"
import { Toast } from "../../components/Common/Toast"

/** プロフィール入力画面 */
export const ProfilePage = () => {
  const navigate = useNavigate()
  const { fetchUser } = useAuthContext()

  const {
    form,
    displayErrors,
    loading,
    isSubmitDisabled,
    toast,
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
      navigate("/items", {
        state: {
          toast: {
            message: "プロフィールを更新しました",
            variant: "success",
          },
        },
      })
    }
  }

  return (
    <FormLayout title="プロフィール設定" className="max-w-[1100px]">
      <Toast
        message={toast?.message ?? ""}
        isVisible={toast !== null}
        variant={toast?.variant ?? "error"}
      />
      <FormContainer className="max-w-[1100px]">
        <ProfileImageUpload
          preview={preview}
          onChange={handleImageInputChange}
        />

        <form
          onSubmit={handleSubmitWithRedirect}
          className="mx-auto w-full max-w-[820px]"
        >
          <ProfileFormFields
            form={form}
            displayErrors={displayErrors}
            onChange={handleChange}
          />

          <CommonButton type="submit" disabled={loading || isSubmitDisabled}>
            {loading ? "更新中..." : "更新する"}
          </CommonButton>
        </form>
      </FormContainer>
    </FormLayout>
  )
}
