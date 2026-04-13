import axios from "../lib/axios";
import type { ProfileInput } from "../types/profile";

/* プロフィール更新 */
export const updateProfile = async (
	form: ProfileInput,
	image: File | null,
) => {
	const formData = new FormData();

	//* フォームデータをFormDataに追加 */
	Object.entries(form).forEach(([key, value]) => {
		formData.append(key, value);
	});

	if (image) {
		formData.append("image", image);
	}

	//* APIに送信 */
	await axios.post("/api/profile", formData);
};


/* ユーザー情報の取得 */
export const getUser = async () => {
	const response = await axios.get("/api/user");
	return response.data;
}