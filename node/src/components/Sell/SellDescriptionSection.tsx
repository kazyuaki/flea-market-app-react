import { CurrencyInputField } from "../Common/CurrencyInputField"
import { FormSection } from "../Common/FormSection"
import { InputField } from "../Common/InputField"
import { TextareaField } from "../Common/TextareaField"
import { sellFieldProps } from "./sellFieldProps"
import type { ItemForm } from "../../types/item"
import type { ItemErrors } from "../../utils/validation/item"

type Props = {
  form: Pick<ItemForm, "name" | "brand" | "description" | "price">
  displayErrors: Pick<ItemErrors, "name" | "brand" | "description" | "price">
  handleChange: <K extends keyof ItemForm>(key: K, value: ItemForm[K]) => void
}

/** 商品名と説明を入力するセクションのコンポーネント */
export const SellDescriptionSection = ({
  form,
  displayErrors,
  handleChange,
}: Props) => (
  <FormSection title="商品名と説明">
    <InputField
      {...sellFieldProps}
      label="商品名"
      value={form.name}
      placeholder="例）スニーカー"
      error={displayErrors.name?.[0]}
      onChange={(value) => handleChange("name", value)}
    />
    <InputField
      {...sellFieldProps}
      label="ブランド"
      value={form.brand}
      placeholder="例）NIKE"
      error={displayErrors.brand?.[0]}
      onChange={(value) => handleChange("brand", value)}
    />
    <TextareaField
      {...sellFieldProps}
      label="商品の説明"
      value={form.description}
      placeholder="商品の状態や特徴を入力してください"
      error={displayErrors.description?.[0]}
      onChange={(value) => handleChange("description", value)}
    />
    <CurrencyInputField
      {...sellFieldProps}
      label="販売価格"
      value={form.price}
      placeholder="例）3,000"
      error={displayErrors.price?.[0]}
      onChange={(value) => handleChange("price", value)}
    />
  </FormSection>
)
