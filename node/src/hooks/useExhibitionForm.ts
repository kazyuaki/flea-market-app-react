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

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  /// フォームの値を更新するハンドラー関数
  const handleChange = <K extends keyof ItemForm>(key: K, value: ItemForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  return {
    form,
    setErrors,
    handleChange,
  };
};
