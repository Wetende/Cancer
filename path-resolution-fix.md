# CSS and Asset Path Resolution Fix

## Overview
This document outlines the changes made to fix path resolution issues in the Cancer Education website, particularly for CSS and component loading across different page depths.

## Problem
The website was using relative paths (`../`) based on directory depth, which caused inconsistent CSS loading and component references, especially in deeply nested pages.

## Changes Made

### 1. Updated `getBasePath()` Function
Modified both instances of the `getBasePath()` function to always return an absolute path:

**In `js/components.js`**:
```javascript
function getBasePath() {
    // Always return the absolute path to ensure consistent asset loading
    return '/Cancer/';
}
```

**In `js/utils.js`**:
```javascript
getBasePath: function() {
    // Always return absolute path for consistent asset loading
    return '/Cancer/';
}
```

### 2. Updated Template Asset Resolution
Modified the `resolveAssetPaths()` function in `templates/base.html` to use absolute paths:

```javascript
function resolveAssetPaths() {
    // Use absolute paths for consistent asset loading
    const basePath = '/Cancer/';
    
    // Update asset links
    document.getElementById('favicon-link').href = basePath + 'images/favicon.svg';
    document.getElementById('styles-link').href = basePath + 'css/styles.css';
    document.getElementById('utils-script').src = basePath + 'js/utils.js';
    document.getElementById('components-script').src = basePath + 'js/components.js';
    document.getElementById('main-script').src = basePath + 'js/main.js';
}
```

### 3. Updated Component Loading
Modified the `loadComponent()` function in `js/components.js` to use the absolute path from `getBasePath()`:

```javascript
async function loadComponent(selector, componentPath, callback) {
    // ...
    // Use absolute path for component loading
    const basePath = getBasePath();
    const fullPath = basePath + 'components/' + componentPath;
    // ...
}
```

### 4. Standardized CSS References
Created and ran a script (`fix-css-paths.js`) to update all HTML files to use absolute paths for CSS:

```javascript
// Replace the path with absolute path
content = content.replace(
    /<link[^>]*rel="stylesheet"[^>]*href="(?!\/Cancer)([^"]*css\/styles\.css)"([^>]*)>/g,
    '<link rel="stylesheet" id="styles-link" href="/Cancer/css/styles.css"$2>'
);
```

### 5. Added CSS Path Update in Main JS
Updated `js/main.js` to include a function that ensures CSS paths are absolute:

```javascript
function updateCssPath() {
    const stylesLink = document.getElementById('styles-link');
    if (stylesLink) {
        // Set absolute path to ensure CSS loads correctly
        const absolutePath = '/Cancer/css/styles.css';
        if (stylesLink.getAttribute('href') !== absolutePath) {
            console.log(`[Main] Updating CSS path to: ${absolutePath}`);
            stylesLink.setAttribute('href', absolutePath);
        }
    }
}
```

## Testing
Created a test page (`test-path.html`) to verify path resolution is working correctly and tested deeply nested pages to ensure CSS loads properly.

## Benefits
1. **Consistency**: All assets are loaded using absolute paths, regardless of page depth
2. **Maintainability**: Simplified path resolution logic
3. **Reliability**: Fixed CSS loading issues in deeply nested pages
4. **Performance**: Reduced unnecessary path calculations
5. **Debuggability**: Added logging to track path resolution

## Next Steps
1. Monitor for any remaining path issues
2. Consider similar approach for image and script assets if issues arise
3. Add comprehensive path resolution tests 