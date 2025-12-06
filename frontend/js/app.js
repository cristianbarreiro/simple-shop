// Main Layout Logic
document.addEventListener('DOMContentLoaded', () => {
    // Subscribe to cart changes to update header badge
    CartService.subscribe((count) => {
        const badge = document.getElementById('cart-count');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
        }
    });

    // Initial update
    CartService.notifyListeners();
});
