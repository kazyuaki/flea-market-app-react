import axios from "axios";

/** CSRFトークンを取得する */
export const getCsrfToken = async () => {
  await axios.get("/api/auth/csrf-cookie");
};

/** ログインする */
export const login = async (data: { email: string; password: string }) => {
  await getCsrfToken();
  const res = await axios.post("/login", data);
  return res.data;
};

/** ユーザー登録する */
export const register = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  await getCsrfToken();
  const res = await axios.post("/register", data);
  return res.data;
};

/** ログアウトする */
export const logout = async () => {
  const res = await axios.post("/logout");
  return res.data;
};

/** ユーザー情報を取得する */
export const getUser = async () => {
  const res = await axios.get("/api/user");
  return res.data;
}