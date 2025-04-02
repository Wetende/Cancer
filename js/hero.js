/**
 * Hero Component Handler
 * Handles the configuration and initialization of the hero components
 */

// Configuration for page-specific heroes
const heroConfigs = {
    'Breast Cancer': {
        title: 'Learn About Breast Cancer',
        description: 'Learn about breast cancer, symptoms, and treatment options',
        ctaText: 'Get in Touch',
        ctaUrl: 'pages/contact.html',
        backgroundImage: '../images/content/breast-cancer-2773774_1920.jpg'
    },
    'Resources': {
        title: 'Resources',
        description: 'Access helpful resources and support services',
        ctaText: 'Need Assistance?',
        ctaUrl: 'pages/contact.html',
        backgroundImage: '../images/content/women.jpg'
    },
    'FAQ': {
        title: 'Frequently Asked Questions',
        description: 'Find answers to common questions about breast cancer screening',
        ctaText: 'Contact Us',
        ctaUrl: 'pages/contact.html',
        backgroundImage: '../images/content/breast.jpg'
    },
    'Contact Us': {
        title: 'Contact Us',
        description: 'We are here to help you with your breast health journey. Reach out to our dedicated team for information, support, and guidance.',
        ctaText: 'Get in Touch Now',
        ctaUrl: '#contact-form',
        backgroundImage: '../images/content/doctor-650534_1280.jpg'
    },
    'Breast Cancer Screening': {
        title: 'Breast Cancer Screening',
        description: 'Early Detection Saves Lives',
        ctaText: 'Contact Our Team',
        ctaUrl: 'pages/contact.html',
        backgroundImage: '../images/content/october-7521183_1280.jpg'
    },
    'Risk Assessment Calculator': {
        title: 'Breast Cancer Risk Calculator',
        description: 'Assess your personal risk factors and get recommendations',
        ctaText: 'Get Support',
        ctaUrl: 'pages/contact.html',
        backgroundImage: '../images/content/breast-cancer-2773775_1280.jpg'
    },
    'About Screening': {
        title: 'About Breast Cancer Screening',
        description: 'Understanding screening options and guidelines',
        ctaText: 'Contact Us Today', 
        ctaUrl: 'pages/contact.html', 
        backgroundImage: '../images/content/shower.jpg'
    },
    'Screening': {
        title: 'Breast Cancer Screening',
        description: 'Learn about screening methods and recommendations',
        ctaText: 'Schedule Screening', 
        ctaUrl: 'pages/contact.html', 
        backgroundImage: '../images/content/pink-ribbon-3715346_1280.jpg'
    },
    'About Breast Cancer': {
        title: 'Understanding Breast Cancer',
        description: 'Learn about types, symptoms, and treatments',
        ctaText: 'Learn More', 
        ctaUrl: 'pages/breast-cancer.html', 
        backgroundImage: '../images/content/medical-5051144_1280.jpg'
    },
    /* Breast Cancer Types Pages */
    'Ductal Carcinoma In Situ (DCIS)': {
        title: 'Ductal Carcinoma In Situ (DCIS)',
        description: 'Understanding non-invasive breast cancer that starts in the milk ducts',
        ctaText: 'Learn More', 
        ctaUrl: '#overview', 
        backgroundImage: '../images/content/breast-cancer-2773775_1280.jpg'
    },
    'Invasive Breast Cancer': {
        title: 'Invasive Breast Cancer',
        description: 'Understanding invasive breast cancer types and treatments',
        ctaText: 'Learn More', 
        ctaUrl: '#overview', 
        backgroundImage: '../images/content/medical-5051144_1280.jpg'
    },
    'Inflammatory Breast Cancer': {
        title: 'Inflammatory Breast Cancer',
        description: 'Understanding this rare and aggressive type of breast cancer',
        ctaText: 'Learn More', 
        ctaUrl: '#overview', 
        backgroundImage: '../images/content/operation-1807543_1280.jpg'
    },
    'Metaplastic Breast Cancer': {
        title: 'Metaplastic Breast Cancer',
        description: 'Understanding this rare form of invasive breast cancer',
        ctaText: 'Learn More', 
        ctaUrl: '#overview', 
        backgroundImage: '../images/content/doctor-650534_1280.jpg'
    },
    'Male Breast Cancer': {
        title: 'Male Breast Cancer',
        description: 'Understanding breast cancer in men',
        ctaText: 'Learn More', 
        ctaUrl: '#overview', 
        backgroundImage: '../images/content/october-7521183_1280.jpg'
    },
    "Paget's Disease of the Breast": {
        title: "Paget's Disease of the Breast",
        description: 'Understanding this rare type of breast cancer',
        ctaText: 'Learn More', 
        ctaUrl: '#overview', 
        backgroundImage: '../images/content/breast.jpg'
    },
    /* Treatment, Diagnosis and Support Pages */
    'Types of Breast Cancer': {
        title: 'Types of Breast Cancer',
        description: 'Understanding the different forms of breast cancer',
        ctaText: 'Explore Types', 
        ctaUrl: '#types', 
        backgroundImage: '../images/content/womanlying.jpg'
    },
    'Breast Cancer Facts and Statistics': {
        title: 'Facts & Statistics',
        description: 'Understanding the numbers behind breast cancer',
        ctaText: 'Learn More', 
        ctaUrl: '#key-statistics', 
        backgroundImage: '../images/content/ribon.jpg'
    },
    'Breast Cancer Diagnosis': {
        title: 'Breast Cancer Diagnosis',
        description: 'Understanding diagnostic procedures and what they mean',
        ctaText: 'Learn More', 
        ctaUrl: '#diagnostic-procedures', 
        backgroundImage: '../images/content/operation-1807543_1280.jpg'
    },
    'Treating Breast Cancer': {
        title: 'Breast Cancer Treatment',
        description: 'Understanding treatment options for breast cancer',
        ctaText: 'Learn More', 
        ctaUrl: '#treatment-options', 
        backgroundImage: '../images/content/treatment-4099432_1280.jpg'
    },
    'Metastatic Breast Cancer': {
        title: 'Metastatic Breast Cancer',
        description: 'Understanding advanced stage breast cancer',
        ctaText: 'Learn More', 
        ctaUrl: '#understanding-metastatic', 
        backgroundImage: '../images/content/womanstanding.jpg'
    },
    'Breast Cancer Survivorship': {
        title: 'Life After Treatment',
        description: 'Support and guidance for breast cancer survivors',
        ctaText: 'Learn More', 
        ctaUrl: '#survivorship-topics', 
        backgroundImage: '../images/content/survivor.jpg'
    },
    'Financial Assistance': {
        title: 'Financial Assistance',
        description: 'Resources to help with treatment costs and related expenses',
        ctaText: 'Find Resources', 
        ctaUrl: '#assistance-programs', 
        backgroundImage: '../images/content/pink-1821381_1280.jpg'
    },
    'Support Resources': {
        title: 'Support Resources',
        description: 'Finding emotional support during your breast cancer journey',
        ctaText: 'Find Support', 
        ctaUrl: '#support-groups', 
        backgroundImage: '../images/content/group of women.jpg'
    },
    'Breast Cancer Risk Factors': {
        title: 'Breast Cancer Risk Factors',
        description: 'Understanding what increases your risk of breast cancer',
        ctaText: 'Learn More', 
        ctaUrl: '#common-risk-factors', 
        backgroundImage: '../images/content/pink-ribbon-3715346_1280.jpg'
    },
    /* Statistics Pages */
    'Breast Cancer Survival Statistics': {
        title: 'Survival Statistics',
        description: 'Understanding breast cancer survival rates and factors affecting prognosis',
        ctaText: 'Learn More',
        ctaUrl: '#survival-rates',
        backgroundImage: '../images/content/womansmiling.jpg'
    },
    'Breast Cancer Incidence Statistics': {
        title: 'Incidence Statistics',
        description: 'Understanding the patterns and trends of breast cancer occurrence',
        ctaText: 'Learn More',
        ctaUrl: '#key-statistics',
        backgroundImage: '../images/content/cancer-5389738_1280.jpg'
    },
    /* Additional pages */
    'Breast Anatomy': {
        title: 'Breast Anatomy',
        description: 'Understanding breast structure and function',
        ctaText: 'Learn More', 
        ctaUrl: '#anatomy-basics', 
        backgroundImage: '../images/content/breast.jpg'
    },
    'Breast Cancer Education': {
        title: 'Breast Cancer Education',
        description: 'Resources to help understand breast cancer',
        ctaText: 'Learn More',
        ctaUrl: '#education-resources',
        backgroundImage: '../images/content/education.jpg'
    },
    'Breast Cancer Awareness': {
        title: 'Breast Cancer Awareness',
        description: 'Promoting awareness and early detection',
        ctaText: 'Get Involved',
        ctaUrl: '#awareness-events',
        backgroundImage: '../images/content/ribbon-breast-cancer-awareness-krvj14js3escu5gz.webp'
    },
    'Breast Health Resources': {
        title: 'Breast Health Resources',
        description: 'Educational materials and support resources',
        ctaText: 'Browse Resources',
        ctaUrl: '#resource-library',
        backgroundImage: '../images/content/educativematerial.jpg'
    },
    'default': {
        title: 'Nzoya Foundation',
        description: 'Supporting your breast health journey',
        ctaText: 'Contact Us', 
        ctaUrl: 'pages/contact.html',
        backgroundImage: '../images/content/breast-cancer-6701684_1280.jpg'
    }
};

// Initialize hero component based on page title
function initializeHero() {
    const heroContainer = document.getElementById('hero-container');
    if (!heroContainer) return;
    
    const pageName = getPageName();
    console.log(`[Hero] Initializing hero for page: ${pageName}`);
    
    // Find the appropriate hero config
    const config = heroConfigs[pageName] || {
        title: pageName,
        description: `Learn about ${pageName.toLowerCase()} and how we can help`,
        ctaText: 'Contact Us',
        ctaUrl: 'contact.html',
        backgroundImage: '../images/content/background-default.jpg'
    };
    
    console.log(`[Hero] Using hero config:`, config);
    
    // Add a hero overlay component
    loadHeroWithOverlay(heroContainer, config);
    
    // Add breadcrumb after the hero
    addBreadcrumbAfterHero(heroContainer, pageName);
}

// Helper to get the page name from the title or URL
function getPageName() {
    // Try to get from the title element
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const titleText = titleElement.textContent || '';
        // Extract the first part of the title (before any separator like | or -)
        const match = titleText.match(/^([^|:-]+)/);
        if (match && match[1]) {
            return match[1].trim();
        }
    }
    
    // Fallback to URL-based detection
    const path = window.location.pathname;
    // Check if we're in the home page
    if (path.endsWith('/index.html') || path.endsWith('/') || path.endsWith('/Cancer/')) {
        return 'Home';
    }
    
    // Extract the last part of the path
    const parts = path.split('/').filter(Boolean);
    if (parts.length) {
        let lastPart = parts[parts.length - 1];
        // Remove file extension if present
        lastPart = lastPart.replace(/\.html$/, '');
        // Replace dashes with spaces and capitalize words
        return lastPart
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
    
    return 'Page';
}

// Load hero component with text overlay
function loadHeroWithOverlay(container, config = {}) {
    if (!container) return;
    
    // Create hero element
    const heroHTML = `
        <div class="hero-static">
            <div class="hero-overlay"></div>
            <div class="hero-content container">
                <h1 id="hero-title">${config.title || 'Welcome'}</h1>
                <p id="hero-description">${config.description || 'Learn about our services and resources'}</p>
                <a href="${config.ctaUrl}" class="btn-primary" id="hero-cta">${config.ctaText || 'Learn More'}</a>
            </div>
        </div>
    `;
    
    // Insert hero into container
    container.innerHTML = heroHTML;
    
    // Set the background image
    const heroStatic = container.querySelector('.hero-static');
    if (heroStatic && config.backgroundImage) {
        heroStatic.style.backgroundImage = `url('${config.backgroundImage}')`;
    }
}

// Add breadcrumb after hero
function addBreadcrumbAfterHero(heroContainer, pageName) {
    if (!heroContainer) return;
    
    // Create breadcrumb container after hero
    const breadcrumbContainer = document.createElement('div');
    breadcrumbContainer.className = 'breadcrumb-container';
    breadcrumbContainer.innerHTML = `
        <div class="container">
            <nav class="breadcrumb" id="page-breadcrumb"></nav>
        </div>
    `;
    
    // Insert after hero
    heroContainer.after(breadcrumbContainer);
    
    // Create simple breadcrumb content
    const breadcrumb = document.getElementById('page-breadcrumb');
    if (breadcrumb) {
        // Get the base path using utils if available
        const homePath = window.utils && typeof window.utils.resolvePath === 'function' 
            ? window.utils.resolvePath('index.html')
            : 'index.html';
            
        breadcrumb.innerHTML = `<a href="${homePath}">Home</a> &gt; <span>${pageName}</span>`;
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', initializeHero); 