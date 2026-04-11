import type { SubmitEvent } from "react";
import { InputField } from "../../components/Common/InputField";
import { CommonButton } from "../../components/Common/CommonButton";
import { FormContainer } from "../../components/Common/FormContainer";
import { FormLayout } from "../../components/Layouts/FormLayout";
import { useAddressForm } from "../../hooks/useAddressForm";
import type { Field } from "../../types/form";
import type { AddressForm } from "../../hooks/useAddressForm";
import { useNavigate } from "react-router-dom";

/** 配送先変更画面 */
export const ChangeAddressPage = () => {
  /// 住所変更フォームのロジックを管理するカスタムフック
  const { form, displayErrors, isSubmitDisabled, handleChange, handleSubmit } =
    useAddressForm();

  // 変更完了後に前のページに戻るためのナビゲーションフック
  const navigate = useNavigate();

  // フォームの入力項目の定義
  const fields: Field<AddressForm>[] = [
    { name: "postal_code", label: "郵便番号", placeholder: "123-4567" },
    { name: "address", label: "住所", placeholder: "例）東京都渋谷区神南1-1-1" },
    { name: "building_name", label: "建物名", optional: true, placeholder: "例）渋谷ビル101" },
  ];

  // フォームの送信処理（成功したら前のページに戻る）
  const handleSubmitWithRedirect = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await handleSubmit();

    if (success) navigate(-1);
  };

  return (
    <FormLayout title="住所変更">
      {/* 住所変更フォーム */}
      <FormContainer className="max-w-[600px] mx-auto">
        <form onSubmit={handleSubmitWithRedirect}>
          {/* フォーム入力項目（fieldsから生成） */}
          {/* 郵便番号、住所、建物名（任意） */}
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.optional ? `${field.label}（任意）` : field.label}
              value={form[field.name]}
              error={displayErrors[field.name]?.[0]}
              placeholder={field.placeholder}
              onChange={(value) => handleChange(field.name, value)}
            />
          ))}

          {/* 送信ボタン */}
          <CommonButton type="submit" disabled={isSubmitDisabled}>
            変更を保存
          </CommonButton>
        </form>
      </FormContainer>
    </FormLayout>
  );
};
