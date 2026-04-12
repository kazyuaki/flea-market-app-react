import { useNavigate } from "react-router-dom";
import { InputField } from "../../components/Common/InputField";
import { CommonButton } from "../../components/Common/CommonButton";
import { FormLayout } from "../../components/Layouts/FormLayout";
import { FormContainer } from "../../components/Common/FormContainer";
import type { SubmitEvent } from "react";
import { useState } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import { usePersistentForm } from "../../hooks/usePersistentForm";
import axios from "../../lib/axios";

const STORAGE_KEY = "login-form";

const initialForm = {
  email: "",
  password: "",
};

type LoginErrors = {
  email?: string[];
  password?: string[];
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { form, setForm, clearStoredForm } = usePersistentForm(
    STORAGE_KEY,
    initialForm,
  );
  const [errors, setErrors] = useState<LoginErrors>({});

  /// フォームの値を更新する
  const handleChange = (key: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // フォームの送信処理
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(form);
      clearStoredForm();
      navigate("/items");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 422) {
        setErrors(err.response.data.errors ?? {});
        return;
      }

      alert("ログインに失敗しました");
    }
  };

  return (
    <FormLayout title="ログイン">
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <InputField
            label="メールアドレス"
            value={form.email}
            error={errors.email?.[0]}
            placeholder="example@email.com"
            onChange={(value) => handleChange("email", value)}
          />

          <InputField
            label="パスワード"
            value={form.password}
            error={errors.password?.[0]}
            placeholder="8文字以上のパスワード"
            onChange={(value) => handleChange("password", value)}
          />

          <CommonButton type="submit">
            ログイン
          </CommonButton>
        </form>
      </FormContainer>
    </FormLayout>
  );
}
