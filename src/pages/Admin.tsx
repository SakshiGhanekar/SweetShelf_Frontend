
/**
* Admin Page – Sweet Management
* -----------------------------
* Allows ADMIN users to:
* - View sweets inventory
* - Add new sweets
* - Edit existing sweets
* - Delete sweets
*/

import { useState, useEffect } from "react";
import { api } from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, Edit, Trash2, Plus, X, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface Sweet {
    _id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

export default function Admin() {
    const navigate = useNavigate();
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
    const [restockingId, setRestockingId] = useState<string | null>(null);
    const [restockQuantity, setRestockQuantity] = useState("");
    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
    });

    useEffect(() => {
        fetchSweets();
    }, []);

    const fetchSweets = async () => {
        try {
            const response = await api.get("/sweets");
            setSweets(response.data);
        } catch {
            toast.error("Failed to fetch sweets");
        }
    };

    const resetForm = () => {
        setForm({ name: "", category: "", price: "", quantity: "" });
        setEditingSweet(null);
        setShowAddForm(false);
    };

    const startEdit = (sweet: Sweet) => {
        setEditingSweet(sweet);
        setForm({
            name: sweet.name,
            category: sweet.category,
            price: sweet.price.toString(),
            quantity: sweet.quantity.toString(),
        });
        setShowAddForm(true);
    };

    const submit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in");
            navigate("/login");
            return;
        }

        if (!form.name || !form.category || !form.price || !form.quantity) {
            setError("Please fill in all fields");
            return;
        }

        setError("");
        setSuccess("");
        setLoading(true);

        const submitPromise = editingSweet
            ? api.put(`/sweets/${editingSweet._id}`, {
                ...form,
                price: Number(form.price),
                quantity: Number(form.quantity),
              })
            : api.post("/sweets", {
                ...form,
                price: Number(form.price),
                quantity: Number(form.quantity),
              });

        toast.promise(submitPromise, {
            loading: editingSweet ? 'Updating sweet...' : 'Adding sweet...',
            success: editingSweet ? 'Sweet updated successfully!' : 'Sweet added successfully!',
            error: (err) => err.response?.data?.message || `Failed to ${editingSweet ? 'update' : 'add'} sweet`,
        });

        try {
            await submitPromise;
            resetForm();
            fetchSweets();
        } catch {
            // Error is handled by toast.promise
        } finally {
            setLoading(false);
        }
    };

    const deleteSweet = async (id: string) => {
        toast((t) => (
            <div className="flex flex-col gap-3">
                <span>Are you sure you want to delete this sweet?</span>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            performDelete(id);
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity,
        });
    };

    const performDelete = async (id: string) => {
        const deletePromise = api.delete(`/sweets/${id}`);

        toast.promise(deletePromise, {
            loading: 'Deleting sweet...',
            success: 'Sweet deleted successfully!',
            error: 'Failed to delete sweet',
        });

        try {
            await deletePromise;
            fetchSweets();
        } catch {
            // Error is handled by toast.promise
        }
    };

    const performRestock = async (id: string) => {
        if (!restockQuantity || Number(restockQuantity) <= 0) {
            toast.error("Please enter a valid quantity");
            return;
        }

        const restockPromise = api.post(`/sweets/${id}/restock`, {
            quantity: Number(restockQuantity),
        });

        toast.promise(restockPromise, {
            loading: 'Restocking sweet...',
            success: 'Sweet restocked successfully!',
            error: 'Failed to restock sweet',
        });

        try {
            await restockPromise;
            setRestockingId(null);
            setRestockQuantity("");
            fetchSweets();
        } catch {
            // Error is handled by toast.promise
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-10">
                <div className="max-w-6xl mx-auto animate-slideUp">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Sweet Management</h1>
                        <p className="text-gray-400 text-sm">Manage your premium sweet inventory</p>
                    </div>

                    {/* Add/Edit Form Toggle */}
                    <div className="mb-6">
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-6 py-3 rounded-lg hover:from-rose-600 hover:to-rose-700 transition font-medium flex items-center gap-2"
                        >
                            {showAddForm ? <X size={20} /> : <Plus size={20} />}
                            {editingSweet ? 'Cancel Edit' : showAddForm ? 'Cancel' : 'Add New Sweet'}
                        </button>
                    </div>

                    {/* Add/Edit Form */}
                    {showAddForm && (
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8 mb-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {editingSweet ? 'Edit Sweet' : 'Add New Sweet'}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {editingSweet ? 'Update sweet information' : 'Add a premium sweet product to your inventory'}
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex gap-3 animate-slideIn">
                                    <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-300 text-sm">{error}</p>
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 flex gap-3 animate-slideIn">
                                    <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-green-300 text-sm">{success}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Sweet Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Gulab Jamun, Barfi, Laddu"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        disabled={loading}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        disabled={loading}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                    >
                                        <option value="" disabled className="bg-slate-800">Select a category</option>
                                        <option value="Indian" className="bg-slate-800">Indian</option>
                                        <option value="Chocolate" className="bg-slate-800">Chocolate</option>
                                        <option value="Seasonal" className="bg-slate-800">Seasonal</option>
                                        <option value="Dry Fruits" className="bg-slate-800">Dry Fruits</option>
                                        <option value="Milk Based" className="bg-slate-800">Milk Based</option>
                                        <option value="Baked" className="bg-slate-800">Baked</option>
                                        <option value="Other" className="bg-slate-800">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        disabled={loading}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={form.quantity}
                                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                                        disabled={loading}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={submit}
                                    disabled={loading}
                                    className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 px-6 rounded-lg hover:from-rose-600 hover:to-rose-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (editingSweet ? 'Updating...' : 'Adding...') : (editingSweet ? 'Update Sweet' : 'Add Sweet')}
                                </button>
                                <button
                                    onClick={resetForm}
                                    className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Sweets List */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">Current Inventory</h2>
                            <p className="text-gray-400 text-sm">Manage your sweet products</p>
                        </div>

                        {sweets.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-gray-400">No sweets in inventory yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {sweets.map((sweet) => (
                                            <tr key={sweet._id} className="hover:bg-white/5 transition">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{sweet.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sweet.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">₹{sweet.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col gap-2">
                                                        <span className="text-sm text-white">{sweet.quantity}</span>
                                                        {restockingId === sweet._id && (
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="number"
                                                                    placeholder="Qty"
                                                                    value={restockQuantity}
                                                                    onChange={(e) => setRestockQuantity(e.target.value)}
                                                                    className="w-16 bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs placeholder-gray-500"
                                                                />
                                                                <button
                                                                    onClick={() => performRestock(sweet._id)}
                                                                    className="text-green-400 hover:text-green-300 transition text-xs px-2 py-1 bg-green-500/10 rounded"
                                                                >
                                                                    OK
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setRestockingId(null);
                                                                        setRestockQuantity("");
                                                                    }}
                                                                    className="text-gray-400 hover:text-gray-300 transition text-xs px-2 py-1"
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex gap-2">
                                                        {restockingId !== sweet._id && (
                                                            <>
                                                                <button
                                                                    onClick={() => setRestockingId(sweet._id)}
                                                                    className="text-green-400 hover:text-green-300 transition p-1"
                                                                    title="Restock"
                                                                >
                                                                    <RefreshCw size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => startEdit(sweet)}
                                                                    className="text-blue-400 hover:text-blue-300 transition p-1"
                                                                    title="Edit"
                                                                >
                                                                    <Edit size={16} />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => deleteSweet(sweet._id)}
                                                            className="text-red-400 hover:text-red-300 transition p-1"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
