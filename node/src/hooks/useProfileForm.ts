import { useEffect, useState } from "react";
import { updateProfile, getUser } from "../api/profile";
import { validateProfile } from "../utils/validation/profile";
import type { ProfileForm } from "../types/profile";
import { getProfileImageUrl } from "../utils/profileImage";
import { getUserForm } from "../utils/profileForm";
import { useForm } from "./useForm";
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
  /* 画像ファイルとプレビューURLの状態 */
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  /* セッションストレージのキーを管理する状態 */
  const [storageKey, setStorageKey] = useState<string | null>(null);

  const {
    form,
    setForm,
    displayErrors,
    loading,
    isSubmitDisabled,
    handleChange,
    handleSubmit,
  } = useForm<ProfileForm>({
    storageKey: "profile-form",
    initialForm,
    validate: validateProfile,
    persist: false,
    submit: async (nextForm) => {
      await updateProfile(nextForm, image);

      if (storageKey) {
        clearProfileDraft(storageKey);
      }

      alert("プロフィールを更新しました");
    },
    errorMessage: "プロフィールの更新に失敗しました",
  });

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
  }, [setForm]);

  /* フォームの状態をセッションストレージに保存するエフェクト */
  useEffect(() => {
    if (!storageKey) return;

    saveProfileDraft(storageKey, form);
  }, [form, storageKey]);

  /* 画像入力の変更処理 */
  const handleImageChange = (file: File | null) => {
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
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
