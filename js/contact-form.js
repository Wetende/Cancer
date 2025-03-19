document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Initialize form handling
        initializeContactForm();
    }
});

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    
    // Add input event listeners for real-time validation
    formFields.forEach(field => {
        field.addEventListener('input', () => {
            validateField(field);
        });

        field.addEventListener('blur', () => {
            validateField(field);
        });
    });

    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(contactForm)) {
            showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        try {
            await submitForm(contactForm);
            showMessage('Thank you for your message. We will get back to you soon!', 'success');
            contactForm.reset();
        } catch (error) {
            showMessage('An error occurred. Please try again later.', 'error');
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error messages
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Validate email format
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Validate phone format (if provided)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    // Update field styling
    field.classList.toggle('error', !isValid);

    // Show error message if invalid
    if (!isValid) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        field.parentElement.appendChild(errorElement);
    }

    return isValid;
}

function validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

async function submitForm(form) {
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Add timestamp
    data.timestamp = new Date().toISOString();

    // Simulate API call (replace with actual API endpoint)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate successful submission
            console.log('Form submitted:', data);
            resolve(data);
            
            // Uncomment to simulate error
            // reject(new Error('Server error'));
        }, 1000);
    });
}

function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    // Insert message before form
    const form = document.getElementById('contactForm');
    form.parentElement.insertBefore(messageElement, form);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Export functions for use in other scripts
window.contactForm = {
    validateField,
    validateForm,
    submitForm,
    showMessage
}; 