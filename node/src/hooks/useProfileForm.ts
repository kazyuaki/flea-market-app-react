import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { updateProfile, getUser } from "../api/profile";
import { validateProfile, type ProfileErrors } from "../utils/validation/profile";
import type { ProfileInput } from "../types/profile";
import { usePersistentForm } from "./usePersistentForm";

/// プロフィールフォームの値の型定義
export type ProfileForm = {
  name: string;
  postal_code: string;
  address: string;
  building_name: string;
  phone_number: string;
};

const STORAGE_KEY = "profile-form";

const initialForm: ProfileForm = {
  name: "",
  postal_code: "",
  address: "",
  building_name: "",
  phone_number: "",
};

/** プロフィール編集フォームの状態管理を行うカスタムフック */
export const useProfileForm = () => {
  const { form, setForm, clearStoredForm } = usePersistentForm(
    STORAGE_KEY,
    initialForm,
  );

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<ProfileErrors>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<keyof ProfileInput, boolean>>({
    name: false,
    postal_code: false,
    address: false,
    building_name: false,
    phone_number: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const clientErrors: ProfileErrors = validateProfile(form);

  const getError = (key: keyof ProfileInput) => {
    if (errors[key]) return errors[key];
    if (touched[key] || submitted) return clientErrors[key];
    return undefined;
  };

  const displayErrors = {
    name: getError("name"),
    postal_code: getError("postal_code"),
    address: getError("address"),
    building_name: getError("building_name"),
    phone_number: getError("phone_number"),
  };

  const hasErrors = Object.values(clientErrors).some(
    (value) => value && value.length > 0,
  );
  const hasTouchedFields = Object.values(touched).some(Boolean);
  const isSubmitDisabled = (hasTouchedFields || submitted) && hasErrors;

  /** 初期データ取得  */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setForm((prev) => {
          // ストレージにフォームの値が残っている場合はそれを優先し、
          // なければAPIから取得したユーザーデータを初期値とする
          const hasDraft = Object.values(prev).some(
            (value) => value.trim() !== "",
          );

          if (hasDraft) {
            return prev;
          }

          return {
            name: user.name || "",
            postal_code: user.postal_code || "",
            address: user.address || "",
            building_name: user.building_name || "",
            phone_number: user.phone_number || "",
          };
        });

        if (user.profile_image_url) {
          setPreview(`/storage/${user.profile_image_url}`);
        }
      } catch (error) {
        console.error("ユーザーデータの取得に失敗:", error);
      }
    };
    fetchUser();
  }, [setForm]);
  
  //* フォーム入力の変更処理 */
  const handleChange = (key: keyof ProfileInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  /* 画像入力の変更処理 */
  const handleImageChange = (file: File | null) => {
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };
  
  /* フォームの送信処理 */
  const handleSubmit = async () => {
    setSubmitted(true);

    // フロントバリデーション
    if (hasErrors) {
      return false;
    }

    setLoading(true);

    try {
      await updateProfile(form, image);
      clearStoredForm();
      alert("プロフィールを更新しました");
      return true;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors ?? {});
        } else {
          alert("プロフィールの更新に失敗しました");
        }
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    displayErrors,
    loading,
    isSubmitDisabled,
    preview,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
};
