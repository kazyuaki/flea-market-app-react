import { useState } from "react";
import axios from "../lib/axios";
import { login as loginApi } from "../api/auth";
import { usePersistentForm } from "./usePersistentForm";
import { validateLogin } from "../utils/validation/login";

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
  const { form, setForm, clearStoredForm } = usePersistentForm(
    STORAGE_KEY,
    initialForm,
  );
  const [errors, setErrors] = useState<LoginErrors>({});
  const [touched, setTouched] = useState<Record<keyof LoginForm, boolean>>({
    email: false,
    password: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const clientErrors = validateLogin(form);

  const getError = (key: keyof LoginForm) => {
    if (errors[key]) return errors[key];
    if (touched[key] || submitted) return clientErrors[key];
    return undefined;
  };

  const displayErrors = {
    email: getError("email"),
    password: getError("password"),
  };

  const hasErrors = Object.values(clientErrors).some(
    (value) => value && value.length > 0,
  );
  const hasTouchedFields = Object.values(touched).some(Boolean);
  const isSubmitDisabled = (hasTouchedFields || submitted) && hasErrors;

  // フォームの入力変更を処理する関数
  const handleChange = (key: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  /// フォームの送信処理
  const handleSubmit = async () => {
    setSubmitted(true);

    if (hasErrors) {
      return false;
    }

    try {
      await loginApi(form);
      clearStoredForm();
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors ?? {});
        } else {
          alert("ログインに失敗しました");
        }
      }

      return false;
    }
  };

  return {
    form,
    displayErrors,
    isSubmitDisabled,
    handleChange,
    handleSubmit,
  };
};
