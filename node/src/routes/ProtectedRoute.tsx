import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

type Props = {
  children: ReactNode;
};

/** 認証されたユーザーのみがアクセスできるルートを保護するコンポーネント */
export const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.email_verified_at) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};
