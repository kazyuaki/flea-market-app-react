/** ログイン時の入力データ */
export type LoginInput = {
  email: string;
  password: string;
};

/** ユーザー登録時の入力データ */
export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

/** ユーザー情報 */
export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  postal_code: string | null;
  address: string | null;
  building_name: string | null;
  phone_number: string | null;
  profile_image_url: string | null;
  is_profile_set: boolean | string;
};
