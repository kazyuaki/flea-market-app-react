import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommonButton } from "../../components/Common/CommonButton";
import { FormContainer } from "../../components/Common/FormContainer";
import { InputField } from "../../components/Common/InputField";
import { FormLayout } from "../../components/Layouts/FormLayout";
import { useAuthContext } from "../../context/useAuthContext";
import type { RegisterInput } from "../../types/auth";
import type { Field } from "../../types/form";
import { useRegisterForm } from "../../hooks/useRegisterForm";

/** 会員登録画面 */
export const RegisterPage = () => {
  /* ナビゲーション、認証コンテキスト、フォームの状態管理をセットアップ */
  const navigate = useNavigate();
  const { fetchUser } = useAuthContext();
  const { form, errors, loading, handleChange, handleSubmit } =
    useRegisterForm();
  
  //* フォームフィールドの定義 */
  const fields: Field<RegisterInput>[] = [
    {
      name: "name",
      label: "お名前",
      placeholder: "例）山田 太郎",
    },
    {
      name: "email",
      label: "メールアドレス",
      type: "email",
      placeholder: "example@email.com",
    },
    {
      name: "password",
      label: "パスワード",
      type: "password",
      placeholder: "8文字以上のパスワード",
    },
    {
      name: "password_confirmation",
      label: "確認用パスワード",
      type: "password",
      placeholder: "もう一度パスワードを入力",
    },
  ];

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
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              value={form[field.name]}
              error={errors[field.name]?.[0]}
              type={field.type}
              placeholder={field.placeholder}
              onChange={(value) => handleChange(field.name, value)}
            />
          ))}

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
