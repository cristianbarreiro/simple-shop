document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');

    // Fetch products using helper from app.js
    const products = await fetchProducts();

    if (products.length === 0) {
        productList.innerHTML = '<p>No products found.</p>';
        return;
    }

    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <a href="product.html?id=${product.id}">
                <img src="${product.image_url}" alt="${product.name}" class="product-image">
            </a>
            <div class="product-info">
                <h3 class="product-title">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-desc">${product.description.substring(0, 60)}...</div>
                <button class="btn btn-block" onclick="addToCart({id: ${product.id}, name: '${product.name.replace(/'/g, "\\'")}', price: ${product.price}})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
});
