import { useContext } from "react";

import { AuthActionsContext, AuthContext } from "./context";

/** Хук авторизации. Требует AuthProvider */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth можно использовать только внутри AuthProvider");
  }

  return context;
}

/** Хук действий авторизации. Требует AuthProvider */
export function useAuthActions() {
  const context = useContext(AuthActionsContext);

  if (!context) {
    throw new Error("useAuthActions можно использовать только внутри AuthProvider");
  }

  return context;
}
