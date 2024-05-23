import React, { useEffect, useState } from "react";
import Login from "../pages/login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

function PrivateRoute() {
  const uid = localStorage.getItem("uid");
  const [auth, setauth] = useState(false);
  useEffect(() => {
    setauth(true);
  }, [uid]);

  if (!auth) {
    return <Login />;
  }
  return <Dashboard />;
}

export default PrivateRoute;
