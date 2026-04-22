import { isAxiosError } from "axios";
import { useState } from "react";
import type { ItemForm } from "../types/item";
import axios from "../lib/axios";
import { validateItem, type ItemErrors } from "../utils/validation/item";
import { usePersistentForm } from "./usePersistentForm";
import { serialize, initialForm, hydrate } from "../utils/itemFormPersistence";
import { normalizeServerErrors } from "../utils/form/serverErrors";
import { buildFormData } from "../utils/form/formData";
import { createInitialTouched } from "../utils/form/state";

const STORAGE_KEY = "sell-form";

/** 商品出品フォームの状態管理を行うカスタムフック */
export const useExhibitionForm = () => {
  // usePersistentForm フックを利用してフォームの状態を管理
  const { form, setForm, clearStoredForm } = usePersistentForm(
    STORAGE_KEY,
    initialForm,
    { hydrate, serialize },
  );

  // クライアント側のバリデーションエラーとサーバーからのエラーを管理する状態
  const [errors, setErrors] = useState<ItemErrors>({});
  // フォームの各フィールドがユーザーによって触れられたかどうかを管理する状態
  const [touched, setTouched] = useState<Record<keyof ItemForm, boolean>>(createInitialTouched()); 

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
  const handleChange = <K extends keyof ItemForm>(
    key: K,
    value: ItemForm[K],
  ) => {
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

  // フォームの送信を処理するハンドラー関数
  const handleSubmit = async () => {
    setSubmitted(true);

    if (hasErrors) {
      return false;
    }

    // フォームデータを FormData オブジェクトに変換
    const formData = buildFormData(form);
  
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
