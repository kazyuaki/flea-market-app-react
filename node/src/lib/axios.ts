import axios from "axios";

/**
 * axios共通インスタンス
 * baseURLは環境変数から取得し、withCredentialsをtrueに設定する
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  }
})

/**
 * レスポンスインターセプター
 * 認証エラーも各画面・ルートガード側で扱うため、そのまま呼び出し元へ返す
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);


export default axiosInstance;
