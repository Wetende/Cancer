/**
 * Fix Subpage Paths
 * This script updates all subpages to use relative paths for components, CSS, and JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('[Page Fix] Initializing subpage path fix...');
    
    // Fix paths if we're on a subpage
    if (isSubpage()) {
        fixSubpagePaths();
    }
});

/**
 * Check if current page is a subpage (in the pages directory)
 */
function isSubpage() {
    const path = window.location.pathname;
    return path.includes('/pages/') || path.includes('/Cancer/pages/');
}

/**
 * Fix all resource paths for subpages
 */
function fixSubpagePaths() {
    console.log('[Page Fix] Fixing paths for subpage');
    
    // Fix CSS path
    const stylesLink = document.getElementById('styles-link');
    if (stylesLink) {
        const currentHref = stylesLink.getAttribute('href');
        if (currentHref.startsWith('/') || currentHref.startsWith('http')) {
            const newHref = '../css/styles.css';
            console.log(`[Page Fix] Updating CSS path from ${currentHref} to ${newHref}`);
            stylesLink.setAttribute('href', newHref);
        }
    }
    
    // Fix favicon path
    const faviconLink = document.getElementById('favicon-link');
    if (faviconLink) {
        const currentHref = faviconLink.getAttribute('href');
        if (currentHref.startsWith('/') || currentHref.startsWith('http')) {
            const newHref = '../images/favicon.svg';
            console.log(`[Page Fix] Updating favicon path from ${currentHref} to ${newHref}`);
            faviconLink.setAttribute('href', newHref);
        }
    }
    
    // Fix image paths
    document.querySelectorAll('img[src]').forEach(img => {
        const src = img.getAttribute('src');
        if (src.startsWith('/Cancer/images/')) {
            const newSrc = src.replace('/Cancer/images/', '../images/');
            console.log(`[Page Fix] Updating image path from ${src} to ${newSrc}`);
            img.setAttribute('src', newSrc);
        }
    });
    
    // Fix link paths
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('/Cancer/') && !href.startsWith('/Cancer/pages/')) {
            const newHref = href.replace('/Cancer/', '../');
            console.log(`[Page Fix] Updating link path from ${href} to ${newHref}`);
            link.setAttribute('href', newHref);
        } else if (href.startsWith('/Cancer/pages/')) {
            const newHref = href.replace('/Cancer/pages/', './');
            console.log(`[Page Fix] Updating page link path from ${href} to ${newHref}`);
            link.setAttribute('href', newHref);
        }
    });
    
    // Fix breadcrumb home link
    const breadcrumbHome = document.querySelector('.breadcrumb a');
    if (breadcrumbHome && breadcrumbHome.getAttribute('href') === '/Cancer/index.html') {
        breadcrumbHome.setAttribute('href', '../index.html');
    }
    
    console.log('[Page Fix] Path fixing complete');
} 