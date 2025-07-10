import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// API Configuration - Change this for deployment
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

import { imageOptions } from "./imageOptions";
import type { ImageOption } from "./imageOptions";

const certificationOptions = [
  "USDA Organic",
  "India Organic",
  "EU Organic",
  "None",
];

const AddProductPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    image: imageOptions[0].value,
    description: "",
    certification: "",
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) =>
        setCategories(Array.from(new Set(data.map((p: any) => p.category))))
      );
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (
      !newProduct.name.trim() ||
      newProduct.name.length < 2 ||
      newProduct.name.length > 50
    ) {
      setFormError("Product name is required (2-50 chars).");
      return;
    }
    if (
      !newProduct.brand.trim() ||
      newProduct.brand.length < 2 ||
      newProduct.brand.length > 30
    ) {
      setFormError("Brand is required (2-30 chars).");
      return;
    }
    if (!newProduct.category) {
      setFormError("Category is required.");
      return;
    }
    if (!newProduct.image) {
      setFormError("Image is required.");
      return;
    }
    if (
      !newProduct.description.trim() ||
      newProduct.description.length < 10 ||
      newProduct.description.length > 200
    ) {
      setFormError("Description is required (10-200 chars).");
      return;
    }
    if (!newProduct.certification) {
      setFormError("Certification is required.");
      return;
    }
    setSubmitting(true);
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    setSubmitting(false);
    if (res.ok) {
      navigate("/");
    } else {
      setFormError("Failed to add product.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-semibold px-4 mb-6 text-green-900">
        Add New Product
      </h1>
      <form onSubmit={handleAddProduct} className=" p-4 rounded-3xl mb-6">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            className="w-full border rounded-3xl p-2"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            minLength={2}
            maxLength={50}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Brand</label>
          <input
            type="text"
            className="w-full border rounded-3xl p-2"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
            minLength={2}
            maxLength={30}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full border rounded-3xl p-2"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Image</label>
          <select
            className="w-full border rounded-3xl p-2"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            required
          >
            {imageOptions.map((img: ImageOption) => (
              <option key={img.value} value={img.value}>
                {img.label}
              </option>
            ))}
          </select>
          <div className="mt-2">
            <img
              src={newProduct.image}
              alt="Preview"
              className="w-32 h-24 object-cover rounded-xl border"
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border rounded-2xl p-2"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            minLength={10}
            maxLength={200}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Certification</label>
          <select
            className="w-full border rounded-3xl p-2"
            value={newProduct.certification}
            onChange={(e) =>
              setNewProduct({ ...newProduct, certification: e.target.value })
            }
            required
          >
            <option value="">Select certification</option>
            {certificationOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {formError && <div className="text-red-500 mb-2">{formError}</div>}
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded-3xl hover:bg-green-800 transition"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
