document.addEventListener('DOMContentLoaded', () => {
    const cart = getCart();

    if (cart.length === 0) {
        document.getElementById('checkout-content').innerHTML = `
            <p>Your cart is empty. Nothing to checkout.</p>
            <a href="/" class="btn">Go Shopping</a>
        `;
        return;
    }

    const total = getCartTotal();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('summary-count').textContent = count;
    document.getElementById('summary-total').textContent = total.toFixed(2);

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate processing
        const btn = e.target.querySelector('button');
        btn.textContent = 'Processing...';
        btn.disabled = true;

        setTimeout(() => {
            clearCart();
            document.getElementById('checkout-content').innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h2 style="color: var(--accent-color);">Order Confirmed!</h2>
                    <p>Thank you for your purchase.</p>
                    <a href="/" class="btn" style="margin-top: 1rem;">Back to Shop</a>
                </div>
            `;
        }, 1500);
    });
});
