/**
 * Fix CSS Paths Script
 * This script updates all CSS path references to use absolute paths (/Cancer/...)
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Root directory to scan
const rootDir = '.';

// Function to recursively find all HTML files
async function findHtmlFiles(dir) {
    const files = await fs.promises.readdir(dir);
    const htmlFiles = [];
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.promises.stat(filePath);
        
        if (stat.isDirectory() && file !== 'node_modules' && !file.startsWith('.')) {
            const subFiles = await findHtmlFiles(filePath);
            htmlFiles.push(...subFiles);
        } else if (file.endsWith('.html')) {
            htmlFiles.push(filePath);
        }
    }
    
    return htmlFiles;
}

// Function to fix CSS paths in a file
async function fixCssPaths(filePath) {
    try {
        let content = await readFileAsync(filePath, 'utf8');
        
        // Check if the file contains a CSS link without an absolute path
        const relativePathRegex = /<link[^>]*rel="stylesheet"[^>]*href="(?!\/Cancer)([^"]*css\/styles\.css)"[^>]*>/g;
        
        if (relativePathRegex.test(content)) {
            console.log(`Fixing CSS path in ${filePath}`);
            
            // Replace the path with absolute path
            content = content.replace(
                /<link[^>]*rel="stylesheet"[^>]*href="(?!\/Cancer)([^"]*css\/styles\.css)"([^>]*)>/g,
                '<link rel="stylesheet" id="styles-link" href="/Cancer/css/styles.css"$2>'
            );
            
            // Write the updated content back to the file
            await writeFileAsync(filePath, content, 'utf8');
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
        return false;
    }
}

// Main function to run the script
async function main() {
    try {
        console.log('Scanning for HTML files...');
        const htmlFiles = await findHtmlFiles(rootDir);
        console.log(`Found ${htmlFiles.length} HTML files`);
        
        let fixedCount = 0;
        
        for (const file of htmlFiles) {
            const fixed = await fixCssPaths(file);
            if (fixed) fixedCount++;
        }
        
        console.log(`Fixed CSS paths in ${fixedCount} files`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the script
main(); 