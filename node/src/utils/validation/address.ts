import type { AddressForm, AddressErrors } from "../../hooks/useAddressForm";

/** 配送先変更バリデーション */
export const validateAddress = (form: AddressForm): AddressErrors => {
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
