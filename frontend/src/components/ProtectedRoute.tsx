import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { JSX } from "react";
import type { RootState } from "../store";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedUserTypes?: ("admin" | "student")[];
}

export default function ProtectedRoute({
  children,
  allowedUserTypes,
}: ProtectedRouteProps) {
  const token = useSelector((state: RootState) => state.auth.token);
  const userType = useSelector((state: RootState) => state.auth.userType);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserTypes && !allowedUserTypes.includes(userType!)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
