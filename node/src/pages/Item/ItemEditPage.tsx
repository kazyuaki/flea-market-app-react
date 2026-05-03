import { isAxiosError } from "axios"
import type { ChangeEvent, FormEventHandler } from "react"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { CommonButton } from "../../components/Common/CommonButton"
import { FormContainer } from "../../components/Common/FormContainer"
import { FormLayout } from "../../components/Layouts/FormLayout"
import { SellDescriptionSection } from "../../components/Sell/SellDescriptionSection"
import { SellDetailSection } from "../../components/Sell/SellDetailSection"
import { SellImageSection } from "../../components/Sell/SellImageSection"
import { updateItem } from "../../api/itemApi"
import { useAuthContext } from "../../context/useAuthContext"
import { useItemDetail } from "../../hooks/useItemDetail"
import type { Item, ItemForm } from "../../types/item"
import { createInitialTouched } from "../../utils/form/state"
import { normalizeServerErrors } from "../../utils/form/serverErrors"
import { initialForm } from "../../utils/itemFormPersistence"
import { validateItem, type ItemErrors } from "../../utils/validation/item"

const toItemForm = (item: Item): ItemForm => ({
  name: item.name,
  brand: item.brand ?? "",
  color: item.color ?? "",
  description: item.description ?? "",
  price: item.price,
  category_ids: item.categories.map((category) => category.id),
  condition: item.condition,
  images: [],
})

/** 商品編集ページ
 *
 * ・商品の情報を編集できる
 * ・画像の追加はできるが、削除はできない（削除は商品詳細から行う）
 */
export const ItemEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { item, loading, error } = useItemDetail(id)
  const [form, setForm] = useState<ItemForm>(initialForm)
  const [errors, setErrors] = useState<ItemErrors>({})
  const [touched, setTouched] = useState<Record<keyof ItemForm, boolean>>(
    createInitialTouched(),
  )
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  /* 商品データが取得できたらフォームにセットする */
  useEffect(() => {
    if (!item) return

    setForm(toItemForm(item))
    setErrors({})
    setTouched(createInitialTouched())
    setSubmitted(false)
  }, [item])

  const clientErrors = validateItem(form)
  const hasErrors = Object.values(clientErrors).some(
    (value) => value && value.length > 0,
  )

  const getError = (key: keyof ItemForm) => {
    if (errors[key]) return errors[key]
    if (touched[key] || submitted) return clientErrors[key]
    return undefined
  }

  const displayErrors = {
    name: getError("name"),
    brand: getError("brand"),
    color: getError("color"),
    description: getError("description"),
    price: getError("price"),
    category_ids: getError("category_ids"),
    condition: getError("condition"),
    images: getError("images"),
  }

  /* フォームの変更処理 */
  const handleChange = <K extends keyof ItemForm>(
    key: K,
    value: ItemForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setTouched((prev) => ({ ...prev, [key]: true }))

    if (errors[key]) {
      setErrors((prev) => {
        const nextErrors = { ...prev }
        delete nextErrors[key]
        return nextErrors
      })
    }
  }

  /* 画像の変更処理 */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleChange("images", Array.from(e.target.files))
    }
  }

  /* フォームの送信処理 */
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setSubmitted(true)

    if (!id || hasErrors) return

    setSaving(true)
    try {
      const updatedItem = await updateItem(id, form)
      navigate(`/items/${updatedItem.id}`, {
        state: {
          toast: {
            variant: "success",
            message: "商品情報を更新しました",
          },
        },
      })
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 422) {
        setErrors(normalizeServerErrors(error.response.data.errors ?? {}))
      } else {
        alert("商品情報の更新に失敗しました")
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!item) return null
  if (user?.id !== item.user_id) return <Navigate to={`/items/${item.id}`} replace />

  const isWithdrawn = item.status === "withdrawn"

  return (
    <FormLayout
      title={isWithdrawn ? "商品の再出品" : "商品の編集"}
      className="max-w-[1200px]"
    >
      <FormContainer className="max-w-[1200px]">
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-[900px] text-base sm:text-lg"
        >
          <SellImageSection
            images={form.images}
            currentImageUrl={item.image_url}
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

          <CommonButton type="submit" disabled={saving || hasErrors}>
            {saving
              ? isWithdrawn
                ? "再出品中..."
                : "更新中..."
              : isWithdrawn
                ? "編集して再出品する"
                : "更新する"}
          </CommonButton>
        </form>
      </FormContainer>
    </FormLayout>
  )
}
