"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const productsPath = path_1.default.join(__dirname, "../../products.json");
// GET /products
router.get("/", (req, res) => {
    fs_1.default.readFile(productsPath, "utf-8", (err, data) => {
        if (err)
            return res.status(500).json({ error: "Failed to read products" });
        const products = JSON.parse(data);
        res.json(products);
    });
});
// GET /products/:id
router.get("/:id", (req, res) => {
    fs_1.default.readFile(productsPath, "utf-8", (err, data) => {
        if (err)
            return res.status(500).json({ error: "Failed to read products" });
        const products = JSON.parse(data);
        const product = products.find((p) => p.id === req.params.id);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        res.json(product);
    });
});
exports.default = router;
