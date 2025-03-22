/**
 * Update All Subpages
 * This script updates all subpages to use relative paths for resources
 */

const fs = require('fs');
const path = require('path');

// Directory with pages
const pagesDir = './pages';

// Process all HTML files in the pages directory
function processDirectory(directory) {
    console.log(`Processing directory: ${directory}`);
    
    // Get all files and subdirectories
    const items = fs.readdirSync(directory, { withFileTypes: true });
    
    // Process each item
    items.forEach(item => {
        const itemPath = path.join(directory, item.name);
        
        if (item.isDirectory()) {
            // Recursively process subdirectories
            processDirectory(itemPath);
        } else if (item.isFile() && item.name.endsWith('.html')) {
            // Process HTML files
            updatePaths(itemPath);
        }
    });
}

// Update paths in a single HTML file
function updatePaths(filePath) {
    console.log(`Updating paths in: ${filePath}`);
    
    try {
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        let updatedContent = content;
        let modified = false;
        
        // Update CSS paths
        if (content.includes('href="/Cancer/css/')) {
            updatedContent = updatedContent.replace(/href="\/Cancer\/css\//g, 'href="../css/');
            modified = true;
        }
        
        // Update image paths in HTML
        if (content.includes('src="/Cancer/images/')) {
            updatedContent = updatedContent.replace(/src="\/Cancer\/images\//g, 'src="../images/');
            modified = true;
        }
        
        // Update favicon path
        if (content.includes('href="/Cancer/images/favicon')) {
            updatedContent = updatedContent.replace(/href="\/Cancer\/images\/favicon/g, 'href="../images/favicon');
            modified = true;
        }
        
        // Update JavaScript paths
        if (content.includes('src="/Cancer/js/')) {
            updatedContent = updatedContent.replace(/src="\/Cancer\/js\//g, 'src="../js/');
            modified = true;
        }
        
        // Update links to other pages
        if (content.includes('href="/Cancer/pages/')) {
            updatedContent = updatedContent.replace(/href="\/Cancer\/pages\//g, 'href="./');
            modified = true;
        }
        
        // Update links to home page
        if (content.includes('href="/Cancer/index.html"')) {
            updatedContent = updatedContent.replace(/href="\/Cancer\/index.html"/g, 'href="../index.html"');
            modified = true;
        }
        
        // Update links to root pages (not in pages directory)
        if (content.includes('href="/Cancer/')) {
            updatedContent = updatedContent.replace(/href="\/Cancer\//g, 'href="../');
            modified = true;
        }
        
        // Update background image paths in inline styles
        if (content.includes('background-image: url(\'/Cancer/images/')) {
            updatedContent = updatedContent.replace(/background-image: url\('\/Cancer\/images\//g, "background-image: url('../images/");
            modified = true;
        }
        
        // If changes were made, save the file
        if (modified) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ Updated paths in: ${filePath}`);
        } else {
            console.log(`ℹ️ No changes needed for: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

// Start processing
console.log('Starting to update paths in all subpages...');
processDirectory(pagesDir);
console.log('✅ Finished updating paths in all subpages'); 