import { useEffect } from "react";
import { updateAddress } from "../api/address";
import { validateAddress } from "../utils/validation/address";
import { getUser } from "../api/auth";
import { useForm } from "./useForm";

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

/** 住所変更フォームのロジックを管理するカスタムフック */
export const useAddressForm = () => {
  const {
    form,
    setForm,
    displayErrors,
    isSubmitDisabled,
    toast,
    handleChange,
    handleSubmit,
  } = useForm<AddressForm>({
    storageKey: STORAGE_KEY,
    initialForm,
    validate: validateAddress,
    submit: updateAddress,
    successMessage: "配送先を変更しました",
    errorMessage: "サーバーエラーが発生しました",
  });

  // コンポーネントの初期化時にユーザー情報を取得してフォームに反映する
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();

        setForm((prev) => {
          const hasDraft = Object.values(prev).some(
            (value) => value.trim() !== "",
          );

          if (hasDraft) {
            return prev;
          }


          return {
            postal_code: user.postal_code ?? "",
            address: user.address ?? "",
            building_name: user.building_name ?? "",
          };
        });
      } catch (err) {
        console.error("ユーザー情報の取得に失敗:", err);
      }
    };
    fetchUser();
  }, [setForm]);

  return {
    form,
    displayErrors,
    isSubmitDisabled,
    toast,
    handleChange,
    handleSubmit,
  };
};
