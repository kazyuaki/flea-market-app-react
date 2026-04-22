import type { ItemForm } from "../types/item";

/// 商品出品フォームの状態をローカルストレージに永続化するためのユーティリティ関数と定数
export const initialForm: ItemForm = {
  name: "",
  brand: "",
  description: "",
  price: "",
  category_ids: [],
  condition: null,
  images: [],
};

// ローカルストレージに保存する際のキー
export const hydrate = (
  parsed: Record<string, unknown>,
  initialValue: ItemForm,
): ItemForm => ({
  name: typeof parsed.name === "string" ? parsed.name : initialValue.name,
  brand: typeof parsed.brand === "string" ? parsed.brand : initialValue.brand,
  description:
    typeof parsed.description === "string"
      ? parsed.description
      : initialValue.description,
  price:
    parsed.price === "" || typeof parsed.price === "number"
      ? parsed.price
      : initialValue.price,
  category_ids: Array.isArray(parsed.category_ids)
    ? parsed.category_ids.filter((value): value is number => typeof value === "number")
    : initialValue.category_ids,
  condition:
    parsed.condition === null || typeof parsed.condition === "number"
      ? parsed.condition
      : initialValue.condition,
  images: [],
});

// ローカルストレージに保存する際のシリアライズ関数
export const serialize = (draftForm: ItemForm) => ({
  name: draftForm.name,
  brand: draftForm.brand,
  description: draftForm.description,
  price: draftForm.price,
  category_ids: draftForm.category_ids,
  condition: draftForm.condition,
});
