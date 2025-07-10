import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { SquarePen, Trash } from "lucide-react";

// API Configuration - Change this for deployment
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface Product {
  id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description?: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAdmin();

  // Set category from navigation state (e.g., from Hero)
  useEffect(() => {
    if (location.state && (location.state as any).category) {
      setCategory((location.state as any).category);
      // Clear the state so it doesn't persist on further navigation
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const fetchProducts = () => {
    setLoading(true);
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setDeleting(id);
    await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
    setDeleting(null);
    fetchProducts();
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Organic Products
      </h1>
      <div className="flex justify-between sm:justify-end items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by name or brand..."
          className="border rounded-full px-3 py-2 w-11/16 max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isAdmin && (
          <Link
            to="/add-product"
            className="text-sm bg-green-700 text-white pl-3 pr-3 py-3 rounded-full hover:bg-green-800 transition"
          >
            Add Product
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-12">
        <button
          className={`px-3 py-1 rounded-full ${
            category === "all" ? "bg-green-700 text-white" : "bg-gray-200"
          }`}
          onClick={() => setCategory("all")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full ${
              category === cat ? "bg-green-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative group rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <Link to={`/product/${product.id}`} className="block">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-2xl mb-2 bg-gray-100"
              />
              <div className="p-4">
                <div className="font-semibold text-lg text-green-900">
                  {product.name}
                </div>
                <div className="text-black">{product.brand}</div>
                <div className="text-black text-sm mt-1">
                  {product.description?.slice(0, 80)}
                  {product.description && product.description.length > 80
                    ? "..."
                    : ""}
                </div>
              </div>
            </Link>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              {isAdmin && (
                <div className="flex flex-col items-center justify-center gap-2">
                  <button
                    className="bg-green-700 text-white px-2 py-2 rounded-full text-xs hover:bg-yellow-600"
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                  >
                    <SquarePen />
                  </button>
                  <button
                    className="bg-green-700 text-white px-2 py-2 rounded-full text-xs hover:bg-red-700"
                    onClick={() => handleDelete(product.id)}
                    disabled={deleting === product.id}
                  >
                    {deleting === product.id ? "Deleting..." : <Trash />}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
