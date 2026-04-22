import { CATEGORY_OPTIONS } from "../../constants/category/category"
import { CONDITION_OPTIONS } from "../../constants/condition/item"
import type { ItemForm } from "../../types/item"
import type { ItemErrors } from "../../utils/validation/item"
import { CategorySelect } from "../Common/CategorySelect"
import { FormSection } from "../Common/FormSection"
import { SelectField } from "../Common/SelectField"
import { sellFieldProps } from "./sellFieldProps"

type Props = {
  form: Pick<ItemForm, "category_ids" | "condition">
  displayErrors: Pick<ItemErrors, "category_ids" | "condition">
  handleChange: <K extends keyof ItemForm>(key: K, value: ItemForm[K]) => void
}

/** 商品の詳細を入力するセクションのコンポーネント */
export const SellDetailSection = ({
  form,
  displayErrors,
  handleChange,
}: Props) => (
  <FormSection title="商品の詳細">
    <CategorySelect
      {...sellFieldProps}
      label="カテゴリー"
      value={form.category_ids}
      options={CATEGORY_OPTIONS}
      error={displayErrors.category_ids?.[0]}
      onChange={(value) => handleChange("category_ids", value)}
    />
    <SelectField
      {...sellFieldProps}
      label="商品の状態"
      value={form.condition ?? ""}
      options={CONDITION_OPTIONS}
      placeholder="商品の状態を選択してください"
      error={displayErrors.condition?.[0]}
      onChange={(value) => handleChange("condition", value)}
      className="mb-0"
    />
  </FormSection>
)
