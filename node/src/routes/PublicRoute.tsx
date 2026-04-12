import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

type Props = {
  children: ReactNode;
  allowUnverifiedUser?: boolean;
  redirectAuthenticatedTo?: string;
};

/** 未ログインユーザー向けの画面を保護するコンポーネント */
export const PublicRoute = ({
  children,
  allowUnverifiedUser = false,
  redirectAuthenticatedTo = "/items",
}: Props) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return null;
  }

  if (user) {
    if (!user.email_verified_at && allowUnverifiedUser) {
      return children;
    }

    if (!user.email_verified_at) {
      return <Navigate to="/verify-email" replace />;
    }

    return <Navigate to={redirectAuthenticatedTo} replace />;
  }

  return children;
};
