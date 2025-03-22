/**
 * Fix Subpage Paths
 * This script dynamically fixes paths in subpages when they're loaded
 */

(function() {
    // This script automatically detects if the current page is a subpage
    // and fixes the paths to CSS, JS, and images accordingly
    console.log('[Path Fixer] Initializing path detection and fixing');
    
    // Run immediately to fix critical paths like CSS before page renders fully
    fixPaths();
    
    // Also listen for DOMContentLoaded to fix any remaining paths
    document.addEventListener('DOMContentLoaded', function() {
        fixRemainingPaths();
    });
    
    function isSubpage() {
        // Check if current URL contains /pages/ segment
        const path = window.location.pathname;
        return path.includes('/pages/') || path.includes('/Cancer/pages/');
    }
    
    function getBasePath() {
        if (isSubpage()) {
            console.log('[Path Fixer] Detected subpage, using relative path: ../');
            return '../';
        } else {
            console.log('[Path Fixer] Detected main page, using relative path: ./');
            return './';
        }
    }
    
    function fixPaths() {
        // Fix critical paths that should be corrected before DOM is fully loaded
        fixCssPaths();
        fixFaviconPath();
    }
    
    function fixRemainingPaths() {
        // Fix paths that can wait until DOM is fully loaded
        fixImagePaths();
        fixLinkPaths();
        fixScriptPaths();
        fixBreadcrumbHomePath();
        fixBackgroundImagePaths();
    }
    
    function fixCssPaths() {
        const basePath = getBasePath();
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        
        cssLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.startsWith('/Cancer/css/') || href.startsWith('/css/'))) {
                const newPath = href.replace(/^\/Cancer\/css\/|^\/css\//, basePath + 'css/');
                console.log(`[Path Fixer] Updating CSS path from ${href} to ${newPath}`);
                link.setAttribute('href', newPath);
            }
        });
    }
    
    function fixFaviconPath() {
        const basePath = getBasePath();
        const faviconLink = document.querySelector('link[rel="icon"]');
        
        if (faviconLink) {
            const href = faviconLink.getAttribute('href');
            if (href && (href.startsWith('/Cancer/images/') || href.startsWith('/images/'))) {
                const newPath = href.replace(/^\/Cancer\/images\/|^\/images\//, basePath + 'images/');
                console.log(`[Path Fixer] Updating favicon path from ${href} to ${newPath}`);
                faviconLink.setAttribute('href', newPath);
            }
        }
    }
    
    function fixImagePaths() {
        const basePath = getBasePath();
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && (src.startsWith('/Cancer/images/') || src.startsWith('/images/'))) {
                const newPath = src.replace(/^\/Cancer\/images\/|^\/images\//, basePath + 'images/');
                console.log(`[Path Fixer] Updating image path from ${src} to ${newPath}`);
                img.setAttribute('src', newPath);
            }
        });
    }
    
    function fixLinkPaths() {
        const basePath = getBasePath();
        const links = document.querySelectorAll('a');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                // Handle links to pages
                if (href.startsWith('/Cancer/pages/') || href.startsWith('/pages/')) {
                    const newPath = isSubpage() ? 
                        href.replace(/^\/Cancer\/pages\/|^\/pages\//, './') : 
                        href.replace(/^\/Cancer\/pages\/|^\/pages\//, 'pages/');
                    console.log(`[Path Fixer] Updating page link from ${href} to ${newPath}`);
                    link.setAttribute('href', newPath);
                } 
                // Handle links to the root
                else if (href === '/' || href === '/Cancer/' || href === '/Cancer/index.html') {
                    const newPath = isSubpage() ? '../index.html' : 'index.html';
                    console.log(`[Path Fixer] Updating home link from ${href} to ${newPath}`);
                    link.setAttribute('href', newPath);
                }
            }
        });
    }
    
    function fixScriptPaths() {
        const basePath = getBasePath();
        const scripts = document.querySelectorAll('script');
        
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            if (src && (src.startsWith('/Cancer/js/') || src.startsWith('/js/'))) {
                const newPath = src.replace(/^\/Cancer\/js\/|^\/js\//, basePath + 'js/');
                console.log(`[Path Fixer] Updating script path from ${src} to ${newPath}`);
                script.setAttribute('src', newPath);
            }
        });
    }
    
    function fixBreadcrumbHomePath() {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            const homeLink = breadcrumb.querySelector('a[href="/"]') || 
                             breadcrumb.querySelector('a[href="/Cancer/"]') || 
                             breadcrumb.querySelector('a[href="/Cancer/index.html"]');
            
            if (homeLink) {
                const newPath = isSubpage() ? '../index.html' : 'index.html';
                console.log(`[Path Fixer] Updating breadcrumb home link to ${newPath}`);
                homeLink.setAttribute('href', newPath);
            }
        }
    }
    
    function fixBackgroundImagePaths() {
        const basePath = getBasePath();
        const elementsWithBgImage = document.querySelectorAll('[style*="background-image"]');
        
        elementsWithBgImage.forEach(el => {
            const style = el.getAttribute('style');
            if (style && (style.includes('/Cancer/images/') || style.includes('/images/'))) {
                const newStyle = style
                    .replace(/\/Cancer\/images\//g, basePath + 'images/')
                    .replace(/\/images\//g, basePath + 'images/');
                console.log(`[Path Fixer] Updating background image in style from ${style} to ${newStyle}`);
                el.setAttribute('style', newStyle);
            }
        });
    }
})(); 