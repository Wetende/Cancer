/**
 * Path Utilities
 * Provides helper functions to dynamically resolve paths regardless of installation directory
 */

/**
 * Dynamically determines the base path for assets based on current page location
 * @returns {string} Relative path prefix (e.g., '../', '../../', etc.)
 */
function getBasePath() {
  // Get the current path without the domain
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
}

/**
 * Resolves a path relative to the current page location
 * @param {string} targetPath - The target path to resolve (can start with / or not)
 * @returns {string} The resolved relative path
 */
function resolveRelativePath(targetPath) {
  // Get the base path
  const basePath = getBasePath();
  
  // Clean the target path (remove leading slash and "Cancer" if present)
  let cleanTarget = targetPath;
  
  // Remove leading slash if present
  if (cleanTarget.startsWith('/')) {
    cleanTarget = cleanTarget.substring(1);
  }
  
  // Remove "Cancer/" prefix if present
  if (cleanTarget.startsWith('Cancer/')) {
    cleanTarget = cleanTarget.substring(7);
  }
  
  // Combine the base path with the clean target
  return basePath + cleanTarget;
}

/**
 * Updates all absolute paths in the document to relative paths
 * Should be called after the DOM is fully loaded
 */
function updateAllPaths() {
  // Update all href attributes that start with /Cancer/
  document.querySelectorAll('a[href^="/Cancer/"]').forEach(link => {
    const href = link.getAttribute('href');
    link.setAttribute('href', resolveRelativePath(href));
  });
  
  // Update all src attributes that start with /Cancer/
  document.querySelectorAll('[src^="/Cancer/"]').forEach(element => {
    const src = element.getAttribute('src');
    element.setAttribute('src', resolveRelativePath(src));
  });
  
  // Update all background images in inline styles
  document.querySelectorAll('[style*="/Cancer/"]').forEach(element => {
    const style = element.getAttribute('style');
    if (style) {
      // Replace all occurrences of /Cancer/ in the style with the relative path
      const newStyle = style.replace(/\/Cancer\//g, getBasePath());
      element.setAttribute('style', newStyle);
    }
  });
  
  // Fix breadcrumbs
  const breadcrumbs = document.querySelectorAll('.breadcrumb');
  breadcrumbs.forEach(breadcrumb => {
    const homeLink = breadcrumb.querySelector('a[href="/Cancer/index.html"]') || 
                     breadcrumb.querySelector('a[href="/Cancer/"]');
    if (homeLink) {
      homeLink.setAttribute('href', resolveRelativePath('index.html'));
    }
  });
  
  console.log('Path conversion completed - all absolute paths converted to relative');
}

// Export functions for use in other scripts
window.getBasePath = getBasePath;
window.resolveRelativePath = resolveRelativePath;
window.updateAllPaths = updateAllPaths; 