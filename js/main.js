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

// Update CSS path to ensure it's using the absolute path
function updateCssPath() {
    const stylesLink = document.getElementById('styles-link');
    if (stylesLink) {
        // Set absolute path to ensure CSS loads correctly
        const absolutePath = '/Cancer/css/styles.css';
        if (stylesLink.getAttribute('href') !== absolutePath) {
            console.log(`[Main] Updating CSS path to: ${absolutePath}`);
            stylesLink.setAttribute('href', absolutePath);
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
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the current item
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked item wasn't active, activate it
            if (!isActive) {
                accordionItem.classList.add('active');
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
    const hamburgerIcon = document.createElement('div');
    hamburgerIcon.className = 'hamburger-icon';
    hamburgerIcon.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('.main-nav');
    const navUl = document.querySelector('.nav-list');
    
    // Only proceed if nav elements are found
    if (!nav || !navUl) {
        console.warn('Navigation elements not found. Mobile navigation not initialized.');
        return;
    }
    
    // Add click handlers for dropdowns
    const dropdownLinks = document.querySelectorAll('.has-dropdown > a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownParent = this.parentElement;
                dropdownParent.classList.toggle('active');
            }
        });
    });
    
    // Only add mobile nav functionality if screen width is below 768px
    if (window.innerWidth <= 768) {
        nav.prepend(hamburgerIcon);
        
        hamburgerIcon.addEventListener('click', function() {
            navUl.classList.toggle('mobile-active');
            hamburgerIcon.classList.toggle('active');
            
            // Close all dropdowns when closing mobile menu
            if (!navUl.classList.contains('mobile-active')) {
                document.querySelectorAll('.has-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // Update mobile nav on window resize
    window.addEventListener('resize', function() {
        if (!nav) return; // Safety check
        
        if (window.innerWidth > 768) {
            // Remove mobile-specific classes and elements
            navUl.classList.remove('mobile-active');
            const hamburger = nav.querySelector('.hamburger-icon');
            if (hamburger) {
                hamburger.remove();
            }
            
            // Remove active states from dropdowns
            document.querySelectorAll('.has-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        } else if (!nav.querySelector('.hamburger-icon')) {
            // Re-add hamburger icon if needed
            nav.prepend(hamburgerIcon);
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

// Hero Slider functionality
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slider-navigation');
    const prevBtn = document.querySelector('.slider-arrow-left');
    const nextBtn = document.querySelector('.slider-arrow-right');
    
    if (!slider || slides.length === 0) return;
    
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
        dot.addEventListener('click', () => goToSlide(index));
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
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
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
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
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