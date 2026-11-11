import { Suspense, lazy, type ComponentType } from "react";
import { Outlet } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";

const LoginPage = lazy(() => import("./LoginPage").then((mod) => ({ default: mod.LoginPage as ComponentType<unknown> })));
const ProfilePage = lazy(() => import("./ProfilePage").then((mod) => ({ default: mod.ProfilePage as ComponentType<unknown> })));
const PublicPage = lazy(() => import("./PublicPage").then((mod) => ({ default: mod.PublicPage as ComponentType<unknown> })));

function LoadingFallback() {
  return <div style={{ padding: "24px", textAlign: "center" }}>Загрузка...</div>;
}

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  );
}

export const authRoutes = [
  {
    element: <AppRouter />,
    children: [
      // Публичные маршруты
      {
        path: "/",
        element: <PublicPage />,
      },
      {
        path: "/public",
        element: <PublicPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      // Защищённые маршруты
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
];