import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../utils/getUserFromLocalStorage";

const AuthRoute = ({ children }) => {
  //get the token
  const token = getUserFromLocalStorage();

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthRoute;
