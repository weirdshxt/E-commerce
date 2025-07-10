import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import organic from "../assets/organic.png";

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

interface HeroProps {
  onCategorySelect?: (category: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onCategorySelect }) => {
  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products to determine best and categories
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => {
        // For demo: pick first 3 as best products
        setBestProducts(data.slice(0, 3));
        setCategories(
          Array.from(new Set(data.map((p: Product) => p.category)))
        );
      });
  }, []);

  const handleCategoryClick = (cat: string) => {
    if (onCategorySelect) {
      onCategorySelect(cat);
      navigate("/product");
    } else {
      navigate("/product", { state: { category: cat } });
    }
  };

  const featuredCategories = [
    {
      name: "oil",
      image:
        "https://img.freepik.com/free-photo/close-up-shot-transparent-coconut-oil_23-2148337484.jpg", // Example image
    },
    {
      name: "honey",
      image:
        "https://images.unsplash.com/photo-1548365329-c628c7005461?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example image
    },
    {
      name: "produce",
      image:
        "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example image
    },
  ];

  return (
    <div className="bg-green-50">
      {/* Hero Section */}
      <section className="flex flex-col sm:flex-row w-full py-10 rounded-xl h-screen sm:h-[80vh]">
        <div className="flex flex-col w-full sm:w-1/2 pl-6 py-6 pr-6 sm:py-26 sm:pr-0  sm:pl-35">
          <h1 className="text-5xl sm:text-8xl font-bold text-green-900 mb-4">
            It's all
          </h1>
          <h1 className="text-5xl sm:text-8xl font-bold text-green-900 mb-4">
            organic here
          </h1>
          <p className="text-lg sm:text-xl text-green-800 mb-6">
            Discover the best organic products for a healthier lifestyle.
          </p>
          <Link
            to="/product"
            className="inline-block w-fit bg-green-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition"
          >
            Products
          </Link>
        </div>
        <div className="img flex items-center justify-between pl-5 pb-0 sm:pl-25 sm:pb-15 w-full sm:w-1/2">
          <img
            src={organic}
            className="sm:w-[27rem] w-[15rem] mx-auto object-cover"
            alt=""
          />
        </div>
      </section>

      {/* Start by Category Section */}
      <section className="max-w-7xl mb-[10%] mx-auto px-6 sm:px-0">
        
        <div className="flex flex-wrap gap-4 justify-center">
          {featuredCategories.map((cat, idx) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className={`px-0 py-0 rounded-2xl w-full sm:w-fit h-fit font-semibold text-lg shadow transition flex gap-2 items-center overflow-hidden
                ${
                  idx === 0
                    ? "bg-green-200 text-green-900  hover:bg-green-300"
                    : ""
                }
                ${
                  idx === 1
                    ? "bg-yellow-100 text-yellow-900  hover:bg-yellow-200"
                    : ""
                }
                ${
                  idx === 2 ? "bg-blue-100 text-blue-900 hover:bg-blue-200" : ""
                }
              `}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-37 object-cover"
              />
              <div className="flex flex-col px-6 ">
                <span className="text-2xl mt-4 mb-1 capitalize">
                  {cat.name}
                </span>
                <span className="text-base opacity-70 mb-2">Explore</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto py-20 px-6 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-900 mb-2">About Us</h2>
        <div className="flex items-center justify-center w-full py-20">
        <p className="text-gray-700 text-3xl sm:text-6xl sm:w-[70%] w-[90%] text-center">
          We are committed to providing the highest quality organic products
          sourced from trusted farms and producers. Our mission is to make
          healthy living accessible and enjoyable for everyone.
        </p>
        </div>
      </section>

      {/* Best Products Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-0">
        <h2 className="text-3xl font-semibold text-green-900 mb-12">
          Best Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bestProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="block rounded-3xl shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-68 object-cover rounded-3xl mb-2 bg-gray-100"
              />
              <div className="p-4">
                <div className="font-semibold text-lg text-green-900">
                  {product.name}
                </div>
                <div className="text-gray-500">{product.brand}</div>
                <div className="text-gray-700 text-sm mt-1">
                  {product.description?.slice(0, 80)}
                  {product.description && product.description.length > 80
                    ? "..."
                    : ""}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact"
        className="max-w-7xl flex items-center sm:flex-row flex-col mx-auto py-20 px-6 sm:px-0"
      >
        <div className="flex flex-col items-center w-full">
          <h2 className="text-7xl sm:text-9xl font-semibold text-green-900 mb-2 text-center">
            Get in
          </h2>
          <h2 className="text-7xl sm:text-9xl font-semibold text-green-900 mb-2 text-center">
            Touch
          </h2>
        </div>
        <div className="flex justify-center w-full">
          <form
            className="rounded-2xl px-8 pt-8 pb-8 w-full max-w-lg"
            onSubmit={(e) => {
              e.preventDefault();
              // Simple alert for demo, aap yahan API call bhi kar sakte ho
              alert("Shukriya! Hum jald hi aap se sampark karenge.");
              (e.target as HTMLFormElement).reset();
            }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded-3xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded-3xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded-2xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                name="message"
                placeholder="Your Message"
                rows={4}
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Hero;
