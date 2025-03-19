document.addEventListener('DOMContentLoaded', function() {
    // Load shared components
    loadComponents();
    
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

    // Mobile Navigation Toggle
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navbarToggle.contains(event.target) || navbarMenu.contains(event.target);
            if (!isClickInside && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    }
});

// Component Loading System
function loadComponents() {
    const isSubpage = document.location.pathname.includes('/pages/');
    const basePath = isSubpage ? '../' : '';
    
    // Load Header
    const header = document.getElementById('header');
    if (header) {
        header.className = 'sticky-header';
        header.innerHTML = `
            <div class="container">
                <div class="logo">
                    <a href="${basePath}index.html" class="logo-link">
                        <img src="${basePath}images/logo.svg" alt="Nzoya Foundation Logo" class="logo-img" width="50" height="50">
                        <h1>Nzoya Foundation</h1>
                    </a>
                </div>
                <nav class="main-nav">
                    <ul class="nav-list">
                        <li><a href="${basePath}index.html" class="nav-link">Home</a></li>
                        <li class="has-dropdown">
                            <a href="${basePath}pages/about.html" class="nav-link">About Screening</a>
                            <ul class="dropdown-menu">
                                <li><a href="${basePath}pages/risk-calculator.html">Risk Calculator</a></li>
                            </ul>
                        </li>
                        <li class="has-dropdown">
                            <a href="${basePath}pages/screening.html" class="nav-link">Schedule</a>
                            <ul class="dropdown-menu">
                                <li><a href="${basePath}pages/facilities.html">Find Facilities</a></li>
                            </ul>
                        </li>
                        <li><a href="${basePath}pages/resources.html" class="nav-link">Resources</a></li>
                        <li><a href="${basePath}pages/faq.html" class="nav-link">FAQ</a></li>
                        <li><a href="${basePath}pages/contact.html" class="btn-primary">Contact Us</a></li>
                    </ul>
                </nav>
                <div class="header__actions">
                    <button class="search-toggle">
                        <i class="fas fa-search"></i>
                    </button>
                    <button class="mobile-menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
            <div class="search-panel">
                <div class="container">
                    <form class="search-form" onsubmit="return handleSearch(event)">
                        <input type="text" placeholder="Search..." class="search-input">
                        <button type="submit" class="search-submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;
    }

    // Load Footer
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-logo">
                        <h3>Nzoya Foundation</h3>
                        <p>Providing resources for early detection and prevention in Bellevue, WA and surrounding communities.</p>
                    </div>
                    <div class="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="${basePath}index.html">Home</a></li>
                            <li><a href="${basePath}pages/about.html">About Screening</a></li>
                            <li><a href="${basePath}pages/risk-calculator.html">Risk Calculator</a></li>
                            <li><a href="${basePath}pages/screening.html">Schedule</a></li>
                            <li><a href="${basePath}pages/facilities.html">Find Facilities</a></li>
                            <li><a href="${basePath}pages/resources.html">Resources</a></li>
                            <li><a href="${basePath}pages/faq.html">FAQ</a></li>
                            <li><a href="${basePath}pages/contact.html">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-social">
                        <h4>Connect With Us</h4>
                        <div class="social-icons">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Nzoya Foundation. All rights reserved.</p>
                    <p>This website is for informational purposes only and does not provide medical advice.</p>
                </div>
            </div>
        `;
    }

    // Initialize search functionality
    initSearch();
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
    const intervalTime = 5000; // Time between automatic slide changes
    
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