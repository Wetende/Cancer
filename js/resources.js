/**
 * Resources Page JavaScript
 * 
 * Handles interactive functionality for the resources page including:
 * - Smooth scrolling for navigation links
 * - Active state tracking for the resource navigation
 * - Organization card interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize resource navigation highlighting
    initResourceNavHighlighting();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.resource-nav__item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the sticky header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const resourceNavHeight = document.querySelector('.resource-navigation').offsetHeight;
                const totalOffset = headerHeight + resourceNavHeight;
                
                // Calculate the target position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - totalOffset;
                
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Initialize resource navigation highlighting based on scroll position
 */
function initResourceNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.resource-nav__item');
    
    // Set initial active state based on URL hash
    if (window.location.hash) {
        const activeNavItem = document.querySelector(`.resource-nav__item[href="${window.location.hash}"]`);
        if (activeNavItem) {
            navItems.forEach(item => item.classList.remove('active'));
            activeNavItem.classList.add('active');
        }
    }
    
    // Update active state on scroll
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        const resourceNavHeight = document.querySelector('.resource-navigation').offsetHeight;
        const totalOffset = headerHeight + resourceNavHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - totalOffset - 50; // 50px buffer
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === currentSection) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Handle external link tracking (optional for analytics)
 */
document.addEventListener('click', function(e) {
    // Check if the clicked element is an external link
    if (e.target.tagName === 'A' && e.target.getAttribute('target') === '_blank') {
        // Get the organization name if available
        let organizationName = 'Unknown';
        const cardTitle = e.target.closest('.organization-card')?.querySelector('.organization-card__title');
        
        if (cardTitle) {
            organizationName = cardTitle.textContent.trim();
        }
        
        // Log the click (can be replaced with actual analytics tracking)
        console.log('External resource click:', {
            organization: organizationName,
            url: e.target.href
        });
    }
}); 