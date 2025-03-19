document.addEventListener('DOMContentLoaded', () => {
    // Initialize FAQ functionality
    initializeAccordion();
    initializeSearch();
    initializeCategories();
});

/**
 * Initialize accordion functionality for FAQ items
 */
function initializeAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    if (accordionButtons.length === 0) return;
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Get the content panel
            const content = this.nextElementSibling;
            
            // Toggle visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Initialize search functionality for FAQs
 */
function initializeSearch() {
    const searchInput = document.querySelector('.faq-search__input');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();
        searchFAQs(searchTerm);
    }, 300));
}

/**
 * Search FAQs based on input term
 * @param {string} searchTerm - The term to search for
 */
function searchFAQs(searchTerm) {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const faqCategorySections = document.querySelectorAll('.faq-category-section');
    
    // If no search term, show all items and sections
    if (!searchTerm) {
        accordionItems.forEach(item => {
            item.style.display = 'block';
        });
        
        faqCategorySections.forEach(section => {
            section.style.display = 'block';
        });
        
        return;
    }
    
    // Filter items based on search term
    let foundInSection = {};
    
    accordionItems.forEach(item => {
        const question = item.querySelector('.accordion-button').textContent.toLowerCase();
        const answer = item.querySelector('.accordion-content').textContent.toLowerCase();
        const categorySection = item.closest('.faq-category-section');
        const sectionId = categorySection ? categorySection.id : null;
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
            if (sectionId) {
                foundInSection[sectionId] = true;
            }
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show/hide sections based on if they have visible items
    faqCategorySections.forEach(section => {
        if (foundInSection[section.id]) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Update UI to show search results
    updateSearchResultsUI(searchTerm);
}

/**
 * Update UI to show search results status
 * @param {string} searchTerm - The term searched for
 */
function updateSearchResultsUI(searchTerm) {
    // Remove existing results message
    const existingMessage = document.querySelector('.search-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (!searchTerm) return;
    
    // Get visible items count
    const visibleItems = document.querySelectorAll('.accordion-item[style="display: block;"]').length;
    
    // Create and insert results message
    const resultsMessage = document.createElement('div');
    resultsMessage.className = 'search-results-message';
    
    if (visibleItems === 0) {
        resultsMessage.innerHTML = `
            <p>No results found for "<strong>${searchTerm}</strong>".</p>
            <p>Try using different keywords or <button class="btn-link reset-search">reset search</button>.</p>
        `;
    } else {
        resultsMessage.innerHTML = `
            <p>Found ${visibleItems} result${visibleItems !== 1 ? 's' : ''} for "<strong>${searchTerm}</strong>".</p>
            <button class="btn-link reset-search">Reset search</button>
        `;
    }
    
    // Insert after search input
    const searchContainer = document.querySelector('.faq-search');
    searchContainer.parentNode.insertBefore(resultsMessage, searchContainer.nextSibling);
    
    // Add event listener to reset button
    document.querySelector('.reset-search').addEventListener('click', () => {
        document.querySelector('.faq-search__input').value = '';
        searchFAQs('');
        resultsMessage.remove();
    });
}

/**
 * Initialize category filtering
 */
function initializeCategories() {
    const categoryButtons = document.querySelectorAll('.faq-category');
    
    if (categoryButtons.length === 0) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter by category
            const category = this.textContent.trim().toLowerCase();
            filterByCategory(category);
        });
    });
}

/**
 * Filter FAQs by category
 * @param {string} category - The category to filter by
 */
function filterByCategory(category) {
    const faqCategorySections = document.querySelectorAll('.faq-category-section');
    
    // Show all sections for "All" category
    if (category === 'all') {
        faqCategorySections.forEach(section => {
            section.style.display = 'block';
        });
        return;
    }
    
    // Otherwise, show only matching sections
    faqCategorySections.forEach(section => {
        const sectionTitle = section.querySelector('.section-title').textContent.toLowerCase();
        if (sectionTitle.includes(category)) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait
 * @return {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add IDs to category sections if not already present
function initializeFAQSections() {
    const faqCategorySections = document.querySelectorAll('.faq-category-section');
    
    faqCategorySections.forEach((section, index) => {
        if (!section.id) {
            const titleText = section.querySelector('.section-title').textContent;
            const idText = titleText.toLowerCase().replace(/\s+/g, '-');
            section.id = `faq-section-${idText}`;
        }
    });
}

// Handle URL hash navigation
function handleHashNavigation() {
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetElement = document.getElementById(hash);
        
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // If it's an accordion item, open it
                if (targetElement.classList.contains('accordion-item')) {
                    const button = targetElement.querySelector('.accordion-button');
                    if (button && !button.classList.contains('active')) {
                        button.click();
                    }
                }
            }, 300);
        }
    }
}

// Initialize everything
initializeFAQSections();
handleHashNavigation();

// Export functions for use in other scripts
window.faq = {
    searchFAQs,
    filterByCategory
}; 