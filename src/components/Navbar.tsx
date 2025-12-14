/**
 * Navbar Component
 * ----------------
 * Displays the main navigation bar and handles
 * user logout and role-based navigation.
 */

import { ShoppingBag, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  /**
   * Handle user logout
   * Declears auth token and redirects to login
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  /**
   * Decode JWT payload to get user role
   * Used for role-based navigation (e.g., Admin)
   */
  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role;
    } catch {
      return null;
    }
  };

  const userRole = getUserRole();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-2 rounded-lg">
            <ShoppingBag size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white">
            SweetShelf
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1">
          <Link
            to="/dashboard"
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 font-medium text-sm"
          >
            Browse
          </Link>

          {/* Admin-only link */}
          {userRole === "ADMIN" && (
            <Link
              to="/admin"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              Admin
            </Link>
          )}

          <div className="w-px h-6 bg-white/10 mx-2" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
