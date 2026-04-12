import { useState } from "react";
import { isAxiosError } from "axios";
import { register } from "../api/auth";
import { usePersistentForm } from "./usePersistentForm";
import { validateRegister } from "../utils/validation/register";
import type { RegisterInput } from "../types/auth";

type RegisterErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
};

export const useRegisterForm = () => {
  const { form, setForm, clearStoredForm } = usePersistentForm<RegisterInput>(
    "registerForm",
    {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  );

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  /** 入力変更 */
  const handleChange = (key: keyof RegisterInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /** 送信処理 */
  const handleSubmit = async () => {
    setErrors({});

    // フロントバリデーション
    const clientErrors = validateRegister(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return false;
    }

    setLoading(true);

    try {
      await register(form);
      clearStoredForm();
      return true;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors ?? {});
        } else {
          alert("登録に失敗しました");
        }
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
};
