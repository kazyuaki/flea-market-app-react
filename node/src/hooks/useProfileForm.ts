import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { updateProfile, getUser } from "../api/profile";
import {
  validateProfile,
  type ProfileErrors,
} from "../utils/validation/profile";
import type { ProfileForm, ProfileInput } from "../types/profile";
import { getProfileImageUrl } from "../utils/profileImage";
import { getUserForm } from "../utils/profileForm";
import {
  clearLegacyProfileDraft,
  clearProfileDraft,
  getProfileDraftKey,
  hasProfileDraftValue,
  readProfileDraft,
  saveProfileDraft,
} from "../utils/profileDraft";

/* フォームの初期値 */
const initialForm: ProfileForm = {
  name: "",
  postal_code: "",
  address: "",
  building_name: "",
  phone_number: "",
};


/** 
 * プロフィール編集フォームの状態管理を行うカスタムフック
 */
export const useProfileForm = () => {
  /* フォームの状態 */
  const [form, setForm] = useState<ProfileForm>(initialForm);
  /* 画像ファイルとプレビューURLの状態 */
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  /* バリデーションエラーの状態 */
  const [errors, setErrors] = useState<ProfileErrors>({});
  const clientErrors: ProfileErrors = validateProfile(form);
  /* ローディング状態と送信済み状態 */
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  /* 各フィールドのタッチ状態 */
  const [touched, setTouched] = useState<Record<keyof ProfileInput, boolean>>({
    name: false,
    postal_code: false,
    address: false,
    building_name: false,
    phone_number: false,
  });
  /* セッションストレージのキーを管理する状態 */
  const [storageKey, setStorageKey] = useState<string | null>(null);

  /* エラー表示のロジック */
  const getError = (key: keyof ProfileInput) => {
    if (errors[key]) return errors[key];
    if (touched[key] || submitted) return clientErrors[key];
    return undefined;
  };

  /* フォーム全体のエラー表示をまとめたオブジェクト */
  const displayErrors = {
    name: getError("name"),
    postal_code: getError("postal_code"),
    address: getError("address"),
    building_name: getError("building_name"),
    phone_number: getError("phone_number"),
  };

  /* 送信ボタンの活性/非活性のロジック */
  const hasErrors = Object.values(clientErrors).some(
    (value) => value && value.length > 0,
  );
  const hasTouchedFields = Object.values(touched).some(Boolean);
  const isSubmitDisabled = (hasTouchedFields || submitted) && hasErrors;

  /** 初期データ取得  */
  useEffect(() => {
    clearLegacyProfileDraft();
    // ユーザーデータを取得してフォームにセットする
    const fetchUser = async () => {
      try {
        const user = await getUser();
        const nextStorageKey = getProfileDraftKey(user.id);
        const storedForm = readProfileDraft(nextStorageKey);

        setStorageKey(nextStorageKey);
        setForm(
          storedForm && hasProfileDraftValue(storedForm)
            ? storedForm
            : getUserForm(user),
        );

        if (user.profile_image_url) {
          setPreview(getProfileImageUrl(user.profile_image_url) ?? null);
        }
      } catch (error) {
        console.error("ユーザーデータの取得に失敗:", error);
      }
    };
    fetchUser();
  }, []);

  /* フォームの状態をセッションストレージに保存するエフェクト */
  useEffect(() => {
    if (!storageKey) return;

    saveProfileDraft(storageKey, form);
  }, [form, storageKey]);

  /* フォーム入力の変更処理 */
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
    if (loading) {
      return false;
    }

    setSubmitted(true);

    // フロントバリデーション
    if (hasErrors) {
      return false;
    }
    setLoading(true);

    try {
      await updateProfile(form, image);
      if (storageKey) {
        clearProfileDraft(storageKey);
      }
      alert("プロフィールを更新しました");
      return true;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors ?? {});
        } else {
          console.error("プロフィールの更新に失敗:", err);
          alert("プロフィールの更新に失敗しました");
        }
      } else {
        console.error("プロフィールの更新に失敗:", err);
        alert("プロフィールの更新に失敗しました");
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
