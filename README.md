# Breast Cancer Screening Information Website

A static informational website about breast cancer screening with Google Forms integration for appointment scheduling.

## Overview

This website provides comprehensive information about breast cancer screening, including:

- Types of screenings available (mammograms, MRIs, breast exams)
- Screening guidelines and recommendations
- Facility locations and contact information
- Frequently asked questions
- Resources in multiple languages
- Appointment scheduling through Google Forms

## Features

- Responsive design for all devices
- Interactive FAQ accordion
- Smooth scrolling navigation
- Google Forms integration for appointment requests
- Mobile-friendly navigation
- Accessibility considerations
- Custom 404 error page

## Technical Implementation

The website is built using:

- HTML5 for structure
- CSS3 for styling (with custom properties and responsive design)
- Vanilla JavaScript for interactivity
- Google Forms for appointment scheduling
- Font Awesome for icons
- Google Fonts for typography

## Project Structure

```
/
├── index.html           # Main HTML file
├── 404.html             # Custom error page
├── css/
│   └── styles.css       # CSS styles
├── js/
│   └── main.js          # JavaScript functionality
├── images/              # Website images
│   ├── logo.svg         # Site logo
│   └── favicon.svg      # Favicon
├── form-structure.md    # Google Form structure documentation
├── .htaccess            # Server configuration
└── README.md            # Project documentation
```

## Google Forms Integration

The website uses an embedded Google Form to handle appointment scheduling requests. The form is embedded in the "Schedule a Screening" section.

### Setting Up the Google Form

A detailed structure for the Google Form is provided in the `form-structure.md` file. To implement:

1. Create a new Google Form following the structure outlined in `form-structure.md`
2. Configure the form settings as recommended
3. Get the embed code from the "Send" button > "< >" option
4. Replace the iframe src in the index.html file with your new form URL

## Local Development

To run this website locally:

1. Clone the repository
2. Open index.html in your browser
3. For best results, use a local server (e.g., Live Server in VSCode)

## Deployment

This is a static website that can be deployed to any web hosting service:

1. Upload all files to your web hosting service
2. Ensure directory structure is maintained
3. No server-side processing is required

## Customization

To customize this website:

- Update content in index.html
- Modify styles in css/styles.css
- Change colors by updating the CSS custom properties in :root
- Add your own images to the images directory
- Edit the JavaScript functionality in js/main.js

## Image Credits

The website uses SVG graphics created specifically for this project. The logo and favicon are generated programmatically with SVG code.

## License

This project is available for personal and commercial use.

## Contact

For questions or support, please contact [your contact information]. 