/**
 * Main JavaScript
 * Entry point for the website
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('[Main] Initializing...');
    
    // Ensure CSS path is correct
    updateCssPath();
    
    // Load components if needed
    initComponents();
    
    // Initialize any page-specific functionality
    initPageSpecific();
    
    // Initialize accordion functionality
    initAccordion();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
    
    // Add active class to current navigation item
    highlightActiveNavItem();
    
    // Mobile navigation toggle
    initMobileNav();
    
    // Initialize hero slider
    initHeroSlider();
});

// Update CSS path to ensure it's using the relative path
function updateCssPath() {
    const stylesLink = document.getElementById('styles-link');
    if (stylesLink) {
        // Set relative path to ensure CSS loads correctly
        const relativePath = './css/styles.css';
        if (stylesLink.getAttribute('href') !== relativePath) {
            console.log(`[Main] Updating CSS path to: ${relativePath}`);
            stylesLink.setAttribute('href', relativePath);
        }
    }
}

// Initialize components
function initComponents() {
    // Check if components need to be loaded
    if (typeof loadHeader === 'function' && document.querySelector('#header')) {
        console.log('[Main] Loading header component');
        loadHeader();
    }
    
    if (typeof loadFooter === 'function' && document.querySelector('#footer')) {
        console.log('[Main] Loading footer component');
        loadFooter();
    }
    
    // Initialize search functionality
    initSearch();
    
    // Initialize any breadcrumb containers
    const breadcrumbContainer = document.querySelector('#breadcrumb-container');
    if (breadcrumbContainer && typeof loadBreadcrumb === 'function') {
        console.log('[Main] Loading breadcrumb component');
        // Default to current page title if not specified
        const pageTitle = breadcrumbContainer.getAttribute('data-title') || document.title;
        loadBreadcrumb('#breadcrumb-container', pageTitle);
    }
}

// Initialize page-specific functionality
function initPageSpecific() {
    const path = window.location.pathname;
    
    // Home page
    if (path.endsWith('/index.html') || path.endsWith('/') || path.endsWith('/Cancer/')) {
        console.log('[Main] Initializing home page');
        initHomePage();
    }
    
    // Contact page
    if (path.includes('/contact')) {
        console.log('[Main] Initializing contact page');
        initContactForm();
    }
    
    // Risk calculator
    if (path.includes('/risk-calculator')) {
        console.log('[Main] Initializing risk calculator');
        initRiskCalculator();
    }
    
    // Initialize sub-page heroes
    initSubpageHero();
}

// Home page initialization
function initHomePage() {
    // Initialize home page specific features
    console.log('[Main] Home page initialized');
}

// Contact form initialization
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('[Contact] Form submitted');
        // Form handling logic here
    });
}

// Risk calculator initialization
function initRiskCalculator() {
    const calculator = document.querySelector('.risk-calculator');
    if (!calculator) return;
    
    console.log('[Risk] Calculator initialized');
    // Risk calculator logic here
}

// Search functionality
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchPanel = document.querySelector('.search-panel');
    
    if (searchToggle && searchPanel) {
        searchToggle.addEventListener('click', () => {
            searchPanel.classList.toggle('active');
            if (searchPanel.classList.contains('active')) {
                searchPanel.querySelector('input').focus();
            }
        });
    }
}

function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-input');
    if (searchInput && searchInput.value.trim()) {
        // For static site, we'll redirect to a search results page with query parameter
        const searchQuery = encodeURIComponent(searchInput.value.trim());
        window.location.href = `${isSubpage ? '../' : ''}search.html?q=${searchQuery}`;
    }
    return false;
}

// Accordion functionality
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Check if we have accordion items
    if (accordionHeaders.length === 0) return;
    
    // Set first item as active by default if none are active
    const hasActiveItem = document.querySelector('.accordion-item.active');
    if (!hasActiveItem && accordionHeaders.length > 0) {
        accordionHeaders[0].parentElement.classList.add('active');
        const content = accordionHeaders[0].nextElementSibling;
        content.style.maxHeight = content.scrollHeight + "px";
    }
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the current item
            const accordionItem = this.parentElement;
            const content = this.nextElementSibling;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const itemContent = item.querySelector('.accordion-content');
                itemContent.style.maxHeight = null;
            });
            
            // If the clicked item wasn't active, activate it
            if (!isActive) {
                accordionItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // If on mobile, close the mobile menu
                const mobileNav = document.querySelector('.nav-list');
                if (mobileNav && mobileNav.classList.contains('mobile-active')) {
                    mobileNav.classList.remove('mobile-active');
                    const hamburger = document.querySelector('.hamburger-icon');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Highlight active navigation item based on scroll position
function highlightActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile navigation toggle
function initMobileNav() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (!navbarToggle || !navbarMenu) {
        console.warn('[Navigation] Mobile nav elements not found');
        return;
    }

    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        
        // Accessibility
        const isExpanded = navbarToggle.classList.contains('active');
        navbarToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Add animation to cards on scroll
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.card, .resource-card');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.classList.add('animate');
        }
    });
});

// Form submission handling
const googleForm = document.querySelector('iframe[src*="google.com/forms"]');
if (googleForm) {
    // Listen for message from iframe (Google Form)
    window.addEventListener('message', function(event) {
        // Check if the message is from Google Forms
        if (event.origin.includes('google.com')) {
            if (event.data.includes('formSubmitted')) {
                // Show thank you message
                const formContainer = googleForm.parentElement;
                const thankYouMessage = document.createElement('div');
                thankYouMessage.className = 'thank-you-message';
                thankYouMessage.innerHTML = `
                    <h3>Thank You!</h3>
                    <p>Your information has been submitted. We'll be in touch shortly.</p>
                    <button class="btn-primary">Submit Another Request</button>
                `;
                
                formContainer.appendChild(thankYouMessage);
                googleForm.style.display = 'none';
                
                // Add event listener to reset form
                thankYouMessage.querySelector('button').addEventListener('click', function() {
                    googleForm.src = googleForm.src; // Reload iframe
                    googleForm.style.display = 'block';
                    formContainer.removeChild(thankYouMessage);
                });
            }
        }
    });
}

// Make initHeroSlider globally available
window.initHeroSlider = initHeroSlider;

function initHeroSlider() {
    // Temporarily disabled for static hero
    return;
    
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slider-navigation');
    const prevBtn = document.querySelector('.slider-arrow-left');
    const nextBtn = document.querySelector('.slider-arrow-right');
    
    if (!slider || slides.length === 0) {
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 6000; // Time between automatic slide changes
    
    // Set initial active slide
    slides[0].classList.add('active');
    
    // Create navigation dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    // Function to go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        } else if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
        
        // Update active dot
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Reset the interval
        resetInterval();
    }
    
    // Next slide function
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide function
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Add event listeners to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // Auto slide functionality
    function startInterval() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, intervalTime);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Start automatic sliding
    startInterval();
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startInterval);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            prevSlide();
        }
    }
}

// Utility Functions
const utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Smooth scroll to element
    scrollToElement: (element, offset = 0) => {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// Export utilities for use in other scripts
window.utils = utils;

// Initialize the hero section for subpages
function initSubpageHero() {
    // Skip for home page
    const path = window.location.pathname;
    if (path.endsWith('/index.html') || path.endsWith('/') || path.endsWith('/Cancer/')) {
        console.log('[Hero] Skipping hero initialization for home page');
        return;
    }
    
    const heroContainer = document.getElementById('hero-container');
    if (!heroContainer) {
        console.log('[Hero] Hero container not found, skipping initialization');
        return;
    }
    
    console.log('[Hero] Initializing subpage hero for path:', path);
    
    // Get page information
    const pageTitle = document.title;
    console.log('[Hero] Page title:', pageTitle);
    
    const pageName = pageTitle.split('|')[0].trim();
    console.log('[Hero] Extracted page name:', pageName);
    
    // Default hero options
    const defaultOptions = {
        title: pageName,
        description: '', // Default empty
        ctaText: '', // Default empty (will hide the button)
        ctaUrl: '#',
        backgroundImage: '/Cancer/images/content/slide2.jpg' // Default background
    };
    
    // Page-specific configurations
    const pageConfigs = {
        'About Screening': {
            description: 'Understanding Breast Cancer Screening and Early Detection',
            ctaText: 'Schedule a Screening',
            ctaUrl: '#schedule',
            backgroundImage: '/Cancer/images/content/breast.jpg'
        },
        'Breast Cancer': {
            description: 'Learn about breast cancer, symptoms, and treatment options',
            ctaText: 'Get Support',
            ctaUrl: '#support',
            backgroundImage: '/Cancer/images/content/womanstanding.jpg'
        },
        'Screening': {
            description: 'Find information about our screening programs and services',
            ctaText: 'Find a Facility',
            ctaUrl: '#facilities',
            backgroundImage: '/Cancer/images/content/medical-5051144_1280.jpg'
        },
        'Support': {
            description: 'Find support through your cancer journey',
            ctaText: 'Get Support',
            ctaUrl: '#support',
            backgroundImage: '/Cancer/images/content/womanstanding.jpg'
        },
        'Resources': {
            description: 'Access helpful resources and support services',
            ctaText: 'View All Resources',
            ctaUrl: '#resources-list',
            backgroundImage: '/Cancer/images/content/educativematerial.jpg'
        },
        'FAQ': {
            description: 'Find answers to commonly asked questions',
            ctaText: 'Contact Us',
            ctaUrl: '/Cancer/pages/contact.html',
            backgroundImage: '/Cancer/images/content/group of women.jpg'
        },
        'Contact Us': {
            description: 'Get in touch with our team',
            ctaText: 'View Locations',
            ctaUrl: '#locations',
            backgroundImage: '/Cancer/images/content/image3.jpg'
        },
        'Risk Assessment Calculator': {
            description: 'Assess your personal risk of breast cancer',
            ctaText: 'Start Assessment',
            ctaUrl: '#calculator',
            backgroundImage: '/Cancer/images/content/breast-cancer-2773775_1280.jpg'
        }
    };
    
    // Get the specific config or use default
    console.log('[Hero] Available configurations:', Object.keys(pageConfigs));
    const config = pageConfigs[pageName] || {};
    console.log('[Hero] Selected config:', config);
    
    const options = {...defaultOptions, ...config};
    console.log('[Hero] Final options:', options);
    
    // Initialize hero if the function exists
    if (typeof loadHeroWithOverlay === 'function') {
        console.log('[Hero] Loading hero with overlay');
        loadHeroWithOverlay('#hero-container', options);
    } else {
        console.error('[Hero] loadHeroWithOverlay function not found');
    }
    
    // Add breadcrumb below hero
    addBreadcrumbAfterHero(heroContainer, pageName);
}

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