import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./authContextValue";

/**  認証情報を提供するプロバイダー */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
