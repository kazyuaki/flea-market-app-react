import { login as loginApi } from "../api/auth";
import { validateLogin } from "../utils/validation/login";
import { useForm } from "./useForm";

export type LoginErrors = {
  email?: string[];
  password?: string[];
};

export type LoginForm = {
  email: string;
  password: string;
};

const STORAGE_KEY = "login-form";

const initialForm: LoginForm = {
  email: "",
  password: "",
};

/** ログインフォームのロジックを管理するカスタムフック */
export const useLoginForm = () => {
  return useForm<LoginForm>({
    storageKey: STORAGE_KEY,
    initialForm,
    validate: validateLogin,
    submit: loginApi,
    errorMessage: "ログインに失敗しました",
  });
};
