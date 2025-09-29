import { useState, useEffect } from "react";
import Link from "next/link";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Clear any existing tokens when page loads
    useEffect(() => {
        console.log("Clearing existing tokens...");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        console.log("=== LOGIN ATTEMPT START ===");
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            console.log("Making API call to /api/admin/login...");
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            console.log("Response received:", response);
            console.log("Response status:", response.status);
            console.log("Response ok:", response.ok);

            const data = await response.json();
            console.log("Response data:", data);

            if (response.ok && data.success) {
                console.log("=== LOGIN SUCCESS ===");

                // Clear any conflicting tokens first
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                // Store admin token
                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminUser", JSON.stringify(data.user));

                // Verify token was stored
                const storedToken = localStorage.getItem("adminToken");
                const storedUser = localStorage.getItem("adminUser");
                console.log("Stored token:", storedToken ? "Yes" : "No");
                console.log("Stored user:", storedUser ? "Yes" : "No");

                console.log("Redirecting to /admin...");

                // Use window.location for more reliable redirect
                window.location.href = "/admin";
            } else {
                console.log("=== LOGIN FAILED ===");
                console.log("Error message:", data.message);
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("=== LOGIN ERROR ===");
            console.error("Error details:", err);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
            console.log("=== LOGIN ATTEMPT END ===");
        }
    };

    return (
        <div className="admin-login">
            <div className="admin-login__container">
                <div className="admin-login__header">
                    <div className="admin-login__logo">
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9,22 9,12 15,12 15,22"></polyline>
                        </svg>
                        <h1>venfurneer</h1>
                        <p>Admin Panel</p>
                    </div>
                </div>

                <div className="admin-login__form-container">
                    <div className="admin-login__form-wrapper">
                        <h2>Sign in to your account</h2>
                        <p>Enter your credentials to access the admin panel</p>

                        <form onSubmit={handleSubmit} className="admin-login__form">
                            {error && (
                                <div className="admin-login__error">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <div className="admin-login__form-group">
                                <label htmlFor="email" className="admin-login__label">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="admin-login__input"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="admin-login__form-group">
                                <label htmlFor="password" className="admin-login__label">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="admin-login__input"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="admin-login__submit"
                                onClick={() => console.log("Button clicked!")}
                            >
                                {loading ? (
                                    <div className="admin-login__loading">
                                        <div className="admin-login__spinner"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </form>

                        <div className="admin-login__footer">
                            <Link href="/" className="admin-login__back-link">
                                ← Back to store
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
