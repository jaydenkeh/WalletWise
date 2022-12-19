import { UserAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const [userinfo] = UserAuth();

  if (userinfo.loading) {
    return (
      <div>Spinner...</div> //* to use a loading icon?
    );
  }
  return userinfo.email ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
