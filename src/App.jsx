import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./routeProtector/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
