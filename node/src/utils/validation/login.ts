type LoginForm = {
  email: string;
  password: string;
};

type LoginErrors = {
  email?: string[];
  password?: string[];
};

/** ログイン画面のクライアント側バリデーション */
export const validateLogin = (form: LoginForm): LoginErrors => {
  const nextErrors: LoginErrors = {};

  if (!form.email.trim()) {
    nextErrors.email = ["メールアドレスを入力してください"];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    nextErrors.email = ["メールアドレスの形式で入力してください"];
  }

  if (!form.password.trim()) {
    nextErrors.password = ["パスワードを入力してください"];
  } else if (form.password.length < 8) {
    nextErrors.password = ["パスワードは8文字以上で入力してください"];
  }

  return nextErrors;
};
