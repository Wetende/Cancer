/**
 * Fix Component Loading Issues
 * This script fixes the component loading issues in breast cancer pages
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Root directory to scan
const rootDir = './pages/breast-cancer';

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

// Function to fix component loading issues
async function fixComponentLoading(filePath) {
    try {
        let content = await readFileAsync(filePath, 'utf8');
        let modified = false;
        
        // Fix component loading
        if (content.includes('loadComponent(') && content.includes("basePath + 'components/")) {
            console.log(`Fixing component loading in ${filePath}`);
            
            // Remove 'components/' from the path since the loadComponent function already adds it
            content = content.replace(
                /loadComponent\((['"])#header\1,\s*basePath\s*\+\s*(['"])components\/header.html\2/g,
                'loadComponent($1#header$1, $2header.html$2'
            );
            
            content = content.replace(
                /loadComponent\((['"])#footer\1,\s*basePath\s*\+\s*(['"])components\/footer.html\2/g,
                'loadComponent($1#footer$1, $2footer.html$2'
            );
            
            modified = true;
        }
        
        // Fix basePath definition - move it before component loading
        if (content.includes('// Define basePath for component loading') && 
            content.includes('document.addEventListener(\'DOMContentLoaded\'')) {
            
            console.log(`Fixing basePath definition in ${filePath}`);
            
            // Extract the basePath definition
            const basePathRegex = /\/\/ Define basePath for component loading[\s\S]*?if \(path\.includes\('\/pages\/'\)\) \{[\s\S]*?\}/;
            const basePathMatch = content.match(basePathRegex);
            
            if (basePathMatch) {
                // Remove the original basePath definition
                content = content.replace(basePathRegex, '');
                
                // Insert it before the DOMContentLoaded event
                const domContentLoadedIndex = content.indexOf("document.addEventListener('DOMContentLoaded'");
                if (domContentLoadedIndex !== -1) {
                    // Find the previous line break
                    const prevLineBreakIndex = content.lastIndexOf('\n', domContentLoadedIndex);
                    
                    // Insert the basePath definition
                    content = content.slice(0, prevLineBreakIndex) + 
                              '\n        // Define basePath for component loading\n' +
                              '        let basePath = \'/Cancer/\';\n' +
                              content.slice(prevLineBreakIndex);
                    
                    modified = true;
                }
            }
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
            await fixComponentLoading(file);
        }
        
        console.log('Finished fixing component loading');
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Run the script
main(); 