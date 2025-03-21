/**
 * Fix Components Loading
 * This script fixes component loading in breast cancer pages
 */

const fs = require('fs');
const path = require('path');

// Define the directory with breast cancer pages
const breastCancerDir = './pages/breast-cancer';

// Get all subdirectories
const subdirs = fs.readdirSync(breastCancerDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => path.join(breastCancerDir, dirent.name));

// Add the breast cancer directory itself
subdirs.push(breastCancerDir);

// Process each directory
subdirs.forEach(dir => {
  // Get all HTML files in this directory
  const files = fs.readdirSync(dir)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(dir, file));

  // Process each file
  files.forEach(file => {
    try {
      console.log(`Processing ${file}...`);
      
      // Read the file
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;
      
      // Fix component loading paths
      if (content.includes("loadComponent('#header', basePath + 'components/header.html')")) {
        console.log(`Fixing component paths in ${file}`);
        content = content.replace(
          "loadComponent('#header', basePath + 'components/header.html')",
          "loadComponent('#header', 'header.html')"
        );
        content = content.replace(
          "loadComponent('#footer', basePath + 'components/footer.html')",
          "loadComponent('#footer', 'footer.html')"
        );
        modified = true;
      }
      
      // Fix basePath definition
      if (content.includes('function resolveAssetPaths()') && content.includes('const basePath = \'/Cancer/\';') && 
          content.includes('// Define basePath for component loading') && 
          content.includes('let basePath = ')) {
        
        console.log(`Fixing basePath definition in ${file}`);
        
        // Replace let basePath = ... with const basePath = '/Cancer/';
        content = content.replace(
          /\/\/ Define basePath for component loading\s*\n\s*let basePath = [^;]*;/,
          ''
        );
        
        // Add basePath at the beginning of resolveAssetPaths()
        if (!content.includes('// Define basePath for component loading\n        const basePath = \'/Cancer/\';')) {
          content = content.replace(
            'function resolveAssetPaths() {',
            '// Define basePath for component loading\n        const basePath = \'/Cancer/\';\n        \n        function resolveAssetPaths() {'
          );
        }
        
        modified = true;
      }
      
      // Fix image loading
      if (content.includes('data-src="../../../images/content/')) {
        console.log(`Fixing image paths in ${file}`);
        content = content.replace(
          /<img src="" ([^>]*) data-src="\.\.\/\.\.\/\.\.\/images\/content\/([^"]+)"/g,
          '<img src="/Cancer/images/content/$2" $1'
        );
        modified = true;
      }
      
      // Save the file if modified
      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
      } else {
        console.log(`No changes needed for ${file}`);
      }
      
    } catch (error) {
      console.error(`Error processing ${file}: ${error.message}`);
    }
  });
});

console.log('Component fixing complete!'); 