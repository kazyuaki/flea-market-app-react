import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import { isProfileCompleted } from "../utils/auth";

type Props = {
  children: ReactNode;
};

/** 認証されたユーザーのみがアクセスできるルートを保護するコンポーネント */
export const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.email_verified_at) {
    return <Navigate to="/verify-email" replace />;
  }

  if (
    !isProfileCompleted(user) &&
    location.pathname !== "/mypage/profile"
  ) {
    return <Navigate to="/mypage/profile" replace />;
  }

  return children;
};
