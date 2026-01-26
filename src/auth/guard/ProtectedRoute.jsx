import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth(); 

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;