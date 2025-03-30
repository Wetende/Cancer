/**
 * Utility Functions
 */

// Path management utilities
const utils = {
    // Get the base path relative to the current page for asset loading
    getBasePath: function() {
        // If path-utils.js is loaded, use its functions
        if (window.getBasePath && typeof window.getBasePath === 'function') {
            return window.getBasePath();
        }

        const path = window.location.pathname;
        
        // Split the path into segments and calculate the depth
        const segments = path.split('/').filter(Boolean);
        
        // Find the index of "Cancer" in the path if it exists
        const cancerIndex = segments.findIndex(segment => segment.toLowerCase() === 'cancer');
        
        // Calculate depth relative to the root of the project
        let depth = 0;
        if (cancerIndex !== -1) {
            // If "Cancer" is in the path, measure depth from there
            depth = segments.length - cancerIndex - 1;
        } else {
            // Otherwise just use the number of segments
            depth = segments.length;
        }
        
        // Generate the appropriate number of "../" based on depth
        return depth > 0 ? '../'.repeat(depth) : './';
    },
    
    // Resolve a path relative to the current page
    resolvePath: function(path) {
        // If path-utils.js is loaded, use its functions
        if (window.resolveRelativePath && typeof window.resolveRelativePath === 'function') {
            return window.resolveRelativePath(path);
        }

        let cleanPath = path;
        
        // Remove leading slash if present
        if (cleanPath.startsWith('/')) {
            cleanPath = cleanPath.substring(1);
        }
        
        // Remove "Cancer/" prefix if present
        if (cleanPath.startsWith('Cancer/')) {
            cleanPath = cleanPath.substring(7);
        }
        
        const basePath = this.getBasePath();
        return `${basePath}${cleanPath}`;
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
    },
    
    // Update all absolute paths in the document to relative paths
    updatePaths: function() {
        // If path-utils.js is loaded, use its functions
        if (window.updateAllPaths && typeof window.updateAllPaths === 'function') {
            window.updateAllPaths();
            return;
        }

        // Update all href attributes that start with /Cancer/
        document.querySelectorAll('a[href^="/Cancer/"]').forEach(link => {
            const href = link.getAttribute('href');
            link.setAttribute('href', this.resolvePath(href));
        });
        
        // Update all src attributes that start with /Cancer/
        document.querySelectorAll('[src^="/Cancer/"]').forEach(element => {
            const src = element.getAttribute('src');
            element.setAttribute('src', this.resolvePath(src));
        });
        
        // Update all background images in inline styles
        document.querySelectorAll('[style*="/Cancer/"]').forEach(element => {
            const style = element.getAttribute('style');
            if (style) {
                // Replace all occurrences of /Cancer/ in the style with the relative path
                const newStyle = style.replace(/\/Cancer\//g, this.getBasePath());
                element.setAttribute('style', newStyle);
            }
        });
        
        console.log('Path conversion completed - all absolute paths converted to relative');
    }
};

// Export utils for use in other scripts
window.utils = utils;

// Automatically update paths when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    utils.updatePaths();
}); 