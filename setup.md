# Setup Guide for Breast Cancer Screening Website

This document provides instructions for setting up and running the Breast Cancer Screening Website project.

## Prerequisites

Before getting started, ensure you have the following installed on your system:

1. **Node.js** (v14.x or higher) and **npm** (v6.x or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node -v` and `npm -v`

2. **Web server** (for local development)
   - Options include:
     - XAMPP: [apachefriends.org](https://www.apachefriends.org/)
     - WAMP: [wampserver.com](https://www.wampserver.com/)
     - Live Server (VS Code extension)

## Installation Steps

1. **Clone or download the repository**
   - Place the files in your web server's document root (e.g., `htdocs` for XAMPP)

2. **Install development dependencies**
   - Open a terminal/command prompt in the project directory
   - Run the following command:
     ```
     npm install
     ```
   - This will install all the required dependencies defined in `package.json`

## SCSS Compilation

The project uses SCSS for styling. You'll need to compile the SCSS files to CSS:

1. **One-time build**
   - Run the following command to compile, prefix, and minify the SCSS:
     ```
     npm run build
     ```
   - This will generate `css/main.css` and `css/main.min.css`

2. **Development with watch mode**
   - For continuous compilation during development:
     ```
     npm run watch
     ```
   - This will automatically recompile when SCSS files change

## Project Structure

```
breast-cancer-screening-website/
├── css/                    # Compiled CSS files
├── documents/              # Project documentation
├── fonts/                  # Custom web fonts
├── images/                 # Image assets
├── js/                     # JavaScript files
├── scss/                   # SCSS source files
│   ├── pages/              # Page-specific styles
│   └── partials/           # Reusable components
├── videos/                 # Video assets
├── index.html              # Homepage
├── package.json            # Project configuration
└── setup.md                # This setup guide
```

## Using the Compiled CSS

In your HTML files, link to the CSS file like this:

```html
<!-- Development version -->
<link rel="stylesheet" href="css/main.css">

<!-- Production (minified) version -->
<link rel="stylesheet" href="css/main.min.css">
```

## Troubleshooting

If you encounter issues during setup or compilation:

1. **SCSS compilation errors**
   - Check the terminal output for specific errors
   - Verify that all required SCSS variables are defined in `scss/_variables.scss`

2. **Missing dependencies**
   - Run `npm install` again to ensure all dependencies are installed
   - Check for any error messages during installation

3. **Path issues**
   - Ensure that file paths in HTML, CSS, and JavaScript files are correct
   - Adjust paths if the project is not in the root directory of your web server

## Getting Help

If you need additional assistance:
1. Check the project documentation in the `documents` directory
2. Reach out to the project team
3. Refer to the resources listed in `external-resources.md` 