document.addEventListener('DOMContentLoaded', async () => {
    const mainContent = document.getElementById('main-content');
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        mainContent.innerHTML = '<p>Product not found.</p><a href="/" class="btn">Go Back Home</a>';
        return;
    }

    const product = await fetchProductById(productId);

    if (!product) {
        mainContent.innerHTML = '<p>Product not found.</p><a href="/" class="btn">Go Back Home</a>';
        return;
    }

    document.title = `${product.name} - Simple Shop`;

    mainContent.innerHTML = `
        <div class="product-detail">
            <div class="detail-image">
                <img src="${product.image_url}" alt="${product.name}">
            </div>
            <div class="detail-info">
                <h1>${product.name}</h1>
                <div class="price-tag">$${product.price.toFixed(2)}</div>
                <p>${product.description}</p>
                <div style="margin-top: 2rem;">
                    <button class="btn" style="padding: 1rem 2rem; font-size: 1.2rem;" 
                        onclick="addToCart({id: ${product.id}, name: '${product.name.replace(/'/g, "\\'")}', price: ${product.price}})">
                        Add to Cart
                    </button>
                    <br><br>
                    <a href="/" class="btn btn-secondary">Continue Shopping</a>
                </div>
            </div>
        </div>
    `;
});
