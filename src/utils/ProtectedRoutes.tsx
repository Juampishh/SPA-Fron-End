import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({
  canAccess,
  redirectPath = "/login",
}: {
  canAccess: boolean;
  redirectPath?: string;
}) => {
  if (!canAccess) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
export default ProtectedRoutes;
