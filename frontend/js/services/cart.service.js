const CartService = {
    CART_KEY: 'simple_shop_cart',
    listeners: [],

    getCart() {
        try {
            const cart = localStorage.getItem(this.CART_KEY);
            return cart ? JSON.parse(cart) : [];
        } catch (e) {
            return [];
        }
    },

    saveCart(cart) {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
        this.notifyListeners();
    },

    addItem(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        this.saveCart(cart);
        UI.showToast(`${product.name} added to cart!`);
    },

    removeItem(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        this.saveCart(cart);
    },

    updateQuantity(productId, change) {
        let cart = this.getCart();
        const item = cart.find(item => item.id === productId);

        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                return this.removeItem(productId);
            }
        }
        this.saveCart(cart);
    },

    clearCart() {
        localStorage.removeItem(this.CART_KEY);
        this.notifyListeners();
    },

    getTotal() {
        return this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getCount() {
        return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
    },

    // Simple observer pattern for UI updates
    subscribe(listener) {
        this.listeners.push(listener);
    },

    notifyListeners() {
        const count = this.getCount();
        this.listeners.forEach(listener => listener(count));
    }
};
