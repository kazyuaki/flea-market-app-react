import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateAddress } from "../../api/address";
import { InputField } from "../../components/Common/InputField";
import { ChangeButton } from "../../components/Address/ChangeButton";
import { FormContainer } from "../../components/Common/FormContainer";
import { FormLayout } from "../../components/Layouts/FormLayout";

type AddressErrors = {
  postal_code?: string[];
  address?: string[];
  building_name?: string[];
};

type AddressForm = {
  postal_code: string;
  address: string;
  building_name: string;
};

/** 配送先変更バリデーション */
const validateAddress = (form: AddressForm): AddressErrors => {
  const nextErrors: AddressErrors = {};

  if (!form.postal_code.trim()) {
    nextErrors.postal_code = ["郵便番号を入力してください"];
  } else if (!/^\d{3}-\d{4}$/.test(form.postal_code)) {
    nextErrors.postal_code = ["郵便番号は「123-4567」の形式で入力してください"];
  }

  if (!form.address.trim()) {
    nextErrors.address = ["住所を入力してください"];
  } else if (form.address.length > 255) {
    nextErrors.address = ["住所は255文字以内で入力してください"];
  }

  if (form.building_name.length > 255) {
    nextErrors.building_name = [
      "建物名は255文字以内で入力してください",
      "建物名は任意項目です",
    ];
  }

  return nextErrors;
};

/** 配送先変更画面 */
export const ChangeAddressPage = () => {
  const navigate = useNavigate();

  // 住所フォームの状態
  const [form, setForm] = useState<AddressForm>({
    postal_code: "",
    address: "",
    building_name: "",
  });

  // バリデーションエラーの状態
  const [errors, setErrors] = useState<AddressErrors>({});
  const [touched, setTouched] = useState<Record<keyof AddressForm, boolean>>({
    postal_code: false,
    address: false,
    building_name: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const clientErrors = validateAddress(form);
  const displayErrors = {
    postal_code:
      touched.postal_code || submitted ? clientErrors.postal_code : undefined,
    address: touched.address || submitted ? clientErrors.address : undefined,
    building_name:
      touched.building_name || submitted
        ? clientErrors.building_name
        : undefined,
    ...errors,
  };

  // エラーがあるかどうか
  const hasClientErrors = Object.values(clientErrors).some(
    (v) => v && v.length > 0,
  );

  type Field = {
    name: keyof AddressForm;
    label: string;
    optional?: boolean;
  };

  const fields: Field[] = [
    { name: "postal_code", label: "郵便番号" },
    { name: "address", label: "住所" },
    { name: "building_name", label: "建物名（任意）" },
  ];

  // フォームの変更処理
  const handleChange = (key: keyof AddressForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // 住所変更の送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (hasClientErrors) {
      return;
    }

    try {
      await updateAddress(form);
      navigate(-1);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          alert("サーバーエラーが発生しました");
        }
      }
    }
  };

  return (
    <>
      <FormLayout title="住所変更">
        {/* 住所変更フォーム */}
        <FormContainer className="max-w-[600px] mx-auto">
          <form onSubmit={handleSubmit}>
            {/* フォーム入力項目（fieldsから生成） */}
            {/* 郵便番号、住所、建物名（任意） */}
            {fields.map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                value={form[field.name]}
                error={displayErrors[field.name]?.[0]}
                onChange={(value) => handleChange(field.name, value)}
              />
            ))}

            {/* 送信ボタン */}
            <ChangeButton type="submit">変更を保存</ChangeButton>
          </form>
        </FormContainer>
      </FormLayout>
    </>
  );
};
