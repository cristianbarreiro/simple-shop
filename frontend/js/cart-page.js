const renderCart = () => {
    const cartContent = document.getElementById('cart-content');
    const cart = getCart();

    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty.</p><a href="/" class="btn">Start Shopping</a>';
        return;
    }

    const total = getCartTotal();

    let html = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    html += cart.map(item => `
        <tr>
            <td>
                <a href="product.html?id=${item.id}" style="text-decoration:none; color:inherit; font-weight:500;">
                    ${item.name}
                </a>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button class="btn btn-secondary" onclick="changeQty(${item.id}, -1)" style="padding: 2px 8px;">-</button>
                <span style="margin: 0 10px;">${item.quantity}</span>
                <button class="btn btn-secondary" onclick="changeQty(${item.id}, 1)" style="padding: 2px 8px;">+</button>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="btn btn-danger" onclick="removeItem(${item.id})">Remove</button>
            </td>
        </tr>
    `).join('');

    html += `
            </tbody>
        </table>

        <div class="cart-summary">
            <div class="total-row">Total: $${total.toFixed(2)}</div>
            <a href="checkout.html" class="btn">Proceed to Checkout</a>
        </div>
    `;

    cartContent.innerHTML = html;
};

// Wrappers for global access in HTML onclick attributes
window.changeQty = (id, change) => {
    updateQuantity(id, change);
    renderCart(); // Re-render to show updates
};

window.removeItem = (id) => {
    removeFromCart(id);
    renderCart();
};

document.addEventListener('DOMContentLoaded', renderCart);
