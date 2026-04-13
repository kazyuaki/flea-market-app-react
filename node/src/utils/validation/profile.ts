import type { ProfileInput } from "../../types/profile";

export type ProfileErrors = Partial<Record<keyof ProfileInput, string[]>>;

/* プロフィール入力のバリデーション */
export const validateProfile = (form: ProfileInput): ProfileErrors => {
  const errors: ProfileErrors = {};

  if (!form.name.trim()) {
    errors.name = ["お名前は必須です"];
  }

  if (!form.postal_code.trim()) {
    errors.postal_code = ["郵便番号は必須です"];
  } else if (!/^\d{3}-\d{4}$/.test(form.postal_code)) {
    errors.postal_code = ["郵便番号の形式が正しくありません（例: 123-4567）"];
  }

  if (!form.address.trim()) {
    errors.address = ["住所は必須です"];
  }

  if (form.building_name && form.building_name.length > 100) {
    errors.building_name = ["建物名は100文字以内で入力してください"];
  }

  if (!form.phone_number.trim()) {
    errors.phone_number = ["電話番号は必須です"];
  } else if (!/^\d{2,4}-\d{2,4}-\d{4}$/.test(form.phone_number)) {
    errors.phone_number = ["電話番号の形式が正しくありません（例: 090-1234-5678）"];
  }

  return errors;
};
