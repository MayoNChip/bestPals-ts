import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function SecuredRoutes({ children }: { children: ReactNode }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoggedIn === null || isLoading === true) {
    return <></>;
  }

  return isLoggedIn === true ? children : <Navigate to="/home" replace />;
}

export default SecuredRoutes;
