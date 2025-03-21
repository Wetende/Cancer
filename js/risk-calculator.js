document.addEventListener('DOMContentLoaded', () => {
    // Initialize the risk calculator
    const riskCalculator = document.getElementById('riskCalculator');
    
    if (riskCalculator) {
        initializeRiskCalculator(riskCalculator);
    }
    
    // Initialize BMI calculator modal
    initializeBMICalculator();
});

/**
 * Initialize the risk calculator form and functionality
 * @param {HTMLElement} calculatorElement - The risk calculator container element
 */
function initializeRiskCalculator(calculatorElement) {
    const form = calculatorElement.querySelector('form');
    const progressBar = calculatorElement.querySelector('.progress-bar');
    const steps = calculatorElement.querySelectorAll('.calc-step');
    const prevButtons = calculatorElement.querySelectorAll('.btn-prev');
    const nextButtons = calculatorElement.querySelectorAll('.btn-next');
    const submitButton = calculatorElement.querySelector('.btn-submit');
    
    // Track current step
    let currentStep = 0;
    
    // Initialize progress
    updateProgress();
    
    // Show the first step
    showStep(currentStep);
    
    // Add floating labels to form inputs
    setupDynamicInputs();
    
    // Add event listeners to previous buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
                updateProgress();
                
                // Scroll to top of calculator
                smoothScrollTo(calculatorElement);
            }
        });
    });
    
    // Add event listeners to next buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validate current step
            if (validateStep(steps[currentStep])) {
                currentStep++;
                showStep(currentStep);
                updateProgress();
                
                // Scroll to top of calculator
                smoothScrollTo(calculatorElement);
            }
        });
    });
    
    // Handle form submission
    if (form && submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validate final step
            if (validateStep(steps[currentStep])) {
                calculateRisk();
                
                // Scroll to top of results
                setTimeout(() => {
                    const results = calculatorElement.querySelector('.risk-results');
                    if (results) {
                        smoothScrollTo(results);
                    }
                }, 100);
            }
        });
    }
    
    /**
     * Smooth scroll to an element
     * @param {HTMLElement} element - The element to scroll to
     */
    function smoothScrollTo(element) {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Scroll to element with offset for header
        window.scrollTo({
            top: rect.top + scrollTop - 100,
            behavior: 'smooth'
        });
    }
    
    /**
     * Setup dynamic input effects
     */
    function setupDynamicInputs() {
        const inputs = calculatorElement.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            // Add focus and blur event listeners
            input.addEventListener('focus', () => {
                const formGroup = input.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.add('focused');
                }
            });
            
            input.addEventListener('blur', () => {
                const formGroup = input.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.remove('focused');
                }
            });
            
            // Set initial state if input has value
            if (input.value) {
                const formGroup = input.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.add('has-value');
                }
            }
            
            // Update state when value changes
            input.addEventListener('input', () => {
                const formGroup = input.closest('.form-group');
                if (formGroup) {
                    if (input.value) {
                        formGroup.classList.add('has-value');
                    } else {
                        formGroup.classList.remove('has-value');
                    }
                }
            });
        });
    }
    
    /**
     * Show the specified step and hide others
     * @param {number} stepIndex - The step index to show
     */
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.style.display = 'block';
                // Use setTimeout to trigger animation after display change
                setTimeout(() => {
                    step.classList.add('active');
                }, 10);
            } else {
                step.classList.remove('active');
                step.style.display = 'none';
            }
        });
    }
    
    /**
     * Update the progress bar based on current step
     */
    function updateProgress() {
        if (progressBar) {
            const progressPercentage = (currentStep / (steps.length - 1)) * 100;
            progressBar.style.width = `${progressPercentage}%`;
            progressBar.setAttribute('aria-valuenow', progressPercentage);
            
            // Update progress text for accessibility
            const progressText = calculatorElement.querySelector('.calculator-progress-text');
            if (progressText) {
                progressText.textContent = `Step ${currentStep + 1} of ${steps.length}`;
            } else {
                // Create progress text if it doesn't exist
                const progressContainer = calculatorElement.querySelector('.calculator-progress');
                if (progressContainer) {
                    const textElement = document.createElement('div');
                    textElement.className = 'calculator-progress-text';
                    textElement.textContent = `Step ${currentStep + 1} of ${steps.length}`;
                    progressContainer.appendChild(textElement);
                }
            }
        }
    }
    
    /**
     * Validate the current step inputs
     * @param {HTMLElement} stepElement - The current step element
     * @return {boolean} - Whether the step is valid
     */
    function validateStep(stepElement) {
        const requiredInputs = stepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        // Clear previous error messages
        const errorMessages = stepElement.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // Check each required input
        requiredInputs.forEach(input => {
            input.classList.remove('error');
            
            // Check if empty
            if (!input.value.trim()) {
                showInputError(input, 'This field is required');
                isValid = false;
                return;
            }
            
            // Validate based on input type or name
            if (input.type === 'number') {
                // Check if within range
                const min = parseFloat(input.getAttribute('min'));
                const max = parseFloat(input.getAttribute('max'));
                const value = parseFloat(input.value);
                
                if (!isNaN(min) && value < min) {
                    showInputError(input, `Value must be at least ${min}`);
                    isValid = false;
                } else if (!isNaN(max) && value > max) {
                    showInputError(input, `Value must be at most ${max}`);
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    /**
     * Show error message for an input
     * @param {HTMLElement} input - The input element
     * @param {string} message - The error message
     */
    function showInputError(input, message) {
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const inputGroup = input.closest('.form-group');
        if (inputGroup) {
            inputGroup.appendChild(errorElement);
        } else {
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
    }
    
    /**
     * Calculate the risk score and display the result
     */
    function calculateRisk() {
        // Collect all form data
        const formData = new FormData(form);
        
        // Extract values for risk calculation
        const age = parseInt(formData.get('age'));
        const familyHistory = formData.get('familyHistory') === 'yes' ? true : false;
        const firstPregnancyAge = parseInt(formData.get('firstPregnancyAge')) || 0;
        const menarcheAge = parseInt(formData.get('menarcheAge')) || 0;
        const previousBiopsies = parseInt(formData.get('previousBiopsies')) || 0;
        const atypicalHyperplasia = formData.get('atypicalHyperplasia') === 'yes' ? true : false;
        const breastDensity = formData.get('breastDensity') || '';
        const hormoneTherapy = formData.get('hormoneTherapy') === 'yes' ? true : false;
        const alcohol = parseInt(formData.get('alcohol')) || 0;
        const exercise = parseInt(formData.get('exercise')) || 0;
        const bmi = parseFloat(formData.get('bmi')) || 0;
        
        // Calculate risk score (simplified example algorithm)
        let riskScore = 0;
        
        // Age factor (higher risk with age)
        if (age < 40) riskScore += 1;
        else if (age < 50) riskScore += 2;
        else if (age < 60) riskScore += 3;
        else if (age < 70) riskScore += 4;
        else riskScore += 5;
        
        // Family history (significantly increases risk)
        if (familyHistory) riskScore += 5;
        
        // Pregnancy factor (later first pregnancy increases risk)
        if (firstPregnancyAge === 0) riskScore += 2; // Never pregnant
        else if (firstPregnancyAge >= 30) riskScore += 3;
        else if (firstPregnancyAge >= 25) riskScore += 2;
        else riskScore += 1;
        
        // Early menarche (earlier increases risk)
        if (menarcheAge < 12) riskScore += 2;
        else if (menarcheAge < 14) riskScore += 1;
        
        // Previous biopsies (increases risk)
        riskScore += previousBiopsies;
        
        // Atypical hyperplasia (significantly increases risk)
        if (atypicalHyperplasia) riskScore += 4;
        
        // Breast density (higher density increases risk)
        if (breastDensity === 'extremely_dense') riskScore += 4;
        else if (breastDensity === 'heterogeneously_dense') riskScore += 3;
        else if (breastDensity === 'scattered') riskScore += 2;
        else if (breastDensity === 'fatty') riskScore += 1;
        
        // Hormone therapy (increases risk)
        if (hormoneTherapy) riskScore += 2;
        
        // Alcohol consumption (increases risk)
        riskScore += Math.min(alcohol, 3);
        
        // Exercise (decreases risk)
        riskScore -= Math.min(exercise, 3);
        
        // BMI (higher increases risk)
        if (bmi >= 30) riskScore += 2;
        else if (bmi >= 25) riskScore += 1;
        
        // Calculate percentage risk (example calculation - not medically accurate)
        // In a real implementation, this would use a validated risk model (Gail, Tyrer-Cuzick, etc.)
        let maximumPossibleScore = 30;
        let normalizedScore = Math.max(0, Math.min(riskScore, maximumPossibleScore));
        let riskPercentage = (normalizedScore / maximumPossibleScore) * 100;
        
        // Determine risk category
        let riskCategory;
        if (riskPercentage < 25) riskCategory = 'low';
        else if (riskPercentage < 50) riskCategory = 'moderate';
        else if (riskPercentage < 75) riskCategory = 'high';
        else riskCategory = 'very_high';
        
        // Display result
        displayRiskResult(riskPercentage, riskCategory);
    }
    
    /**
     * Display the calculated risk results
     * @param {number} riskPercentage - The calculated risk percentage
     * @param {string} riskCategory - The risk category (low, moderate, high, very_high)
     */
    function displayRiskResult(riskPercentage, riskCategory) {
        // Hide the form
        form.style.display = 'none';
        
        // Show the results section
        const resultsSection = calculatorElement.querySelector('.risk-results');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            
            // Update risk score display
            const scoreElement = resultsSection.querySelector('.risk-score');
            if (scoreElement) {
                // Animate counting up to the percentage
                animateCounter(scoreElement, Math.round(riskPercentage));
            }
            
            // Animate the risk meter pointer
            animateRiskMeter(riskPercentage);
            
            // Update risk category
            const categoryElement = resultsSection.querySelector('.risk-category');
            if (categoryElement) {
                let categoryText;
                let categoryClass;
                
                switch (riskCategory) {
                    case 'low':
                        categoryText = 'Low Risk';
                        categoryClass = 'low';
                        break;
                    case 'moderate':
                        categoryText = 'Moderate Risk';
                        categoryClass = 'moderate';
                        break;
                    case 'high':
                        categoryText = 'High Risk';
                        categoryClass = 'high';
                        break;
                    case 'very_high':
                        categoryText = 'Very High Risk';
                        categoryClass = 'very-high';
                        break;
                    default:
                        categoryText = 'Unknown Risk';
                        categoryClass = 'unknown';
                }
                
                categoryElement.textContent = categoryText;
                categoryElement.className = `risk-category ${categoryClass}`;
            }
            
            // Show appropriate recommendations
            const recommendationsContainer = resultsSection.querySelector('.risk-recommendations');
            if (recommendationsContainer) {
                recommendationsContainer.innerHTML = getRecommendations(riskCategory);
            }
            
            // Show disclaimer
            const disclaimerElement = resultsSection.querySelector('.risk-disclaimer');
            if (disclaimerElement) {
                disclaimerElement.style.display = 'block';
            }
            
            // Add restart button functionality
            const restartButton = resultsSection.querySelector('.btn-restart');
            if (restartButton) {
                restartButton.addEventListener('click', () => {
                    // Reset form
                    form.reset();
                    currentStep = 0;
                    showStep(currentStep);
                    updateProgress();
                    
                    // Hide results, show form
                    resultsSection.style.display = 'none';
                    form.style.display = 'block';
                });
            }
        }
    }
    
    /**
     * Animate counting up to a target number
     * @param {HTMLElement} element - The element to update
     * @param {number} target - The target number to count to
     */
    function animateCounter(element, target) {
        let start = 0;
        const duration = 1500; // ms
        const startTime = performance.now();
        
        // Use requestAnimationFrame for smooth animation
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Use easeOutQuart easing function for natural slowdown
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeProgress * target);
            
            element.textContent = `${current}%`;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = `${target}%`;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    /**
     * Animate the risk meter with a pointer
     * @param {number} percentage - The percentage to point to
     */
    function animateRiskMeter(percentage) {
        const meter = calculatorElement.querySelector('.risk-meter');
        if (!meter) return;
        
        // Add or update pointer element
        let pointer = meter.querySelector('.risk-meter-pointer');
        if (!pointer) {
            pointer = document.createElement('div');
            pointer.className = 'risk-meter-pointer';
            meter.appendChild(pointer);
        }
        
        // Calculate rotation angle based on percentage
        // 0% = -135 degrees, 100% = 135 degrees (270 degree range)
        const angle = -135 + (percentage / 100 * 270);
        
        // Animate the pointer rotation
        setTimeout(() => {
            pointer.style.transform = `rotate(${angle}deg)`;
        }, 300);
    }
    
    /**
     * Get recommendations based on risk category
     * @param {string} riskCategory - The risk category
     * @return {string} - HTML content with recommendations
     */
    function getRecommendations(riskCategory) {
        let recommendations = '';
        
        // Common recommendations for all risk levels
        const commonRecs = `
            <li>Maintain a healthy weight</li>
            <li>Exercise regularly</li>
            <li>Limit alcohol consumption</li>
            <li>Know your breasts and report any changes</li>
        `;
        
        switch(riskCategory) {
            case 'low':
                recommendations = `
                    <h4>Recommendations for Low Risk:</h4>
                    <ul>
                        ${commonRecs}
                        <li>Follow standard screening guidelines based on your age</li>
                        <li>Annual clinical breast exams starting at age 25</li>
                        <li>Mammogram every 1-2 years starting at age 40</li>
                    </ul>
                `;
                break;
                
            case 'moderate':
                recommendations = `
                    <h4>Recommendations for Moderate Risk:</h4>
                    <ul>
                        ${commonRecs}
                        <li>Annual clinical breast exams starting at age 25</li>
                        <li>Annual mammogram starting at age 40</li>
                        <li>Consider discussing supplemental screening with your doctor</li>
                        <li>Review risk reduction strategies with your healthcare provider</li>
                    </ul>
                `;
                break;
                
            case 'high':
                recommendations = `
                    <h4>Recommendations for High Risk:</h4>
                    <ul>
                        ${commonRecs}
                        <li>Annual clinical breast exams starting at age 25</li>
                        <li>Annual mammogram starting at age 30-35</li>
                        <li>Annual breast MRI starting at age 30-35</li>
                        <li>Consider genetic counseling and testing</li>
                        <li>Discuss risk reduction medications with your doctor</li>
                    </ul>
                `;
                break;
                
            case 'very_high':
                recommendations = `
                    <h4>Recommendations for Very High Risk:</h4>
                    <ul>
                        ${commonRecs}
                        <li>Bi-annual clinical breast exams</li>
                        <li>Annual mammogram and breast MRI starting at age 25-30</li>
                        <li>Genetic counseling and testing highly recommended</li>
                        <li>Discuss risk reduction strategies including preventive medications</li>
                        <li>Consider preventive surgery options with your healthcare team</li>
                    </ul>
                `;
                break;
                
            default:
                recommendations = `
                    <h4>General Recommendations:</h4>
                    <ul>
                        ${commonRecs}
                        <li>Follow standard screening guidelines based on your age</li>
                        <li>Discuss personalized screening plan with your doctor</li>
                    </ul>
                `;
        }
        
        // Add next steps section
        recommendations += `
            <div class="next-steps">
                <h4>Next Steps:</h4>
                <p>Take your results to your healthcare provider to develop a personalized screening and prevention plan.</p>
                <div class="next-steps-buttons">
                    <button class="btn btn-primary btn-print">Print Results</button>
                    <a href="screening.html" class="btn btn-outline-primary">Learn About Screening</a>
                </div>
            </div>
        `;
        
        return recommendations;
    }
    
    // Add print functionality
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn-print')) {
            window.print();
        }
    });
}

/**
 * Initialize the BMI Calculator functionality
 */
function initializeBMICalculator() {
    const bmiCalculatorLink = document.querySelector('.bmi-calculator-link');
    const modal = document.getElementById('bmiCalculatorModal');
    const closeButton = modal?.querySelector('.close-modal');
    const calculateButton = document.getElementById('calculateBmi');
    const useBmiButton = document.getElementById('useBmiValue');
    const bmiInput = document.getElementById('bmi');
    
    // Open modal when BMI calculator link is clicked
    if (bmiCalculatorLink && modal) {
        bmiCalculatorLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    }
    
    // Close modal when close button is clicked
    if (closeButton && modal) {
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside the content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Calculate BMI when button is clicked
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateBMI);
    }
    
    // Use calculated BMI value in the form
    if (useBmiButton && bmiInput) {
        useBmiButton.addEventListener('click', () => {
            const bmiValue = document.getElementById('bmiValue')?.textContent;
            if (bmiValue) {
                bmiInput.value = bmiValue;
                
                // Close modal
                if (modal) {
                    modal.classList.remove('active');
                }
            }
        });
    }
    
    /**
     * Calculate BMI based on height and weight inputs
     */
    function calculateBMI() {
        const heightFeet = parseFloat(document.getElementById('heightFeet')?.value) || 0;
        const heightInches = parseFloat(document.getElementById('heightInches')?.value) || 0;
        const weightPounds = parseFloat(document.getElementById('weightPounds')?.value) || 0;
        
        // Validate inputs
        if (heightFeet === 0 || weightPounds === 0) {
            alert('Please enter valid height and weight values.');
            return;
        }
        
        // Convert height to inches
        const totalHeightInches = (heightFeet * 12) + heightInches;
        
        // Calculate BMI using formula: (weight in pounds / (height in inches)^2) * 703
        const bmi = (weightPounds / (totalHeightInches * totalHeightInches)) * 703;
        
        // Round to one decimal place
        const roundedBMI = Math.round(bmi * 10) / 10;
        
        // Determine BMI category
        let category;
        if (roundedBMI < 18.5) {
            category = 'Underweight';
        } else if (roundedBMI < 25) {
            category = 'Normal weight';
        } else if (roundedBMI < 30) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }
        
        // Display result
        const bmiResultElement = document.getElementById('bmiResult');
        const bmiValueElement = document.getElementById('bmiValue');
        const bmiCategoryElement = document.getElementById('bmiCategory');
        
        if (bmiResultElement && bmiValueElement && bmiCategoryElement) {
            bmiValueElement.textContent = roundedBMI.toString();
            bmiCategoryElement.textContent = `Category: ${category}`;
            bmiResultElement.style.display = 'block';
        }
    }
}

// Export for use in other scripts
window.riskCalculator = {
    initializeRiskCalculator,
    initializeBMICalculator
}; 