import { useContext } from "react";
import { AuthContext } from "./authContextValue";

/**  認証情報を取得するカスタムフック */
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
