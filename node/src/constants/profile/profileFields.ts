import type { Field } from "../../types/form";
import type { ProfileInput } from "../../types/profile";

/* フォームフィールドの定義 */
export const profileFields: Field<ProfileInput>[] = [
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
