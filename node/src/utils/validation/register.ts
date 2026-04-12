import type { RegisterInput } from "../../types/auth";

type RegisterErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
};

/** 会員登録画面のクライアント側バリデーション */
export const validateRegister = (form: RegisterInput): RegisterErrors => {
  const nextErrors: RegisterErrors = {};

  if (!form.name.trim()) {
    nextErrors.name = ["お名前を入力してください"];
  } else if (form.name.length > 255) {
    nextErrors.name = ["お名前は255文字以内で入力してください"];
  }

  if (!form.email.trim()) {
    nextErrors.email = ["メールアドレスを入力してください"];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    nextErrors.email = ["メールアドレスの形式で入力してください"];
  } else if (form.email.length > 255) {
    nextErrors.email = ["メールアドレスは255文字以内で入力してください"];
  }

  if (!form.password.trim()) {
    nextErrors.password = ["パスワードを入力してください"];
  } else if (form.password.length < 8) {
    nextErrors.password = ["パスワードは8文字以上で入力してください"];
  }

  if (!form.password_confirmation.trim()) {
    nextErrors.password_confirmation = ["確認用パスワードを入力してください"];
  } else if (form.password !== form.password_confirmation) {
    nextErrors.password_confirmation = ["パスワード確認が一致しません"];
  }

  return nextErrors;
};
