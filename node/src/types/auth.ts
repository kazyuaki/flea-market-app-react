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
};
