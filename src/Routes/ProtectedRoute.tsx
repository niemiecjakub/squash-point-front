import React from "react";
import { Navigate, useLocation } from "react-router";
import { useUserStore } from "../Context/userStore";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useUserStore();

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
