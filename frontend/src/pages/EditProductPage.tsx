import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { imageOptions } from "./imageOptions";
import type { ImageOption } from "./imageOptions";



const certificationOptions = [
  "USDA Organic",
  "India Organic",
  "EU Organic",
  "None",
];

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<string[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) =>
        setCategories(Array.from(new Set(data.map((p: any) => p.category))))
      );
    fetch(`http://localhost:4000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (
      !product.name.trim() ||
      product.name.length < 2 ||
      product.name.length > 50
    ) {
      setFormError("Product name is required (2-50 chars).");
      return;
    }
    if (
      !product.brand.trim() ||
      product.brand.length < 2 ||
      product.brand.length > 30
    ) {
      setFormError("Brand is required (2-30 chars).");
      return;
    }
    if (!product.category) {
      setFormError("Category is required.");
      return;
    }
    if (!product.image) {
      setFormError("Image is required.");
      return;
    }
    if (
      !product.description.trim() ||
      product.description.length < 10 ||
      product.description.length > 200
    ) {
      setFormError("Description is required (10-200 chars).");
      return;
    }
    if (!product.certification) {
      setFormError("Certification is required.");
      return;
    }
    setSubmitting(true);
    const res = await fetch(`http://localhost:4000/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setSubmitting(false);
    if (res.ok) {
      navigate("/");
    } else {
      setFormError("Failed to update product.");
    }
  };

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-semibold px-4 mb-6 text-green-900">Edit Product</h1>
      <form
        onSubmit={handleEditProduct}
        className=" p-4 mb-6"
      >
        <div className="mb-2">
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            className="w-full border rounded-3xl p-2"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            minLength={2}
            maxLength={30}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full border rounded-3xl p-2"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
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
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border rounded-2xl p-2"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
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
            value={product.certification}
            onChange={(e) =>
              setProduct({ ...product, certification: e.target.value })
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
        <div className="mb-2">
          <label className="block mb-1 font-medium">Image</label>
          <select
            className="w-full border rounded-3xl p-2"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
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
              src={product.image}
              alt="Preview"
              className="w-32 h-24 object-cover rounded-2xl border"
            />
          </div>
        </div>
        {formError && <div className="text-red-500 mb-2">{formError}</div>}
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded-3xl hover:bg-green-800 transition"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
