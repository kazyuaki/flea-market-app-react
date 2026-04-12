import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { FormLayout } from "../../components/Layouts/FormLayout";
import type { Field } from "../../types/form";
import type { ProfileInput } from "../../types/profile";
import { FormContainer } from "../../components/Common/FormContainer";
import { InputField } from "../../components/Common/InputField";
import { CommonButton } from "../../components/Common/CommonButton";

/** プロフィール入力画面（仮） */
export const ProfilePage = () => {
  const [form, setForm] = useState<ProfileInput>({
    name: "",
    postal_code: "",
    address: "",
    building_name: "",
    phone_number: "",
  });

  /* フォームフィールドの定義 */
  const fields: Field<ProfileInput>[] = [
    {
      name: "name",
      label: "お名前",
      placeholder: "例）山田 太郎",
    },
    {
      name: "postal_code",
      label: "郵便番号",
      placeholder: "例）123-4567",
    },
    {
      name: "address",
      label: "住所",
      placeholder: "例）東京都渋谷区1-2-3",
    },
    {
      name: "building_name",
      label: "建物名",
      placeholder: "例）渋谷ビル 101号室",
      optional: true,
    },
    {
      name: "phone_number",
      label: "電話番号",
      placeholder: "例）090-1234-5678",
    },
  ];

  /* 画像アップロード用の状態管理 */
  const [preview, setPreview] = useState<string | null>(null);

  //* 画像選択時のプレビュー表示 */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (name: keyof ProfileInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <FormLayout title="プロフィール設定">
      <FormContainer className="max-w-[760px]">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          {preview ? (
            <img
              src={preview}
              alt="プレビュー"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-300" />
          )}

          <label className="cursor-pointer">
            <span className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50">
              画像を選択する
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-[520px]">
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.optional ? `${field.label}（任意）` : field.label}
              value={form[field.name] ?? ""}
              placeholder={field.placeholder}
              type={field.type}
              className="mx-auto"
              onChange={(value) => handleChange(field.name, value)}
            />
          ))}

          <CommonButton type="submit">更新する</CommonButton>
        </form>
      </FormContainer>
    </FormLayout>
  );
};
