import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

type Props = {
  children: ReactNode;
};

/** 未ログインユーザー向けの画面を保護するコンポーネント */
export const PublicRoute = ({ children }: Props) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to="/items" replace />;
  }

  return children;
};
