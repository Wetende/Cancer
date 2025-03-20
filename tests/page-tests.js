/**
 * Page Testing Suite
 * Tests functionality specific to each converted page
 */

class PageTester {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            total: 0
        };
        this.errors = [];
    }

    /**
     * Test Runner
     */
    async runTests() {
        console.log('🧪 Starting Page Tests...\n');
        
        // Test each converted page
        await this.testHomePage();
        await this.testAboutPage();
        await this.testScreeningPage();
        await this.testDiagnosisPage();
        await this.testTreatmentPage();
        await this.testRiskFactorsPage();
        await this.testMetastaticPage();
        await this.testSurvivorshipPage();
        await this.testResourcesPage();
        await this.testContactPage();
        
        // Report Results
        this.reportResults();
    }

    /**
     * Generic Page Tests
     */
    async testPage(pagePath, pageTitle) {
        console.log(`📋 Testing ${pageTitle}...`);
        
        // Test 1: Page Loading
        this.runTest(`${pageTitle} Loading`, () => {
            const mainContent = document.querySelector('main');
            if (!mainContent) throw new Error('Main content area not found');
            return true;
        });

        // Test 2: Image Loading
        this.runTest(`${pageTitle} Images`, () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.complete) throw new Error(`Image not loaded: ${img.src}`);
                if (img.naturalWidth === 0) throw new Error(`Image broken: ${img.src}`);
            });
            return true;
        });

        // Test 3: Dynamic Asset Paths
        this.runTest(`${pageTitle} Asset Paths`, () => {
            const assets = document.querySelectorAll('img, link[rel="stylesheet"], script');
            assets.forEach(asset => {
                const src = asset.src || asset.href;
                if (src && !this.isValidPath(src)) {
                    throw new Error(`Invalid asset path: ${src}`);
                }
            });
            return true;
        });

        // Test 4: Interactive Elements
        this.runTest(`${pageTitle} Interactive Elements`, () => {
            const buttons = document.querySelectorAll('button, .btn, [role="button"]');
            const links = document.querySelectorAll('a:not([href^="http"])');
            
            buttons.forEach(button => {
                if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
                    throw new Error('Button missing accessible label');
                }
            });

            links.forEach(link => {
                if (!this.isValidPath(link.href)) {
                    throw new Error(`Invalid link: ${link.href}`);
                }
            });

            return true;
        });

        // Test 5: Responsive Layout
        this.runTest(`${pageTitle} Responsive Layout`, () => {
            const container = document.querySelector('.container');
            if (!container) throw new Error('Container element not found');
            
            const style = window.getComputedStyle(container);
            if (style.maxWidth === 'none') throw new Error('Container missing max-width');
            
            return true;
        });

        console.log(`✅ ${pageTitle} Tests Complete\n`);
    }

    /**
     * Page-Specific Tests
     */
    async testHomePage() {
        await this.testPage('index.html', 'Home Page');
        // Add home-specific tests
        this.runTest('Hero Section', () => {
            const hero = document.querySelector('.hero');
            if (!hero) throw new Error('Hero section not found');
            return true;
        });
    }

    async testAboutPage() {
        await this.testPage('pages/about.html', 'About Page');
        // Add about-specific tests
        this.runTest('Screening Types', () => {
            const screeningTypes = document.querySelectorAll('.screening-type-card');
            if (screeningTypes.length === 0) throw new Error('Screening type cards not found');
            return true;
        });
    }

    async testResourcesPage() {
        await this.testPage('pages/resources.html', 'Resources Page');
        // Add resources-specific tests
        this.runTest('Resource Categories', () => {
            const categories = document.querySelectorAll('.resource-category');
            if (categories.length === 0) throw new Error('Resource categories not found');
            return true;
        });
    }

    async testContactPage() {
        await this.testPage('pages/contact.html', 'Contact Page');
        // Add contact-specific tests
        this.runTest('Contact Form', () => {
            const form = document.querySelector('form');
            if (!form) throw new Error('Contact form not found');
            
            const requiredFields = form.querySelectorAll('[required]');
            if (requiredFields.length === 0) throw new Error('No required fields found in form');
            
            return true;
        });
    }

    // Add other page-specific test methods...

    /**
     * Helper Methods
     */
    runTest(name, testFn) {
        try {
            const result = testFn();
            if (result) {
                console.log(`  ✓ ${name}`);
                this.testResults.passed++;
            } else {
                console.log(`  ✗ ${name}`);
                this.testResults.failed++;
                this.errors.push(`${name}: Test returned false`);
            }
        } catch (error) {
            console.log(`  ✗ ${name}`);
            this.testResults.failed++;
            this.errors.push(`${name}: ${error.message}`);
        }
        this.testResults.total++;
    }

    isValidPath(path) {
        if (path.startsWith('http')) return true;
        return !path.includes('undefined') && !path.includes('null');
    }

    reportResults() {
        console.log('\n📊 Test Results:');
        console.log(`Total Tests: ${this.testResults.total}`);
        console.log(`Passed: ${this.testResults.passed}`);
        console.log(`Failed: ${this.testResults.failed}`);
        
        if (this.errors.length > 0) {
            console.log('\n❌ Errors:');
            this.errors.forEach(error => console.log(`  - ${error}`));
        }
    }
}

// Create test runner HTML
const testRunner = document.createElement('div');
testRunner.id = 'page-test-runner';
testRunner.innerHTML = `
    <style>
        #page-test-runner {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fff;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 9999;
            max-width: 400px;
        }
        #test-output {
            margin-top: 10px;
            padding: 10px;
            background: #f5f5f5;
            border-radius: 4px;
            max-height: 300px;
            overflow-y: auto;
            font-family: monospace;
            font-size: 12px;
        }
        .test-controls {
            margin-bottom: 10px;
        }
        .test-controls button {
            padding: 8px 16px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .test-controls button:hover {
            background: #0056b3;
        }
    </style>
    <div class="test-controls">
        <button onclick="window.runPageTests()">Run Page Tests</button>
    </div>
    <div id="test-output"></div>
`;

// Add test runner to page
document.body.appendChild(testRunner);

// Override console.log for test output
const originalLog = console.log;
console.log = function(...args) {
    originalLog.apply(console, args);
    const output = document.getElementById('test-output');
    if (output) {
        const text = args.join(' ').replace(/\n/g, '<br>');
        output.innerHTML += text + '<br>';
    }
};

// Global test runner function
window.runPageTests = async function() {
    const output = document.getElementById('test-output');
    if (output) output.innerHTML = '';
    
    const tester = new PageTester();
    await tester.runTests();
}; 