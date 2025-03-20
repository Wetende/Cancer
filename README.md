# Nzoya Foundation - Breast Cancer Screening Information Website

A comprehensive website providing information about breast cancer screening, resources, facility locator, and risk assessment tools to promote early detection and prevention in Bellevue, WA and surrounding communities.

![Nzoya Foundation Website](images/screenshot.png)

## Features

- **Educational Content**: Detailed information about breast cancer screening types, benefits, and recommendations
- **Comprehensive Breast Cancer Resources**: In-depth information about diagnosis, treatment, symptoms, and support
- **Facility Finder**: Interactive map to locate screening facilities in the Bellevue and Seattle area
- **Risk Calculator**: Personalized breast cancer risk assessment tool
- **Resource Library**: Articles, videos, and downloadable materials about breast health
- **FAQ Section**: Answers to common questions about breast cancer screening
- **Mobile Responsive**: Optimized for all devices from smartphones to desktop computers
- **Multilingual Support**: Content available in multiple languages for the diverse Bellevue community

## Project Structure

```
nzoya-foundation/
├── components/        # Reusable site components (header, footer)
├── css/              # Compiled CSS files
├── data/             # JSON data files for facilities and other dynamic content
├── fonts/            # Custom font files
├── images/           # Image assets 
├── js/               # JavaScript files
│   ├── utils.js      # Utility functions for path resolution
│   ├── components.js # Component loading functionality
│   └── main.js       # Main application script
├── pages/            # HTML pages
│   ├── about.html
│   ├── about-breast-cancer.html
│   ├── blog.html
│   ├── breast-cancer.html
│   ├── breast-cancer/  # Comprehensive breast cancer information
│   │   ├── diagnosis/
│   │   ├── screening/
│   │   ├── symptoms/
│   │   ├── treatment/
│   │   └── README.md  # Documentation for breast cancer section
│   ├── contact.html
│   ├── facilities.html
│   ├── faq.html
│   ├── resources.html
│   ├── risk-calculator.html
│   └── screening.html
├── scss/             # SCSS source files
│   ├── pages/        # Page-specific styles
│   ├── partials/     # Reusable components
│   └── main.scss     # Main SCSS file that imports all partials
├── index.html        # Homepage
├── deploy.sh         # Deployment script
└── README.md         # Project documentation
```

## Technology Stack

- **HTML5**: Semantic markup
- **SCSS/CSS3**: For styling, using a modular SCSS architecture
- **JavaScript**: For interactive elements and dynamic content
- **Google Maps API**: For the facilities locator feature
- **JSON**: For facility data storage and management

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/nzoya-foundation/breast-cancer-screening.git
   ```

2. Navigate to the project directory:
   ```
   cd breast-cancer-screening
   ```

3. If you have Sass installed globally, compile the SCSS files:
   ```
   sass scss/main.scss css/styles.css
   ```

4. For local development, use a local server:
   ```
   # Using Python 3
   python -m http.server
   
   # Using PHP
   php -S localhost:8000
   ```

5. Open your browser and navigate to http://localhost:8000

## Development

### SCSS Structure

The project uses a modular SCSS architecture:

- `_variables.scss`: Global variables for colors, fonts, etc.
- `_mixins.scss`: Reusable SCSS mixins
- `_typography.scss`: Typography styles
- `_base.scss`: Base element styles
- `pages/`: Page-specific styles
- `partials/`: Reusable component styles

### JavaScript

- Core functionality is in `js/main.js`
- Page-specific scripts are named accordingly (e.g., `facilities-map.js`)
- Third-party libraries are stored in `js/vendors/`

## Deployment

A deployment script (`deploy.sh`) is included to help build and deploy the website:

1. Make the script executable:
   ```
   chmod +x deploy.sh
   ```

2. Run the deployment script:
   ```
   ./deploy.sh
   ```

3. Follow the prompts to deploy to your server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Font Awesome](https://fontawesome.com/) for the icons
- [Google Fonts](https://fonts.google.com/) for typography
- [Google Maps API](https://developers.google.com/maps) for mapping functionality

## Contact

For questions or support, please email [info@nzoyafoundation.org](mailto:info@nzoyafoundation.org) 