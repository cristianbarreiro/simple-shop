const ApiService = {
    API_URL: '/api',

    async get(endpoint) {
        try {
            const response = await fetch(`${this.API_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            UI.showToast('Failed to load data. Please try again.', 'error');
            throw error;
        }
    },

    async getProducts() {
        return this.get('/products');
    },

    async getProductById(id) {
        return this.get(`/products/${id}`);
    }
};
