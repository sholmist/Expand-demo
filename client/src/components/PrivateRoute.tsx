import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store/configureStore";

const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
export default PrivateRoute;
