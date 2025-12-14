/**
 * Login Page
 * ----------
 * Handles user authentication and stores JWT on success.
 */

import { useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function Login() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Submit login form
   */
  const submit = async () => {
    // Basic client-side validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Authenticate user
      const res = await api.post("/auth/login", { email, password });

      // Store JWT token
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      // Handle API errors
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Submit form on Enter key press
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-slideUp">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Sign in to your SweetShelf account
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
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-rose-400 hover:text-rose-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
