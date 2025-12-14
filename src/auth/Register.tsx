/**
 * Register Page
 * -------------
 * Handles user registration.
 */

import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function Register() {
    // Form state
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // UI state
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    /**
     * Client-side form validation
     */
    const validateForm = () => {
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            setError("Please fill in all fields");
            return false;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    /**
     * Submit registration form
     * - Registers user
     * - Automatically logs in
     */
    const submit = async () => {
        if (!validateForm()) return;

        setError("");
        setLoading(true);

        try {
            // Register user
            await api.post("/auth/register", {
                name: form.name,
                email: form.email,
                password: form.password,
            });

            // Auto-login after successful registration
            const loginRes = await api.post("/auth/login", {
                email: form.email,
                password: form.password,
            });

            // Store JWT token
            localStorage.setItem("token", loginRes.data.token);

            // Redirect to dashboard
            navigate("/dashboard");
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setError(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md animate-slideUp">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-400">
                            Join SweetShelf and explore premium sweets
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex gap-3 animate-slideIn">
                            <AlertCircle
                                size={20}
                                className="text-red-400 flex-shrink-0 mt-0.5"
                            />
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form Fields */}
                    <div className="space-y-4 mb-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                disabled={loading}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                disabled={loading}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="At least 6 characters"
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={form.confirmPassword}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={submit}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 rounded-lg hover:from-rose-600 hover:to-rose-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>

                    {/* Footer */}
                    <p className="text-center text-gray-400 text-sm mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-rose-400 hover:text-rose-300 font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
