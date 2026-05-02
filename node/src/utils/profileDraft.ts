import type { ProfileForm } from "../types/profile";

const LEGACY_STORAGE_KEY = "profile-form";
const STORAGE_KEY_PREFIX = "profile-form";

/* プロフィール編集フォームの下書きを管理するユーティリティ関数群 */
export const clearLegacyProfileDraft = () => {
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  sessionStorage.removeItem(LEGACY_STORAGE_KEY);
};

/* ユーザーIDに基づいてセッションストレージのキーを生成 */
export const getProfileDraftKey = (userId: number) =>
  `${STORAGE_KEY_PREFIX}-${userId}`;

/* フォームに入力された値が1つでも存在するかをチェック */
export const hasProfileDraftValue = (form: ProfileForm) =>
  Object.values(form).some((value) => value.trim() !== "");

/* セッションストレージからプロフィール編集フォームの下書きを読み取る */
export const readProfileDraft = (storageKey: string): ProfileForm | null => {
  const storedValue = sessionStorage.getItem(storageKey);
  if (!storedValue) return null;

  try {
    const parsed = JSON.parse(storedValue) as Partial<ProfileForm>;

    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      postal_code:
        typeof parsed.postal_code === "string" ? parsed.postal_code : "",
      address: typeof parsed.address === "string" ? parsed.address : "",
      building_name:
        typeof parsed.building_name === "string" ? parsed.building_name : "",
      phone_number:
        typeof parsed.phone_number === "string" ? parsed.phone_number : "",
    };
  } catch {
    sessionStorage.removeItem(storageKey);
    return null;
  }
};

/* セッションストレージにプロフィール編集フォームの下書きを保存する */
export const saveProfileDraft = (storageKey: string, form: ProfileForm) => {
  sessionStorage.setItem(storageKey, JSON.stringify(form));
};

/* セッションストレージからプロフィール編集フォームの下書きを削除する */
export const clearProfileDraft = (storageKey: string) => {
  sessionStorage.removeItem(storageKey);
};
