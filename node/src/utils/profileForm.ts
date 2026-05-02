import type { ProfileUser, ProfileForm } from "../types/profile";

/* APIから取得したユーザーデータをフォームの初期値に変換する関数 */
export const getUserForm = (user: ProfileUser): ProfileForm => ({
  name: user.name || "",
  postal_code: user.postal_code || "",
  address: user.address || "",
  building_name: user.building_name || "",
  phone_number: user.phone_number || "",
});