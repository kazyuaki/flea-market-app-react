import type { ChangeEvent } from "react"
import axios from "../../lib/axios"
import { CommonButton } from "../../components/Common/CommonButton"
import { CurrencyInputField } from "../../components/Common/CurrencyInputField"
import { FormContainer } from "../../components/Common/FormContainer"
import { ImageUploadField } from "../../components/Common/ImageUploadField"
import { InputField } from "../../components/Common/InputField"
import { SelectField } from "../../components/Common/SelectField"
import { TextareaField } from "../../components/Common/TextareaField"
import { FormLayout } from "../../components/Layouts/FormLayout"
import { useExhibitionForm } from "../../hooks/useExhibitionForm"
import { CATEGORY_OPTIONS } from "../../constants/category/category"
import { CONDITION_OPTIONS } from "../../constants/condition/item"
import { CategorySelect } from "../../components/Common/CategorySelect"

/** 商品出品ページのコンポーネント */
export const SellPage = () => {
  const { form, handleChange } = useExhibitionForm()
  const fieldLabelClassName = "text-sm font-semibold text-gray-800"

  // 画像ファイルの変更を処理するハンドラー関数
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleChange("images", Array.from(e.target.files))
    }
  }

  // フォームの内容を検証する関数
  const validate = () => {
    const errors: string[] = []
    if (!form.name) errors.push("商品名は必須です")
    if (!form.price) errors.push("価格は必須です")
    if (form.category_ids.length === 0) errors.push("カテゴリーは必須です")
    if (!form.condition) errors.push("商品の状態は必須です")
    return errors
  }

  // フォームの内容をサーバーに送信する関数
  const handleSubmit = async () => {
    const errors = validate()
    if (errors.length > 0) {
      console.log(errors)
      return
    }

    const formData = new FormData()

    formData.append("name", form.name)
    formData.append("brand", form.brand)
    formData.append("description", form.description)
    formData.append("price", form.price.toString())
    form.category_ids.forEach((categoryId) => {
      formData.append("category_ids[]", categoryId.toString())
    })
    if (form.condition !== null) {
      formData.append("condition", form.condition.toString())
    }

    if (form.images.length > 0) {
      form.images.forEach((image) => {
        formData.append("images", image)
      })
    }

    await axios.post("/api/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  return (
    <FormLayout title="商品の出品">
      <FormContainer>
        <div className="mx-auto w-full max-w-[560px]">
          <div className="mb-12">
            <ImageUploadField
              label="商品の画像"
              selectedCount={form.images.length}
              labelClassName={fieldLabelClassName}
              images={form.images}
              className="mb-0"
              onChange={onChange}
            />
          </div>

          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-500">商品の詳細</h2>
              <div className="mt-3 h-[1px] bg-gray-300" />
            </div>
            <CategorySelect
              label="カテゴリー"
              value={form.category_ids}
              options={CATEGORY_OPTIONS}
              labelClassName={fieldLabelClassName}
              onChange={(value) => handleChange("category_ids", value)}
            />
            <SelectField
              label="商品の状態"
              value={form.condition ?? ""}
              options={CONDITION_OPTIONS}
              placeholder="商品の状態を選択してください"
              labelClassName={fieldLabelClassName}
              onChange={(value) => handleChange("condition", value)}
              className="mb-0"
            />
          </div>

          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-500">商品名と説明</h2>
              <div className="mt-3 h-[1px] bg-gray-300" />
            </div>
            <InputField
              label="商品名"
              value={form.name}
              placeholder="例）スニーカー"
              labelClassName={fieldLabelClassName}
              onChange={(value) => handleChange("name", value)}
            />
            <InputField
              label="ブランド"
              value={form.brand}
              placeholder="例）NIKE"
              labelClassName={fieldLabelClassName}
              onChange={(value) => handleChange("brand", value)}
            />
            <TextareaField
              label="商品の説明"
              value={form.description}
              placeholder="商品の状態や特徴を入力してください"
              labelClassName={fieldLabelClassName}
              onChange={(value) => handleChange("description", value)}
            />
            <CurrencyInputField
              label="販売価格"
              value={form.price}
              placeholder="例）3,000"
              labelClassName={fieldLabelClassName}
              onChange={(value) => handleChange("price", value)}
            />
          </div>

          <CommonButton onClick={handleSubmit}>出品する</CommonButton>
        </div>
      </FormContainer>
    </FormLayout>
  )
}
