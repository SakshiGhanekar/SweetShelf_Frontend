/**
 * Dashboard Page
 * --------------
 * Displays all available sweets with
 * search, category filter, and purchase functionality.
 */

import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { SweetCard } from "../components/SweetCard";
import Navbar from "../components/Navbar";
import { Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

/**
 * Sweet type
 */
interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export default function Dashboard() {
  // Data state
  const [sweets, setSweets] = useState<Sweet[]>([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  /**
   * Load sweets on initial render
   */
  useEffect(() => {
    loadSweets();
  }, []);

  /**
   * Fetch sweets from API
   */
  const loadSweets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch {
      toast.error("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Purchase a sweet
   */
  const purchase = async (id: string) => {
    const purchasePromise = api.post(`/sweets/${id}/purchase`);

    toast.promise(purchasePromise, {
      loading: 'Processing purchase...',
      success: 'Purchase successful!',
      error: 'Purchase failed. Please try again.',
    });

    try {
      await purchasePromise;
      // Refresh list after purchase
      await loadSweets();
    } catch {
      // Error is handled by toast.promise
    }
  };

  /**
   * Derived data
   */
  const categories = Array.from(
    new Set(sweets.map((sweet) => sweet.category))
  );

  const filteredSweets = sweets.filter(
    (sweet) =>
      (sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sweet.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (!selectedCategory || sweet.category === selectedCategory)
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-12 animate-slideUp">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Explore Sweets
            </h1>
            <p className="text-gray-400 text-lg">
              Discover our premium collection of handcrafted sweets
            </p>
          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-slideIn">
            
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer appearance-none"
              >
                <option value="" className="bg-slate-900">
                  All Categories
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-slate-900"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-6 text-sm text-gray-400 font-medium">
            Showing {filteredSweets.length} of {sweets.length} products
          </div>

          {/* Content */}
          {loading ? (
            // Loading State
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-rose-500/30 border-t-rose-500 mx-auto mb-4" />
                <p className="text-gray-400">
                  Loading premium sweets...
                </p>
              </div>
            </div>
          ) : filteredSweets.length > 0 ? (
            // Sweets Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSweets.map((sweet) => (
                <SweetCard
                  key={sweet._id}
                  sweet={sweet}
                  onPurchase={purchase}
                />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xl text-gray-300 mb-2">
                No sweets found
              </p>
              <p className="text-gray-500">
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
