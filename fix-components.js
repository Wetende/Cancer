/**
 * Component Loading Fix
 * This script attempts to fix component loading issues by trying different paths.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('[Fix] Components fix script initialized');
    
    // Wait a short time to see if normal loading works
    setTimeout(() => {
        checkAndFixComponents();
    }, 500);
});

// Check if components loaded correctly and fix if not
function checkAndFixComponents() {
    console.log('[Fix] Checking components loading status');
    
    // Check if header was loaded
    const header = document.getElementById('header');
    if (header && (!header.innerHTML || header.innerHTML.includes('error-message'))) {
        console.log('[Fix] Header not loaded properly, attempting fix');
        loadHeaderFallback();
    }
    
    // Check if footer was loaded
    const footer = document.getElementById('footer');
    if (footer && (!footer.innerHTML || footer.innerHTML.includes('error-message'))) {
        console.log('[Fix] Footer not loaded properly, attempting fix');
        loadFooterFallback();
    }
}

// Fallback function to load header with multiple path attempts
function loadHeaderFallback() {
    loadComponentFallback('header', 'header.html');
}

// Fallback function to load footer with multiple path attempts
function loadFooterFallback() {
    loadComponentFallback('footer', 'footer.html');
}

// Fallback component loader that tries multiple paths
async function loadComponentFallback(elementId, componentFilename) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`[Fix] Element #${elementId} not found`);
        return;
    }
    
    // Define possible paths to try
    const paths = [
        `/Cancer/components/${componentFilename}`,
        `./components/${componentFilename}`,
        `../components/${componentFilename}`,
        `components/${componentFilename}`,
        `/components/${componentFilename}`,
        `http://${window.location.hostname}/Cancer/components/${componentFilename}`,
        `http://${window.location.hostname}/components/${componentFilename}`,
        `${window.location.origin}/Cancer/components/${componentFilename}`,
        `${window.location.origin}/components/${componentFilename}`
    ];
    
    console.log(`[Fix] Attempting to load ${componentFilename} from multiple paths`);
    
    // Try each path until one works
    for (const path of paths) {
        try {
            console.log(`[Fix] Trying path: ${path}`);
            const response = await fetch(path);
            
            if (response.ok) {
                console.log(`[Fix] Successfully loaded ${componentFilename} from ${path}`);
                const content = await response.text();
                element.innerHTML = content;
                
                // Initialize any component-specific functionality
                if (elementId === 'header') {
                    initHeader();
                } else if (elementId === 'footer') {
                    initFooter();
                }
                
                return; // Exit if successful
            }
        } catch (error) {
            console.warn(`[Fix] Error loading from ${path}:`, error);
        }
    }
    
    // If all paths failed, show error
    console.error(`[Fix] All paths failed for ${componentFilename}`);
    element.innerHTML = `
        <div style="padding: 20px; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Failed to load ${componentFilename}. 
            <br>Please check your network connection or try refreshing the page.
        </div>
    `;
}

// Initialize header functionality
function initHeader() {
    // Initialize mobile menu toggle
    const menuToggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Update active menu item based on current page
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.navbar-menu a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath.endsWith(href) || 
            (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
            item.classList.add('active');
        }
    });
}

// Initialize footer functionality
function initFooter() {
    // Update copyright year
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement && yearElement.textContent.includes('2025')) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
} 