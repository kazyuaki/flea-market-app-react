import { useState } from "react";
import type { ItemForm } from "../types/item";


/** 商品出品フォームの状態管理を行うカスタムフック */
export const useExhibitionForm = () => {
  const [form, setForm] = useState<ItemForm>({
    name: "",
    brand: "",
    description: "",
    price: "",
    category_ids: [],
    condition: null,
    images: [],
  });

  /// フォームの値を更新するハンドラー関数
  const handleChange = <K extends keyof ItemForm>(key: K, value: ItemForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return {
    form,
    handleChange,
  };
};
