import { Navigate } from "react-router-dom";

import { useAuth } from "entities/auth";
import Loader from "shared/ui/Loader";

/** Свойства защищённого маршрута */
interface ProtectedRouteProps {
  /** Дочерние компоненты */
  children: React.ReactNode;
}

/** Защищённый маршрут */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader size={32} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
