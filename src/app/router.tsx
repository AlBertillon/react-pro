import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { TaskPage } from "pages/tasks";
import { ProtectedRoute } from "shared/ui/ProtectedRoute";

const RegisterPage = lazy(() => import("pages/register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <TaskPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default router;