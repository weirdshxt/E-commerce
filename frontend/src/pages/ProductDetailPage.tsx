import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// API Configuration - Change this for deployment
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface Product {
  id: string;
  name: string;
  image: string;
  brand: string;
  description: string;
  certification: string;
  category: string;
}

interface Feedback {
  name: string;
  message: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (product) {
      fetch(`${API_BASE}/products?category=${product.category}`)
        .then((res) => res.json())
        .then((data) => {
          // Exclude the current product
          setCategoryProducts(data.filter((p: Product) => p.id !== product.id));
        });
    }
  }, [product]);

  const fetchFeedbacks = () => {
    setFeedbackLoading(true);
    fetch(`${API_BASE}/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setFeedbackLoading(false);
      });
  };

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    const res = await fetch(`${API_BASE}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, name, message }),
    });
    if (res.ok) {
      setSuccess("Feedback submitted!");
      setName("");
      setMessage("");
      fetchFeedbacks();
    } else {
      setError("Failed to submit feedback.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!product)
    return <div className="text-center mt-10">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Link
        to="/product"
        className="inline-block mb-4 text-green-700 hover:underline"
      >
        &larr; Back to Products
      </Link>
      <div className=" flex gap-6 sm:flex-row flex-col rounded-xl p-4 mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-70 object-cover rounded-2xl mb-4 bg-gray-100"
        />
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-2 text-green-900">
            {product.name}
          </h2>
          <div className="text-gray-600 mb-2">Brand: {product.brand}</div>
          <div className="mb-2">{product.description}</div>
          <div className="mb-2">
            Certification:{" "}
            <span className="font-semibold">{product.certification}</span>
          </div>
          <div className="mb-6">
            Category: <span className="font-semibold">{product.category}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full">
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded mb-6 flex flex-col w-full"
        >
          <h3 className="font-semibold mb-2">Leave Feedback</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-full p-2 mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Your Message"
            className="w-full border rounded-full p-2 mb-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {success && <div className="text-green-600 mb-2">{success}</div>}
          <button
            type="submit"
            className="bg-green-700 w-fit text-white px-4 py-2 rounded-full hover:bg-green-800 transition"
          >
            Submit
          </button>
        </form>
        <div className="p-4 w-full">
          <h3 className="font-semibold mb-2">Feedback</h3>
          {feedbackLoading ? (
            <div>Loading feedback...</div>
          ) : feedbacks.length === 0 ? (
            <div className="text-gray-500">No feedback yet.</div>
          ) : (
            <ul className="space-y-2">
              {feedbacks.map((fb, idx) => (
                <li key={idx} className="border-b pb-2">
                  <div className="font-semibold text-green-800">{fb.name}</div>
                  <div className="text-gray-700">{fb.message}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Viewing category products section */}
      {categoryProducts.length > 0 && (
        <div className=" p-4 rounded mt-6">
          <h3 className="font-semibold mb-4 text-green-800">
            Viewing more products in "{product?.category}" category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {categoryProducts.map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="block rounded-2xl  hover:shadow-emerald-300 transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-52 object-cover rounded-2xl mb-2 bg-gray-100"
                />
                <div className="font-semibold px-2 pt-2 text-green-900">
                  {p.name}
                </div>
                <div className="text-gray-500 px-2 pb-2 text-sm">{p.brand}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
