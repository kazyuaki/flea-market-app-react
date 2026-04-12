import { useNavigate } from "react-router-dom";
import { InputField } from "../../components/Common/InputField";
import { CommonButton } from "../../components/Common/CommonButton";
import { FormLayout } from "../../components/Layouts/FormLayout";
import { FormContainer } from "../../components/Common/FormContainer";
import type { SubmitEvent } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import { useLoginForm } from "../../hooks/useLoginForm";

export const LoginPage = () => {
  /// ナビゲーション、認証コンテキスト、フォームの状態管理をセットアップ
  const navigate = useNavigate();
  const { fetchUser } = useAuthContext();
  const { form, displayErrors, isSubmitDisabled, handleChange, handleSubmit } =
    useLoginForm();

  // フォームの送信処理
  const handleSubmitWithRedirect = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await handleSubmit();

    if (success) {
      await fetchUser();
      navigate("/items");
    }
  };

  return (
    <FormLayout title="ログイン">
      <FormContainer>
        <form onSubmit={handleSubmitWithRedirect}>
          <InputField
            label="メールアドレス"
            value={form.email}
            error={displayErrors.email?.[0]}
            type="email"
            placeholder="example@email.com"
            onChange={(value) => handleChange("email", value)}
          />

          <InputField
            label="パスワード"
            value={form.password}
            error={displayErrors.password?.[0]}
            type="password"
            placeholder="8文字以上のパスワード"
            onChange={(value) => handleChange("password", value)}
          />

          <CommonButton type="submit" disabled={isSubmitDisabled}>
            ログイン
          </CommonButton>
        </form>
      </FormContainer>
    </FormLayout>
  );
}
