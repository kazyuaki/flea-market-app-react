import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { InputField } from "../../components/Common/InputField";
import { CommonButton } from "../../components/Common/CommonButton";
import { FormLayout } from "../../components/Layouts/FormLayout";
import { FormContainer } from "../../components/Common/FormContainer";
import type { SubmitEvent } from "react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
    
  // フォームの状態をまとめる
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  /// フォームの値を更新する
  const handleChange = (key: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/items");
    } catch {
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
            placeholder="example@email.com"
            onChange={(value) => handleChange("email", value)}
          />

          <InputField
            label="パスワード"
            value={form.password}
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
