import type { ChangeEvent, FormEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import { CommonButton } from "../../components/Common/CommonButton"
import { FormContainer } from "../../components/Common/FormContainer"
import { FormLayout } from "../../components/Layouts/FormLayout"
import { SellDescriptionSection } from "../../components/Sell/SellDescriptionSection"
import { SellDetailSection } from "../../components/Sell/SellDetailSection"
import { SellImageSection } from "../../components/Sell/SellImageSection"
import { useExhibitionForm } from "../../hooks/useExhibitionForm"

/** 商品出品ページのコンポーネント */
export const SellPage = () => {
  const navigate = useNavigate()
  const {
    form,
    displayErrors,
    loading,
    isSubmitDisabled,
    handleChange,
    handleSubmit,
  } = useExhibitionForm()

  // 画像ファイルの変更を処理するハンドラー関数
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleChange("images", Array.from(e.target.files))
    }
  }

  // フォームの送信を処理するハンドラー関数
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const success = await handleSubmit()

    // 出品成功時は商品一覧ページに遷移し、トーストで成功メッセージを表示
    if (success) {
      navigate("/items", {
        state: {
          toast: {
            variant: "success",
            message: "出品に成功しました",
          },
        },
      })
    }
  }

  return (
    <FormLayout title="商品の出品">
      <FormContainer>
        <form
          onSubmit={handleFormSubmit}
          className="mx-auto w-full max-w-[560px]"
        >
          <SellImageSection
            images={form.images}
            error={displayErrors.images?.[0]}
            onChange={handleImageChange}
          />
          <SellDetailSection
            form={form}
            displayErrors={displayErrors}
            handleChange={handleChange}
          />
          <SellDescriptionSection
            form={form}
            displayErrors={displayErrors}
            handleChange={handleChange}
          />

          <CommonButton type="submit" disabled={isSubmitDisabled}>
            {loading ? "出品中..." : "出品する"}
          </CommonButton>
        </form>
      </FormContainer>
    </FormLayout>
  )
}
