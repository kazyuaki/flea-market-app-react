import { register } from "../api/auth";
import type { RegisterInput } from "../types/auth";
import { validateRegister } from "../utils/validation/register";
import { useForm } from "./useForm";

const STORAGE_KEY = "register-form";

const initialForm: RegisterInput = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

/** 会員登録フォームのロジックを管理するカスタムフック */
export const useRegisterForm = () => {
  return useForm<RegisterInput>({
    storageKey: STORAGE_KEY,
    initialForm,
    validate: validateRegister,
    submit: register,
    errorMessage: "登録に失敗しました",
  });
};
