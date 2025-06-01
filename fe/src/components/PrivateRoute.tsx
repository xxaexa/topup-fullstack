import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localStorage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getUserFromLocalStorage();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
