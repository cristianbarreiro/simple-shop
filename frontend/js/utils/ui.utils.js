const UI = {
    showToast: (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        // Simple styles for the toast (injected here or could be in CSS)
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '4px',
            color: '#fff',
            zIndex: '1000',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            backgroundColor: type === 'error' ? '#e74c3c' : '#2ecc71',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        });

        document.body.appendChild(toast);

        // Trigger reflow
        void toast.offsetWidth;
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
};
