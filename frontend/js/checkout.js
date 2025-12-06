document.addEventListener('DOMContentLoaded', () => {
    const cart = CartService.getCart();
    const contentDiv = document.getElementById('checkout-content');

    if (cart.length === 0) {
        contentDiv.innerHTML = `
            <p>Your cart is empty. Nothing to checkout.</p>
            <a href="/" class="btn">Go Shopping</a>
        `;
        return;
    }

    const total = CartService.getTotal();
    const count = CartService.getCount();

    document.getElementById('summary-count').textContent = count;
    document.getElementById('summary-total').textContent = total.toFixed(2);

    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple Validation
        const nameInput = form.querySelector('input[name="name"]');
        const addressInput = form.querySelector('input[name="address"]');

        if (!nameInput.value.trim() || nameInput.value.length < 3) {
            UI.showToast('Please enter a valid full name (at least 3 chars).', 'error');
            nameInput.focus();
            return;
        }

        if (!addressInput.value.trim() || addressInput.value.length < 5) {
            UI.showToast('Please enter a valid address (at least 5 chars).', 'error');
            addressInput.focus();
            return;
        }

        // Simulate processing
        const btn = form.querySelector('button');
        btn.textContent = 'Processing...';
        btn.disabled = true;

        setTimeout(() => {
            CartService.clearCart();
            contentDiv.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h2 style="color: var(--accent-color);">Order Confirmed!</h2>
                    <p>Thank you for your purchase, <strong>${nameInput.value}</strong>.</p>
                    <p>We will ship to: ${addressInput.value}</p>
                    <a href="/" class="btn" style="margin-top: 1rem;">Back to Shop</a>
                    <br><br>
                    <small style="color: #999;">(Simulation)</small>
                </div>
            `;
            UI.showToast('Order placed successfully!', 'success');
        }, 1500);
    });
});
