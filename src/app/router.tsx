import { createBrowserRouter } from "react-router-dom";

import { TaskPage } from "pages/tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskPage />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default router;
