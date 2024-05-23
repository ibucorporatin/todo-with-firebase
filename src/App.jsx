import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./routeProtector/PrivateRoute";
import Login from "./pages/login/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
