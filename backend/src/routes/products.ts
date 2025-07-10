import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const productsPath = path.join(__dirname, "../../products.json");

// GET /products
router.get("/", (req, res) => {
  fs.readFile(productsPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read products" });
    let products = JSON.parse(data);
    if (req.query.category) {
      products = products.filter((p: any) => p.category === req.query.category);
    }
    res.json(products);
  });
});

// GET /products/:id
router.get("/:id", (req, res) => {
  fs.readFile(productsPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read products" });
    const products = JSON.parse(data);
    const product = products.find((p: any) => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  });
});

// POST /products
router.post("/", (req, res) => {
  const { name, brand, image, category } = req.body;
  if (!name || !brand || !image || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }
  fs.readFile(productsPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read products" });
    const products = JSON.parse(data);
    const id = (
      products.length > 0 ? parseInt(products[products.length - 1].id) + 1 : 1
    ).toString();
    const newProduct = { id, name, brand, image, category };
    products.push(newProduct);
    fs.writeFile(productsPath, JSON.stringify(products, null, 2), (err2) => {
      if (err2)
        return res.status(500).json({ error: "Failed to save product" });
      res.status(201).json(newProduct);
    });
  });
});

// PUT /products/:id
router.put("/:id", (req, res) => {
  const { name, brand, image, category } = req.body;
  fs.readFile(productsPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read products" });
    let products = JSON.parse(data);
    const idx = products.findIndex((p: any) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Product not found" });
    products[idx] = { ...products[idx], name, brand, image, category };
    fs.writeFile(productsPath, JSON.stringify(products, null, 2), (err2) => {
      if (err2)
        return res.status(500).json({ error: "Failed to update product" });
      res.json(products[idx]);
    });
  });
});

// DELETE /products/:id
router.delete("/:id", (req, res) => {
  fs.readFile(productsPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read products" });
    let products = JSON.parse(data);
    const idx = products.findIndex((p: any) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Product not found" });
    const deleted = products.splice(idx, 1)[0];
    fs.writeFile(productsPath, JSON.stringify(products, null, 2), (err2) => {
      if (err2)
        return res.status(500).json({ error: "Failed to delete product" });
      res.json(deleted);
    });
  });
});

export default router;
