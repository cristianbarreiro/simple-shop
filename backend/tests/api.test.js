const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('http');
const app = require('../server'); // We need to export app from server.js

// Helper to make requests
const request = (path) => {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:3000${path}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        statusCode: res.statusCode,
                        body: JSON.parse(data)
                    });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, body: data });
                }
            });
        }).on('error', reject);
    });
};

// Since server.js starts listening immediately, we might need to handle that.
// Ideally server.js should export the app and only listen if not in test mode,
// or we just test against the running server if we accept it's running.
// For simplicity in this "simple-shop", let's assume we run against the started server.
// BUT, `require('../server')` might trigger `app.listen`.
// Let's modify server.js slightly to be testable or just use a separate test runner that assumes server is up?
// Better: Refactor server.js to export app.

describe('Product API', () => {
    test('GET /api/products returns list of products', async () => {
        const response = await request('/api/products');
        assert.strictEqual(response.statusCode, 200);
        assert.ok(Array.isArray(response.body), 'Body should be an array');
        assert.ok(response.body.length > 0, 'Should have products');
    });

    test('GET /api/products/:id returns single product', async () => {
        const response = await request('/api/products/1');
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.id, 1);
        assert.strictEqual(response.body.name, 'Classic White T-Shirt');
    });

    test('GET /api/products/999 returns 404', async () => {
        const response = await request('/api/products/999');
        assert.strictEqual(response.statusCode, 404);
    });
});
