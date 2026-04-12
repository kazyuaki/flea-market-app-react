import { useState, useEffect } from "react";
import { login as loginApi, logout as logoutApi, getUser } from "../api/auth";

type User = {
  id: number;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /** ユーザー情報取得（ログイン状態チェック） */
  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await getUser();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  /** ログインする */
  const login = async (data: { email: string; password: string }) => {
    await loginApi(data);
    await fetchUser();
  }

  /** ログアウトする */
  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, login, logout, fetchUser };
}
