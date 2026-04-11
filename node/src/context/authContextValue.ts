import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export type AuthContextType = ReturnType<typeof useAuth>;

export const AuthContext = createContext<AuthContextType | null>(null);
