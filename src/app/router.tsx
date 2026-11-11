import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "features/authRouting/AppRouter";


const router = createBrowserRouter([
  ...authRoutes,
]);

export default router;