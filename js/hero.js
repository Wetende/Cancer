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
        ctaUrl: '/Cancer/pages/contact.html',
        backgroundImage: '../images/backgrounds/breast-cancer-2773774_1920.jpg'
    },
    'Resources': {
        title: 'Resources',
        description: 'Access helpful resources and support services',
        ctaText: 'Need Assistance?',
        ctaUrl: '/Cancer/pages/contact.html',
        backgroundImage: '../images/backgrounds/women.jpg'
    },
    'FAQ': {
        title: 'Frequently Asked Questions',
        description: 'Find answers to common questions about breast cancer screening',
        ctaText: 'Contact Us',
        ctaUrl: '/Cancer/pages/contact.html',
        backgroundImage: '../images/backgrounds/breast.jpg'
    },
    'Contact Us': {
        title: 'Contact Us',
        description: 'We are here to help you with your breast health journey. Reach out to our dedicated team for information, support, and guidance.',
        ctaText: 'Get in Touch Now',
        ctaUrl: '#contact-form',
        backgroundImage: '../images/backgrounds/doctor-650534_1280.jpg'
    },
    'Breast Cancer Screening': {
        title: 'Breast Cancer Screening',
        description: 'Early Detection Saves Lives',
        ctaText: 'Contact Our Team',
        ctaUrl: '/Cancer/pages/contact.html',
        backgroundImage: '../images/backgrounds/october-7521183_1280.jpg'
    },
    'Risk Assessment Calculator': {
        title: 'Breast Cancer Risk Calculator',
        description: 'Assess your personal risk factors and get recommendations',
        ctaText: 'Get Support',
        ctaUrl: '/Cancer/pages/contact.html',
        backgroundImage: '../images/backgrounds/breast-cancer-2773775_1280.jpg'
    },
    'About Screening': {
        title: 'About Breast Cancer Screening',
        description: 'Understanding screening options and guidelines',
        ctaText: 'Contact Us Today', 
        ctaUrl: '/Cancer/pages/contact.html', 
        backgroundImage: '../images/backgrounds/shower.jpg'
    },
    'default': {
        title: 'Nzoya Foundation',
        description: 'Supporting your breast health journey',
        ctaText: 'Contact Us', 
        ctaUrl: '/Cancer/pages/contact.html',
        backgroundImage: '../images/backgrounds/breast-cancer-6701684_1280.jpg'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('[Hero] Initializing hero component...');
    
    // Only initialize on subpages
    const path = window.location.pathname;
    if (path.endsWith('/index.html') || path.endsWith('/') || path.endsWith('/Cancer/')) {
        console.log('[Hero] Home page detected, skipping hero initialization');
        return;
    }
    
    const heroContainer = document.getElementById('hero-container');
    if (!heroContainer) {
        console.log('[Hero] No hero container found on page');
        return;
    }
    
    // Get the page title
    const pageTitle = document.title.split('|')[0].trim();
    console.log('[Hero] Page title:', pageTitle);
    
    // Get the configuration for this page
    const config = heroConfigs[pageTitle] || heroConfigs['default'];
    console.log('[Hero] Using configuration:', config);
    
    // Create hero content
    const heroHTML = `
    <section class="hero">
        <div class="hero-content">
            <div class="hero-static" style="background-image: url('${config.backgroundImage}');">
                <div class="hero-text">
                    <h1 id="hero-title">${config.title}</h1>
                    <p class="lead" id="hero-description">${config.description}</p>
                    <a href="${config.ctaUrl}" class="btn-primary" id="hero-cta">${config.ctaText}</a>
                </div>
            </div>
        </div>
    </section>
    `;
    
    // Insert the hero content
    heroContainer.innerHTML = heroHTML;
    
    // Add a breadcrumb
    addBreadcrumbAfterHero(heroContainer, pageTitle);
});

// Add breadcrumb navigation after hero
function addBreadcrumbAfterHero(heroContainer, pageName) {
    if (!heroContainer) return;
    
    // Check if breadcrumb already exists
    const existingBreadcrumb = document.querySelector('.breadcrumb');
    if (existingBreadcrumb) return;
    
    const breadcrumb = document.createElement('nav');
    breadcrumb.className = 'breadcrumb container';
    breadcrumb.innerHTML = `<a href="/Cancer/index.html">Home</a> &gt; <span>${pageName}</span>`;
    
    // Insert after hero section
    heroContainer.parentNode.insertBefore(breadcrumb, heroContainer.nextSibling);
} 