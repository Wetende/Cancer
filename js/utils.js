/**
 * Utility Functions
 */

// Path management utilities
const utils = {
    // Get the base path relative to the current page for asset loading
    getBasePath: function() {
        // Always return absolute path for consistent asset loading
        return '/Cancer/';
        
        /* Original implementation
        const path = window.location.pathname;
        let depth = 0;
        
        // Count directory levels
        if (path.includes('/pages/')) {
            depth = 1;
            
            // Check for subdirectories
            const segments = path.split('/');
            depth = segments.length - 2; // Adjust for domain and filename
        }
        
        return depth === 0 ? '' : '../'.repeat(depth);
        */
    },
    
    // Resolve a path relative to the current page
    resolvePath: function(path) {
        const basePath = this.getBasePath();
        return `${basePath}${path}`;
    },
    
    // Get URL parameters as an object
    getUrlParams: function() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split('&');
        
        for (let i = 0; i < pairs.length; i++) {
            if (!pairs[i]) continue;
            
            const pair = pairs[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        
        return params;
    },
    
    // Get current page name without extension
    getCurrentPage: function() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename.replace(/\.[^/.]+$/, ""); // Remove extension
    },
    
    // Format a date
    formatDate: function(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Debounce function for performance optimization
    debounce: function(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Helper for smooth scrolling to element
    scrollToElement: function(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// Export utils for use in other scripts
window.utils = utils; 