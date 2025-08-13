import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../../../utils/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            console.log("ProtectedRoute: Checking authentication...");

            // Check if we're on the login page to avoid redirect loops
            if (router.pathname === "/admin/login") {
                console.log("ProtectedRoute: On login page, skipping auth check");
                setLoading(false);
                return;
            }

            const isAuth = isAuthenticated();
            console.log("ProtectedRoute: Is authenticated:", isAuth);

            if (isAuth) {
                console.log("ProtectedRoute: Authentication successful, rendering content");
                setIsAuthorized(true);
            } else {
                console.log("ProtectedRoute: Not authenticated, redirecting to login...");
                // Redirect to login if not authenticated
                router.push("/admin/login");
            }
            setLoading(false);
        };

        // Longer delay to ensure localStorage is accessible and token is stored
        const timer = setTimeout(checkAuth, 500);
        return () => clearTimeout(timer);
    }, [router]);

    // If we're on the login page, don't render anything
    if (router.pathname === "/admin/login") {
        return null;
    }

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="admin-loading__container">
                    <div className="admin-loading__spinner"></div>
                    <p>Verifying authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        console.log("ProtectedRoute: Not authorized, showing loading...");
        return (
            <div className="admin-loading">
                <div className="admin-loading__container">
                    <div className="admin-loading__spinner"></div>
                    <p>Redirecting to login...</p>
                </div>
            </div>
        );
    }

    console.log("ProtectedRoute: Rendering protected content");
    return <>{children}</>;
};

export default ProtectedRoute;
