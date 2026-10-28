import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const RefExamplesPage = lazy(() => import("pages/refExamples"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RefExamplesPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default router;