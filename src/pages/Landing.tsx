/**
 * Landing Page
 * ------------
 * Public marketing page introducing SweetShelf,
 * highlighting features and driving user signups.
 */

import {
  ArrowRight,
  Sparkles,
  Package,
  Shield,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* ===================== Navigation ===================== */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand */}
          <div className="text-2xl font-bold text-white">
            SweetShelf
          </div>

          {/* Auth Links */}
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-6 py-2 text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg hover:from-rose-600 hover:to-rose-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* ===================== Hero Section ===================== */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="animate-slideUp space-y-6">

          {/* Badge */}
          <div className="inline-block">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 w-fit mx-auto">
              <Sparkles size={16} className="text-rose-400" />
              <span className="text-sm text-gray-300">
                Premium Sweet Store Platform
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Premium Sweets,
            <br />
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Delivered Fresh
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the finest collection of premium sweets, sourced from
            artisans around the world. Fresh quality guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg hover:from-rose-600 hover:to-rose-700 transition flex items-center gap-2 font-medium"
            >
              Get Started <ArrowRight size={20} />
            </Link>

            <button
              type="button"
              className="px-8 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition font-medium"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ===================== Features Section ===================== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Feature: Quality */}
          <div
            className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-white/20 transition animate-slideUp"
            style={{ animationDelay: "0.1s" }}
          >
            <Package className="text-rose-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">
              Premium Quality
            </h3>
            <p className="text-gray-400">
              Sourced from the finest artisans, every sweet is crafted
              with care and premium ingredients.
            </p>
          </div>

          {/* Feature: Delivery */}
          <div
            className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-white/20 transition animate-slideUp"
            style={{ animationDelay: "0.2s" }}
          >
            <Zap className="text-rose-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-400">
              Get your favorite sweets delivered fresh to your door
              within 24 hours.
            </p>
          </div>

          {/* Feature: Security */}
          <div
            className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-white/20 transition animate-slideUp"
            style={{ animationDelay: "0.3s" }}
          >
            <Shield className="text-rose-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">
              Secure & Safe
            </h3>
            <p className="text-gray-400">
              Your transactions are protected with industry-leading
              encryption and security.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== Call To Action ===================== */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to explore premium sweets?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of satisfied customers enjoying our premium
            sweet collection.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg hover:from-rose-600 hover:to-rose-700 transition font-medium"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* ===================== Footer ===================== */}
      <footer className="border-t border-white/10 mt-20 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>&copy; 2025 SweetShelf. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
