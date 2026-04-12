import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { updateAddress } from "../api/address";
import { validateAddress } from "../utils/validation/address";

/// 住所変更フォームのエラーの型定義
export type AddressErrors = {
  postal_code?: string[];
  address?: string[];
  building_name?: string[];
};
/// 住所変更フォームの値の型定義
export type AddressForm = {
  postal_code: string;
  address: string;
  building_name: string;
};

const STORAGE_KEY = "purchase-change-address-form";

const initialForm: AddressForm = {
  postal_code: "",
  address: "",
  building_name: "",
};

const loadStoredForm = (): AddressForm => {
  const storedForm = localStorage.getItem(STORAGE_KEY);

  if (!storedForm) return initialForm;

  try {
    const parsed = JSON.parse(storedForm);

    return {
      postal_code:
        typeof parsed.postal_code === "string" ? parsed.postal_code : "",
      address: typeof parsed.address === "string" ? parsed.address : "",
      building_name:
        typeof parsed.building_name === "string" ? parsed.building_name : "",
    };
  } catch {
    return initialForm;
  }
};

/** 住所変更フォームのロジックを管理するカスタムフック */
export const useAddressForm = () => {
  // 住所フォームの状態
  const [form, setForm] = useState<AddressForm>(loadStoredForm);

  // バリデーションエラーの状態
  const [errors, setErrors] = useState<AddressErrors>({});
  // フォームの入力が触れられたかどうかの状態
  const [touched, setTouched] = useState<Record<keyof AddressForm, boolean>>({
    postal_code: false,
    address: false,
    building_name: false,
  });
  // フォームが送信されたかどうかの状態
  const [submitted, setSubmitted] = useState(false);

  // クライアント側のバリデーションエラーを取得する関数
  const clientErrors = validateAddress(form);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  // エラーを取得する関数（入力が触れられたか、または送信された場合にエラーを表示）
  const getError = (key: keyof AddressForm) => {
    if (errors[key]) return errors[key];
    if (touched[key] || submitted) return clientErrors[key];
    return undefined;
  };

  // フォームに表示するエラー
  const displayErrors = {
    postal_code: getError("postal_code"),
    address: getError("address"),
    building_name: getError("building_name"),
  };

  // エラーがあるかどうか
  const hasErrors = Object.values(clientErrors).some(
    (v) => v && v.length > 0,
  );
  const hasTouchedFields = Object.values(touched).some(Boolean);
  const isSubmitDisabled = (hasTouchedFields || submitted) && hasErrors;

  // フォームの変更処理
  const handleChange = (key: keyof AddressForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // 住所変更の送信処理
  const handleSubmit = async () => {
    setSubmitted(true);

    if (hasErrors) {
      return false;
    }

    try {
      await updateAddress(form);
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          alert("サーバーエラーが発生しました");
        }
        return false;
      }
    }

    return false;
  };

  return {
    form,
    displayErrors,
    isSubmitDisabled,
    handleChange,
    handleSubmit,
  };
};
