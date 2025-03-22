/**
 * Component Loader
 * Handles loading and configuring reusable HTML components
 */

// Load component
async function loadComponent(selector, componentPath, callback) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`[Component] Element with selector ${selector} not found`);
        return;
    }

    try {
        // Use the relative path that's known to work
        const path = './components/' + componentPath;
        
        console.log(`[Component] Loading component from: ${path}`);
        
        const response = await fetch(path);
        if (!response.ok) {
            console.error(`[Component] HTTP error! status: ${response.status}, URL: ${path}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let content = await response.text();
        console.log(`[Component] Successfully loaded content for ${componentPath}`);
        element.innerHTML = content;
        
        // Update links with correct paths
        const links = element.querySelectorAll('a[data-href]');
        links.forEach(link => {
            link.href = './' + link.getAttribute('data-href');
        });
        
        if (callback) callback();
        console.log(`[Component] Component ${componentPath} fully initialized`);
        
    } catch (error) {
        console.error(`[Component] Error loading component ${componentPath}:`, error);
        element.innerHTML = `<div class="error-message">
            Error loading component
            <small>${error.message}</small>
        </div>`;
    }
}

// Function to get the base path relative to the current page
function getBasePath() {
    console.log('[Path Resolution] Using relative path for components');
    return './';
}

// Load header component
function loadHeader() {
    loadComponent('#header', 'header.html', () => {
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
        updateActiveMenuItem();
    });
}

// Load footer component
function loadFooter() {
    loadComponent('#footer', 'footer.html', () => {
        // Update copyright year
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement && yearElement.textContent.includes('2025')) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
        }
    });
}

// Set the active menu item
function updateActiveMenuItem() {
    const currentPath = window.location.pathname;
    console.log(`[Navigation] Updating active menu item for path: ${currentPath}`);
    const menuItems = document.querySelectorAll('.navbar-menu a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        console.log(`[Navigation] Checking menu item: ${href}`);
        
        // Use simple path matching with relative paths
        if (currentPath.endsWith(href) || 
            (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
            console.log(`[Navigation] Setting active menu item: ${href}`);
            item.classList.add('active');
        }
    });
}

// Load breadcrumb component and configure it
function loadBreadcrumb(container, current, parent = null, parentUrl = null) {
    loadComponent(container, 'breadcrumb.html', () => {
        const currentElement = document.getElementById('breadcrumb-current');
        const parentElement = document.getElementById('breadcrumb-parent');
        const homeElement = document.getElementById('breadcrumb-home');
        
        if (currentElement) {
            currentElement.textContent = current;
        }
        
        if (parentElement) {
            if (parent) {
                parentElement.textContent = parent;
                if (parentUrl) {
                    parentElement.setAttribute('href', parentUrl);
                }
            } else {
                // Remove parent level if not needed
                parentElement.previousSibling?.remove(); // Remove separator
                parentElement.remove();
            }
        }
        
        if (homeElement) {
            // Update home link with relative path
            homeElement.setAttribute('href', './index.html');
        }
    });
}

// Load hero component and configure it
function loadHero(container, options = {}) {
    loadComponent(container, 'hero.html', () => {
        const { title, description, ctaText, ctaUrl, imageSrc, imageAlt } = options;
        
        // Set hero content
        if (title) {
            const titleElement = document.getElementById('hero-title');
            if (titleElement) titleElement.textContent = title;
        }
        
        if (description) {
            const descElement = document.getElementById('hero-description');
            if (descElement) descElement.textContent = description;
        }
        
        if (ctaText) {
            const ctaElement = document.getElementById('hero-cta');
            if (ctaElement) {
                ctaElement.textContent = ctaText;
                if (ctaUrl) ctaElement.setAttribute('href', ctaUrl);
            }
        } else {
            // Remove CTA if not needed
            const ctaElement = document.getElementById('hero-cta');
            if (ctaElement) ctaElement.style.display = 'none';
        }
        
        // Configure the background image for static hero
        const heroStatic = document.querySelector('.hero-static');
        if (heroStatic && imageSrc) {
            heroStatic.style.backgroundImage = `url('${imageSrc}')`;
        }
    });
}

// Load hero component with overlay background
function loadHeroWithOverlay(container, options = {}) {
    loadComponent(container, 'hero.html', () => {
        const { title, description, ctaText, ctaUrl, backgroundImage } = options;
        
        // Set hero content
        if (title) {
            const titleElement = document.getElementById('hero-title');
            if (titleElement) titleElement.textContent = title;
        }
        
        if (description) {
            const descElement = document.getElementById('hero-description');
            if (descElement) descElement.textContent = description;
        }
        
        if (ctaText) {
            const ctaElement = document.getElementById('hero-cta');
            if (ctaElement) {
                ctaElement.textContent = ctaText;
                if (ctaUrl) ctaElement.setAttribute('href', ctaUrl);
            }
        } else {
            // Remove CTA if not needed
            const ctaElement = document.getElementById('hero-cta');
            if (ctaElement) ctaElement.style.display = 'none';
        }
        
        // Set the background image for the hero static component
        const heroStatic = document.querySelector('.hero-static');
        if (heroStatic && backgroundImage) {
            console.log('[Hero] Setting background image:', backgroundImage);
            heroStatic.style.backgroundImage = `url('${backgroundImage}')`;
        }
    });
}

// Document ready function
document.addEventListener('DOMContentLoaded', () => {
    // Load components if their containers exist
    if (document.querySelector('#header')) {
        loadHeader();
    }
    
    if (document.querySelector('#footer')) {
        loadFooter();
    }
    
    // Initialize any breadcrumb containers
    const breadcrumbContainer = document.querySelector('#breadcrumb-container');
    if (breadcrumbContainer) {
        loadBreadcrumb('#breadcrumb-container', document.title);
    }
}); 