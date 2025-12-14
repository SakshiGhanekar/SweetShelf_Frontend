/**
 * SweetCard Component
 * -------------------
 * Displays individual sweet details and
 * allows purchasing if stock is available.
 */

import type { Sweet } from "../types/sweet";
import { ShoppingCart } from "lucide-react";

type SweetCardProps = {
  sweet: Sweet;
  onPurchase: (id: string) => void;
};

export function SweetCard({ sweet, onPurchase }: SweetCardProps) {
  /**
   * Stock indicators
   */
  const stockPercentage =
    sweet.quantity > 0 ? Math.min(100, (sweet.quantity / 50) * 100) : 0;

  const isLowStock = sweet.quantity > 0 && sweet.quantity < 5;
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-rose-500/50 transition-all duration-300 overflow-hidden animate-slideUp group hover:bg-white/10">
      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-white text-lg group-hover:text-rose-300 transition-colors">
              {sweet.name}
            </h3>
            <p className="text-gray-400 text-sm">{sweet.category}</p>
          </div>

          {/* Low stock badge */}
          {isLowStock && (
            <span className="bg-orange-500/20 text-orange-300 text-xs font-medium px-3 py-1 rounded-full border border-orange-500/30">
              Limited
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">
            ₹{sweet.price}
          </span>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 font-medium">
              Availability
            </span>
            <span
              className={`text-xs font-medium ${isOutOfStock ? "text-red-400" : "text-green-400"
                }`}
            >
              {sweet.quantity} units
            </span>
          </div>

          {/* Stock progress bar */}
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stockPercentage}%` }}
            />
          </div>
        </div>

        {/* Purchase Button */}
        <button
          disabled={isOutOfStock}
          onClick={() => onPurchase(sweet._id)}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${isOutOfStock
              ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
              : "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-rose-500/25 active:scale-95"
            }`}
        >
          <ShoppingCart size={18} />
          {isOutOfStock ? "Out of Stock" : "Purchase"}
        </button>
      </div>
    </div>
  );
}
