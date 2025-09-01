import type React from "react";
import { useAppSelector } from "../../hooks/redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: "poster" | "seeker";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRole,
}) => {
    const { user, token } = useAppSelector((state) => state.auth);
    if (!token || !user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/jobs" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
