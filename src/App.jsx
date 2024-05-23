import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./routeProtector/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
      <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
