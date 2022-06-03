import jwt from "jsonwebtoken";
import { Navigate, Outlet } from "react-router-dom";
import AuthServices from "./auth.services";

const ProtectedRoute = ({ children, redirectPath = "/api/login" }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user?.accessToken);
  if (user?.accessToken) {
    jwt.verify(user.accessToken, "secret1234", (err, authData) => {
      if (err) {
        AuthServices.logout();
        return <Navigate to={redirectPath} replace />;
      }
    });
  } else {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
