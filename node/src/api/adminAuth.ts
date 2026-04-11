import axios from "axios";

/** 管理者ログインする */
export const adminLogin = async (data: {
    email: string;
    password: string;
}) => {
  await axios.get("/sanctum/csrf-cookie");
  return axios.post("/admin/login", data);
};

/** 管理者ログアウトする */
export const adminLogout = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return axios.post("/admin/logout");
};

/** 管理者ユーザー情報を取得する */
export const getAdminUser = async () => {
  return axios.get("/api/admin/user");
};