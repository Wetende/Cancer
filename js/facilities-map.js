/**
 * Facilities Map JavaScript
 * This script handles the functionality for the Nzoya Foundation breast cancer screening facilities map page.
 * Features include:
 * - Loading facility data from JSON
 * - Initializing and controlling the Google Map
 * - Handling facility search and filtering
 * - Managing the facilities list display
 * - Handling facility details and modal functionality
 */

// Global variables for Google Maps callback
let mapContainer;
let facilities = [];

document.addEventListener('DOMContentLoaded', function() {
    // Load the header and footer
    if (document.getElementById('header')) {
        document.getElementById('header').innerHTML = headerTemplate;
        initializeMobileMenu();
        initializeSearch();
    }
    if (document.getElementById('footer')) {
        document.getElementById('footer').innerHTML = footerTemplate;
    }

    // Set up DOM elements for Google Maps callback
    mapContainer = document.getElementById('facilitiesMap');
    
    // Initialize non-map related facilities functionality
    initializeFacilitiesUI();
});

/**
 * Initialize the facilities UI functionality
 */
function initializeFacilitiesUI() {
    // Elements
    const searchForm = document.getElementById('facilitiesSearchForm');
    const facilitiesList = document.getElementById('facilitiesList');
    const facilitiesCount = document.getElementById('facilitiesCount');
    const modal = document.getElementById('facilityDetailsModal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Load facilities data
    loadFacilitiesData();
    
    // Initialize form event listeners
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Close modal event
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    /**
     * Load facilities data from JSON file
     */
    function loadFacilitiesData() {
        // Show loading indicator
        if (facilitiesList) {
            facilitiesList.innerHTML = '<div class="loading-indicator">Loading facilities...</div>';
        }
        
        // Determine the correct path to data file based on basePath (if defined) or use absolute path
        const dataPath = typeof basePath !== 'undefined' 
            ? basePath + 'data/facilities.json'
            : '/Cancer/data/facilities.json';
        
        fetch(dataPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                facilities = data.facilities;
                
                // Update count
                if (facilitiesCount) {
                    facilitiesCount.textContent = `${facilities.length} facilities found`;
                }
                
                // Sort facilities to prioritize Bellevue locations
                facilities.sort((a, b) => {
                    const aInBellevue = a.address.includes('Bellevue');
                    const bInBellevue = b.address.includes('Bellevue');
                    
                    if (aInBellevue && !bInBellevue) return -1;
                    if (!aInBellevue && bInBellevue) return 1;
                    return 0;
                });
                
                // Render facilities list
                renderFacilitiesList(facilities);
            })
            .catch(error => {
                console.error('Error loading facilities data:', error);
                if (facilitiesList) {
                    facilitiesList.innerHTML = '<div class="loading-indicator error">Error loading facilities. Please try again later.</div>';
                }
            });
    }
    
    /**
     * Render facilities list
     * @param {Array} facilitiesData - Array of facility objects
     */
    function renderFacilitiesList(facilitiesData) {
        if (!facilitiesList) return;
        
        console.log('Rendering facilities list for Bellevue, WA and surrounding areas');
        
        // Clear list
        facilitiesList.innerHTML = '';
        
        if (facilitiesData.length === 0) {
            facilitiesList.innerHTML = '<div class="no-results">No facilities match your search criteria. Please try different filters.</div>';
            return;
        }
        
        // Create list items
        facilitiesData.forEach(facility => {
            const facilityItem = document.createElement('div');
            facilityItem.className = 'facility-item';
            facilityItem.dataset.id = facility.id;
            
            // Highlight Bellevue facilities
            if (facility.address.includes('Bellevue')) {
                facilityItem.classList.add('bellevue-facility');
            }
            
            // Create HTML for facility item
            facilityItem.innerHTML = `
                <h3 class="facility-item__name">${facility.name}</h3>
                <div class="facility-item__type">${facility.facilityType}</div>
                <div class="facility-item__address">${facility.address}</div>
                <div class="facility-item__details">
                    ${facility.lowCost ? '<span><i class="fas fa-dollar-sign"></i> Low-cost options</span>' : ''}
                    ${facility.wheelchairAccessible ? '<span><i class="fas fa-wheelchair"></i> Accessible</span>' : ''}
                    ${facility.eveningHours ? '<span><i class="fas fa-clock"></i> Evening hours</span>' : ''}
                    ${facility.weekendHours ? '<span><i class="fas fa-calendar"></i> Weekend hours</span>' : ''}
                </div>
                <div class="facility-item__actions">
                    <button class="btn btn-primary view-details">View Details</button>
                    <a href="https://maps.google.com/?q=${facility.address}" target="_blank" class="btn btn-secondary">Directions</a>
                </div>
            `;
            
            // Add click event to facility item
            facilityItem.addEventListener('click', () => {
                // Remove active class from all items
                document.querySelectorAll('.facility-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to this item
                facilityItem.classList.add('active');
                
                // Show facility details
                showFacilityDetails(facility);
            });
            
            // Add facility item to list
            facilitiesList.appendChild(facilityItem);
        });
    }
    
    /**
     * Show facility details in modal
     * @param {Object} facility - Facility object
     */
    function showFacilityDetails(facility) {
        if (!modal) return;
        
        // Set modal title
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) {
            modalTitle.textContent = facility.name;
        }
        
        // Set modal body content
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody) {
            // Prepare hours HTML
            let hoursHTML = '';
            if (facility.hours) {
                if (facility.hours.notes) {
                    hoursHTML = `<p>${facility.hours.notes}</p>`;
                } else {
                    hoursHTML = `
                        <ul class="hours-list">
                            <li><span>Monday:</span> <span>${facility.hours.monday || 'Closed'}</span></li>
                            <li><span>Tuesday:</span> <span>${facility.hours.tuesday || 'Closed'}</span></li>
                            <li><span>Wednesday:</span> <span>${facility.hours.wednesday || 'Closed'}</span></li>
                            <li><span>Thursday:</span> <span>${facility.hours.thursday || 'Closed'}</span></li>
                            <li><span>Friday:</span> <span>${facility.hours.friday || 'Closed'}</span></li>
                            <li><span>Saturday:</span> <span>${facility.hours.saturday || 'Closed'}</span></li>
                            <li><span>Sunday:</span> <span>${facility.hours.sunday || 'Closed'}</span></li>
                        </ul>
                    `;
                }
            }
            
            // Prepare services HTML
            let servicesHTML = '';
            if (facility.services && facility.services.length > 0) {
                servicesHTML = facility.services.map(service => `<li>${service}</li>`).join('');
            }
            
            // Create modal content
            modalBody.innerHTML = `
                <div class="facility-detail">
                    <div class="facility-detail__address">${facility.address}</div>
                    <div class="facility-detail__contact">
                        <p>Phone: <a href="tel:${facility.phone}">${facility.phone}</a></p>
                        ${facility.website ? `<p>Website: <a href="${facility.website}" target="_blank">Visit website</a></p>` : ''}
                    </div>
                    
                    <div class="facility-detail__hours">
                        <h4>Hours of Operation</h4>
                        ${hoursHTML}
                    </div>
                    
                    <div class="facility-detail__services">
                        <h4>Services Offered</h4>
                        <ul class="services-list">
                            ${servicesHTML}
                        </ul>
                    </div>
                    
                    <div class="facility-detail__info">
                        <p>${facility.description}</p>
                        <div class="info-item">
                            <i class="fas fa-dollar-sign"></i>
                            ${facility.lowCost ? 'Low-cost options available' : 'Standard pricing'}
                        </div>
                        <div class="info-item">
                            <i class="fas fa-wheelchair"></i>
                            ${facility.wheelchairAccessible ? 'Wheelchair accessible' : 'Limited accessibility'}
                        </div>
                        <div class="info-item">
                            <i class="fas fa-language"></i>
                            Languages: ${facility.languages ? facility.languages.join(', ') : 'English'}
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Show modal
        modal.classList.add('active');
    }
    
    /**
     * Handle search form submission
     * @param {Event} e - Form submit event
     */
    function handleSearch(e) {
        e.preventDefault();
        console.log('Search functionality will prioritize Bellevue, WA and surrounding areas');
        
        const formData = new FormData(e.target);
        
        // Get filter values
        const facilityType = formData.get('facilityType');
        const acceptsInsurance = formData.get('insuranceAccepted') === 'on';
        const lowCost = formData.get('lowCost') === 'on';
        const wheelchairAccessible = formData.get('wheelchairAccessible') === 'on';
        const eveningWeekendHours = formData.get('eveningWeekend') === 'on';
        
        // Filter facilities
        let filteredFacilities = facilities;
        
        // Filter by facility type if specified
        if (facilityType && facilityType !== 'all') {
            filteredFacilities = filteredFacilities.filter(facility => 
                facility.facilityType === facilityType
            );
        }
        
        // Filter by insurance acceptance
        if (acceptsInsurance) {
            filteredFacilities = filteredFacilities.filter(facility => 
                facility.insurance && facility.insurance.length > 0
            );
        }
        
        // Filter by low cost options
        if (lowCost) {
            filteredFacilities = filteredFacilities.filter(facility => 
                facility.lowCost
            );
        }
        
        // Filter by wheelchair accessibility
        if (wheelchairAccessible) {
            filteredFacilities = filteredFacilities.filter(facility => 
                facility.wheelchairAccessible
            );
        }
        
        // Filter by evening/weekend hours
        if (eveningWeekendHours) {
            filteredFacilities = filteredFacilities.filter(facility => 
                facility.eveningHours || facility.weekendHours
            );
        }
        
        // Always prioritize Bellevue facilities
        filteredFacilities.sort((a, b) => {
            const aInBellevue = a.address.includes('Bellevue');
            const bInBellevue = b.address.includes('Bellevue');
            
            if (aInBellevue && !bInBellevue) return -1;
            if (!aInBellevue && bInBellevue) return 1;
            return 0;
        });
        
        // Update count
        if (facilitiesCount) {
            facilitiesCount.textContent = `${filteredFacilities.length} facilities found`;
        }
        
        // Update facilities list
        renderFacilitiesList(filteredFacilities);
    }
    
    /**
     * Close facility details modal
     */
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
        }
    }
}

/**
 * Google Maps initialization callback
 * This function is called by the Google Maps API when it's loaded
 */
function initMap() {
    console.log('Google Maps API loaded successfully');
    
    // Default center coordinates for Bellevue, WA
    const DEFAULT_CENTER = { lat: 47.6101, lng: -122.2015 };
    const DEFAULT_ZOOM = 11;
    
    // Create the map instance
    if (mapContainer) {
        const map = new google.maps.Map(mapContainer, {
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true
        });
        
        // Add markers for facilities if data is loaded
        if (facilities && facilities.length > 0) {
            addMarkersToMap(map, facilities);
        } else {
            // If facilities aren't loaded yet, check again in a moment
            setTimeout(() => {
                if (facilities && facilities.length > 0) {
                    addMarkersToMap(map, facilities);
                }
            }, 1000);
        }
    }
}

/**
 * Add facility markers to the map
 * @param {Object} map - Google Maps instance
 * @param {Array} facilities - Array of facility objects
 */
function addMarkersToMap(map, facilities) {
    const markers = [];
    const bounds = new google.maps.LatLngBounds();
    
    // Create an info window for marker popups
    const infoWindow = new google.maps.InfoWindow();
    
    // Determine the correct path for marker icons
    const markerPath = typeof basePath !== 'undefined' 
        ? basePath + 'images/'
        : '/Cancer/images/';
    
    // Add markers for each facility
    facilities.forEach(facility => {
        // Parse coordinates from address or use geocoding in production
        // For now, we'll use dummy coordinates based on Bellevue
        const position = getPositionFromAddress(facility.address);
        
        // Create marker
        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: facility.name,
            icon: {
                url: facility.address.includes('Bellevue') 
                    ? markerPath + 'marker-primary.svg' 
                    : markerPath + 'marker-secondary.svg',
                scaledSize: new google.maps.Size(32, 32)
            },
            animation: google.maps.Animation.DROP
        });
        
        // Create info window content
        const content = `
            <div class="map-info-window">
                <h3>${facility.name}</h3>
                <p>${facility.address}</p>
                <p>${facility.phone}</p>
                <div class="info-window-actions">
                    <button class="btn btn-primary btn-sm view-details" 
                            onclick="document.querySelector('.facility-item[data-id=\\'${facility.id}\\']').click()">
                        View Details
                    </button>
                </div>
            </div>
        `;
        
        // Add click event to marker
        marker.addListener('click', () => {
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
            
            // Highlight corresponding list item
            const listItem = document.querySelector(`.facility-item[data-id='${facility.id}']`);
            if (listItem) {
                // Remove active class from all items
                document.querySelectorAll('.facility-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to this item
                listItem.classList.add('active');
                
                // Scroll to the list item
                listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
        
        // Add marker to array
        markers.push(marker);
        
        // Extend bounds to include this marker
        bounds.extend(position);
    });
    
    // Fit map to bounds if we have multiple markers
    if (markers.length > 1) {
        map.fitBounds(bounds);
    }
}

/**
 * Get position from address
 * In production, this would use geocoding
 * @param {String} address - Facility address
 * @returns {Object} - LatLng object
 */
function getPositionFromAddress(address) {
    // Dummy implementation - in production, use geocoding
    // For now, return randomly offset positions around Bellevue
    const DEFAULT_CENTER = { lat: 47.6101, lng: -122.2015 };
    
    // If address includes Bellevue, keep it closer to center
    if (address.includes('Bellevue')) {
        return {
            lat: DEFAULT_CENTER.lat + (Math.random() - 0.5) * 0.03,
            lng: DEFAULT_CENTER.lng + (Math.random() - 0.5) * 0.03
        };
    }
    
    // Otherwise, place it further away
    return {
        lat: DEFAULT_CENTER.lat + (Math.random() - 0.5) * 0.1,
        lng: DEFAULT_CENTER.lng + (Math.random() - 0.5) * 0.1
    };
} 