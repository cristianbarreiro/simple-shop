const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db/products.json');

const getProducts = (callback) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        try {
            const products = JSON.parse(data);
            callback(null, products);
        } catch (parseErr) {
            callback(parseErr, null);
        }
    });
};

// GET /api/products
router.get('/', (req, res) => {
    getProducts((err, products) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read database" });
        }
        res.json(products);
    });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    getProducts((err, products) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read database" });
        }
        const product = products.find(p => p.id === id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    });
});

module.exports = router;
