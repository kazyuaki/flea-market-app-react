import { isAxiosError } from "axios";
import { useState } from "react";
import type { ItemForm } from "../types/item";
import axios from "../lib/axios";
import { validateItem, type ItemErrors } from "../utils/validation/item";
import { usePersistentForm } from "./usePersistentForm";

const STORAGE_KEY = "sell-form";

const initialForm: ItemForm = {
  name: "",
  brand: "",
  description: "",
  price: "",
  category_ids: [],
  condition: null,
  images: [],
};

/** 商品出品フォームの状態管理を行うカスタムフック */
export const useExhibitionForm = () => {
  // usePersistentForm フックを利用してフォームの状態を管理
  const { form, setForm, clearStoredForm } = usePersistentForm(
    STORAGE_KEY,
    initialForm,
    {
      hydrate: (parsed, initialValue) => ({
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
      }),
      serialize: (draftForm) => ({
        name: draftForm.name,
        brand: draftForm.brand,
        description: draftForm.description,
        price: draftForm.price,
        category_ids: draftForm.category_ids,
        condition: draftForm.condition,
      }),
    },
  );

  // クライアント側のバリデーションエラーとサーバーからのエラーを管理する状態
  const [errors, setErrors] = useState<ItemErrors>({});
  // フォームの各フィールドがユーザーによって触れられたかどうかを管理する状態
  const [touched, setTouched] = useState<Record<keyof ItemForm, boolean>>({
    name: false,
    brand: false,
    description: false,
    price: false,
    category_ids: false,
    condition: false,
    images: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const clientErrors = validateItem(form);

  const getError = (key: keyof ItemForm) => {
    if (errors[key]) return errors[key];
    if (touched[key] || submitted) return clientErrors[key];
    return undefined;
  };

  const displayErrors = {
    name: getError("name"),
    brand: getError("brand"),
    description: getError("description"),
    price: getError("price"),
    category_ids: getError("category_ids"),
    condition: getError("condition"),
    images: getError("images"),
  };

  const hasErrors = Object.values(clientErrors).some(
    (value) => value && value.length > 0,
  );
  const isSubmitDisabled = loading || hasErrors;

  /// フォームの値を更新するハンドラー関数
  const handleChange = <K extends keyof ItemForm>(key: K, value: ItemForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  // サーバーからのエラーをクライアント側のエラー形式に変換する関数
  const normalizeServerErrors = (serverErrors: Record<string, string[]>) => {
    const nextErrors: ItemErrors = {};

    Object.entries(serverErrors).forEach(([key, messages]) => {
      if (key.startsWith("category_ids")) {
        nextErrors.category_ids = [
          ...(nextErrors.category_ids ?? []),
          ...messages,
        ];
        return;
      }

      if (key.startsWith("images")) {
        nextErrors.images = [
          ...(nextErrors.images ?? []),
          ...messages,
        ];
        return;
      }

      if (
        key === "name" ||
        key === "brand" ||
        key === "description" ||
        key === "price" ||
        key === "condition"
      ) {
        nextErrors[key] = messages;
      }
    });

    return nextErrors;
  };

  // フォームの送信を処理するハンドラー関数
  const handleSubmit = async () => {
    setSubmitted(true);

    if (hasErrors) {
      return false;
    }

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("brand", form.brand);
    formData.append("description", form.description);
    formData.append("price", form.price.toString());
    form.category_ids.forEach((categoryId) => {
      formData.append("category_ids[]", categoryId.toString());
    });

    if (form.condition !== null) {
      formData.append("condition", form.condition.toString());
    }

    form.images.forEach((image) => {
      formData.append("images[]", image);
    });

    setLoading(true);

    try {
      await axios.post("/api/items", formData);
      resetForm();
      return true;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          setErrors(normalizeServerErrors(error.response.data.errors ?? {}));
        } else {
          alert("商品の出品に失敗しました");
        }
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  // フォームを初期状態にリセットする関数
  const resetForm = () => {
    setForm(initialForm);
    clearStoredForm();
    setErrors({});
    setSubmitted(false);
    setTouched({
      name: false,
      brand: false,
      description: false,
      price: false,
      category_ids: false,
      condition: false,
      images: false,
    });
  };

  return {
    form,
    displayErrors,
    loading,
    isSubmitDisabled,
    handleChange,
    handleSubmit,
  };
};
