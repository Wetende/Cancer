#!/bin/bash

# Breast Cancer Screening Website Deployment Script
# This script helps prepare and deploy the website to a production server

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Breast Cancer Screening Website Deployment${NC}"
echo -e "${GREEN}=========================================${NC}"

# Check if required commands are available
command -v sass >/dev/null 2>&1 || { echo -e "${RED}Error: sass is required but not installed. Install with: npm install -g sass${NC}"; exit 1; }
command -v uglifyjs >/dev/null 2>&1 || { echo -e "${RED}Error: uglifyjs is required but not installed. Install with: npm install -g uglify-js${NC}"; exit 1; }

# Create build directory
echo -e "${YELLOW}Creating build directory...${NC}"
rm -rf build
mkdir -p build/{css,js,images,fonts,data}

# Compile and minify SCSS
echo -e "${YELLOW}Compiling and minifying CSS...${NC}"
sass scss/main.scss:build/css/styles.css --style compressed --no-source-map

# Minify JavaScript
echo -e "${YELLOW}Minifying JavaScript...${NC}"
# First process individual files
for file in js/*.js; do
  if [[ "$file" != "js/main.min.js" ]]; then
    filename=$(basename -- "$file")
    uglifyjs "$file" -o "build/js/${filename%.js}.min.js" -c -m
    echo "  Minified: $filename"
  fi
done

# Copy HTML files
echo -e "${YELLOW}Copying HTML files...${NC}"
cp *.html build/
cp -r pages build/

# Copy images
echo -e "${YELLOW}Copying images...${NC}"
cp -r images/* build/images/

# Copy fonts
echo -e "${YELLOW}Copying fonts...${NC}"
cp -r fonts/* build/fonts/

# Copy data files
echo -e "${YELLOW}Copying data files...${NC}"
cp -r data/* build/data/

# Update references in HTML files to use minified versions
echo -e "${YELLOW}Updating HTML references...${NC}"
find build -name "*.html" -exec sed -i 's/css\/styles.css/css\/styles.css/g' {} \;
find build -name "*.html" -exec sed -i 's/js\/\([a-zA-Z-]*\)\.js/js\/\1.min.js/g' {} \;

# Create .htaccess file for Apache
echo -e "${YELLOW}Creating .htaccess file...${NC}"
cat > build/.htaccess << EOL
# Enable Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# Set expiration headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 day"
</IfModule>

# Enable keep-alive
<IfModule mod_headers.c>
  Header set Connection keep-alive
</IfModule>

# Error pages
ErrorDocument 404 /404.html
EOL

echo -e "${GREEN}Build complete! Files are ready in the 'build' directory.${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Upload the contents of the 'build' directory to your web server"
echo "2. Ensure proper file permissions (typically 644 for files, 755 for directories)"
echo "3. Test the website to ensure all links and resources work correctly"

# Deployment to server option
read -p "Do you want to deploy to a server now? (y/n): " deploy_answer
if [[ "$deploy_answer" == "y" || "$deploy_answer" == "Y" ]]; then
  read -p "Enter the server address (e.g., user@example.com): " server
  read -p "Enter the destination directory: " dest_dir
  
  echo -e "${YELLOW}Deploying to $server:$dest_dir...${NC}"
  rsync -avz --delete build/ "$server:$dest_dir"
  
  echo -e "${GREEN}Deployment complete!${NC}"
else
  echo -e "${YELLOW}Skipping deployment.${NC}"
fi

exit 0 