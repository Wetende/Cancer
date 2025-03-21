/**
 * Fix Subpage Paths Script
 * This script updates all subpages to use absolute paths for CSS and JS
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Root directory to scan
const rootDir = './pages';

// Function to recursively find all HTML files
async function findHtmlFiles(dir) {
    const files = await fs.promises.readdir(dir);
    const htmlFiles = [];
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.promises.stat(filePath);
        
        if (stat.isDirectory()) {
            const subFiles = await findHtmlFiles(filePath);
            htmlFiles.push(...subFiles);
        } else if (file.endsWith('.html')) {
            htmlFiles.push(filePath);
        }
    }
    
    return htmlFiles;
}

// Function to fix paths in HTML files
async function fixPaths(filePath) {
    try {
        let content = await readFileAsync(filePath, 'utf8');
        let modified = false;
        
        // Fix CSS paths
        if (content.includes('rel="stylesheet"') && !content.includes('href="/Cancer/css/styles.css"')) {
            console.log(`Fixing CSS paths in ${filePath}`);
            
            // Replace relative paths with absolute paths
            content = content.replace(
                /<link[^>]*rel="stylesheet"[^>]*href="(?!\/|https?:\/\/)([^"]*css\/styles\.css)"([^>]*)>/g,
                '<link rel="stylesheet" id="styles-link" href="/Cancer/css/styles.css"$2>'
            );
            
            // Replace relative komen-theme paths
            content = content.replace(
                /<link[^>]*rel="stylesheet"[^>]*href="(?!\/|https?:\/\/)([^"]*css\/komen-theme\.css)"([^>]*)>/g,
                '<link rel="stylesheet" id="theme-link" href="/Cancer/css/komen-theme.css"$2>'
            );
            
            // Fix icon paths
            content = content.replace(
                /<link[^>]*rel="icon"[^>]*href="(?!\/|https?:\/\/)([^"]*)"([^>]*)>/g,
                '<link rel="icon" id="favicon-link" href="/Cancer/images/favicon.svg"$2>'
            );
            
            modified = true;
        }
        
        // Fix JavaScript paths
        if (content.includes('<script') && !content.includes('src="/Cancer/js/')) {
            console.log(`Fixing JavaScript paths in ${filePath}`);
            
            // Replace relative script paths
            content = content.replace(
                /<script[^>]*src="(?!\/|https?:\/\/)([^"]*js\/utils\.js)"([^>]*)>/g,
                '<script id="utils-script" src="/Cancer/js/utils.js"$2>'
            );
            
            content = content.replace(
                /<script[^>]*src="(?!\/|https?:\/\/)([^"]*js\/components\.js)"([^>]*)>/g,
                '<script id="components-script" src="/Cancer/js/components.js"$2>'
            );
            
            content = content.replace(
                /<script[^>]*src="(?!\/|https?:\/\/)([^"]*js\/hero\.js)"([^>]*)>/g,
                '<script id="hero-script" src="/Cancer/js/hero.js"$2>'
            );
            
            modified = true;
        }
        
        // Fix path resolution function
        if (content.includes('function resolveAssetPaths') && !content.includes('const basePath = \'/Cancer/\'')) {
            console.log(`Fixing path resolution function in ${filePath}`);
            
            // Replace relative path resolution with absolute
            content = content.replace(
                /function resolveAssetPaths\(\)[^{]*{[^}]*const path = window\.location\.pathname;[^}]*const basePath[^}]*}/s,
                `function resolveAssetPaths() {
    // Use absolute paths instead of relative paths
    const basePath = '/Cancer/';
    
    // Update asset links
    document.getElementById('favicon-link').href = basePath + 'images/favicon.svg';
    document.getElementById('styles-link').href = basePath + 'css/styles.css';
    if (document.getElementById('theme-link')) {
        document.getElementById('theme-link').href = basePath + 'css/komen-theme.css';
    }
    document.getElementById('utils-script').src = basePath + 'js/utils.js';
    document.getElementById('components-script').src = basePath + 'js/components.js';
    document.getElementById('hero-script').src = basePath + 'js/hero.js';
    
    // Update image paths
    const heroImg = document.getElementById('hero-img');
    if (heroImg && heroImg.getAttribute('data-src')) {
        heroImg.src = basePath + heroImg.getAttribute('data-src');
    }
}`
            );
            
            modified = true;
        }
        
        // Add theme-komen class to body if missing and it's a breast cancer page
        if (filePath.includes('breast-cancer') && !content.includes('<body class="theme-komen">')) {
            console.log(`Adding theme class to ${filePath}`);
            
            // Add theme class to body
            content = content.replace(
                /<body>/,
                '<body class="theme-komen">'
            );
            
            modified = true;
        }
        
        // Write changes if modified
        if (modified) {
            await writeFileAsync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}: ${error.message}`);
    }
}

// Main function
async function main() {
    try {
        const htmlFiles = await findHtmlFiles(rootDir);
        console.log(`Found ${htmlFiles.length} HTML files to process`);
        
        // Process each file
        for (const file of htmlFiles) {
            await fixPaths(file);
        }
        
        console.log('Finished updating paths');
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Run the script
main(); 