import axios from "../lib/axios";
import type { LoginInput, RegisterInput } from "../types/auth";

/** CSRFトークンを取得する */
export const getCsrfToken = async () => {
  await axios.get("/sanctum/csrf-cookie");
};

/** ログインする */
export const login = async (data: LoginInput) => {
  await getCsrfToken();
  const res = await axios.post("/api/auth/login", data);
  return res.data;
};

/** ユーザー登録する */
export const register = async (data: RegisterInput) => {
  await getCsrfToken();
  const res = await axios.post("/api/auth/register", data);
  return res.data;
};

/** ログアウトする */
export const logout = async () => {
  await getCsrfToken();
  const res = await axios.post("/api/auth/logout");
  return res.data;
};

/** ユーザー情報を取得する */
export const getUser = async () => {
  const res = await axios.get("/api/user");
  return res.data;
}
