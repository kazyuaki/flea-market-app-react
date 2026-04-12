import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommonButton } from "../../components/Common/CommonButton";
import { FormContainer } from "../../components/Common/FormContainer";
import { InputField } from "../../components/Common/InputField";
import { FormLayout } from "../../components/Layouts/FormLayout";
import { useAuthContext } from "../../context/useAuthContext";
import { useRegisterForm } from "../../hooks/useRegisterForm";

/** 会員登録画面 */
export const RegisterPage = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuthContext();
  const { form, errors, loading, handleChange, handleSubmit } =
    useRegisterForm();

  //* 登録処理＋リダイレクト */
  const handleSubmitWithRedirect = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await handleSubmit();

    if (success) {
      await fetchUser();
      navigate("/items");
    }
  };

  return (
    <FormLayout title="会員登録">
      <FormContainer>
        <form onSubmit={handleSubmitWithRedirect}>
          <InputField
            label="お名前"
            value={form.name}
            error={errors.name?.[0]}
            placeholder="例）山田 太郎"
            onChange={(value) => handleChange("name", value)}
          />

          <InputField
            label="メールアドレス"
            value={form.email}
            error={errors.email?.[0]}
            type="email"
            placeholder="example@email.com"
            onChange={(value) => handleChange("email", value)}
          />

          <InputField
            label="パスワード"
            value={form.password}
            error={errors.password?.[0]}
            type="password"
            placeholder="8文字以上のパスワード"
            onChange={(value) => handleChange("password", value)}
          />

          <InputField
            label="確認用パスワード"
            value={form.password_confirmation}
            error={errors.password_confirmation?.[0]}
            type="password"
            placeholder="もう一度パスワードを入力"
            onChange={(value) => handleChange("password_confirmation", value)}
          />

          <CommonButton type="submit" disabled={loading}>
            {loading ? "登録中..." : "登録する"}
          </CommonButton>

          <p className="mt-4 text-center text-sm">
            <Link to="/login" className="text-blue-600 hover:underline">
              ログイン画面へ
            </Link>
          </p>
        </form>
      </FormContainer>
    </FormLayout>
  );
};
