/**
 * Component Testing Suite
 * This script provides automated tests for verifying component functionality
 */

class ComponentTester {
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
        console.log('🧪 Starting Component Tests...\n');
        
        // Header Component Tests
        await this.testHeaderComponent();
        
        // Footer Component Tests
        await this.testFooterComponent();
        
        // Breadcrumb Component Tests
        await this.testBreadcrumbComponent();
        
        // Report Results
        this.reportResults();
    }

    /**
     * Header Component Tests
     */
    async testHeaderComponent() {
        console.log('📋 Testing Header Component...');
        
        // Test 1: Component Loading
        this.runTest('Header Loading', () => {
            const header = document.querySelector('header');
            if (!header) throw new Error('Header element not found');
            
            const navbar = header.querySelector('.navbar');
            if (!navbar) throw new Error('Navbar not found in header');
            
            return true;
        });

        // Test 2: Navigation Links
        this.runTest('Navigation Links', () => {
            const menuItems = document.querySelectorAll('.navbar-menu a');
            if (menuItems.length === 0) throw new Error('No navigation links found');
            
            const requiredLinks = ['Home', 'About', 'Screening', 'Facilities', 'Resources', 'FAQ', 'Contact'];
            const foundLinks = Array.from(menuItems).map(link => link.textContent);
            
            const missingLinks = requiredLinks.filter(link => !foundLinks.includes(link));
            if (missingLinks.length > 0) {
                throw new Error(`Missing navigation links: ${missingLinks.join(', ')}`);
            }
            
            return true;
        });

        // Test 3: Path Resolution
        this.runTest('Path Resolution', () => {
            const currentPath = window.location.pathname;
            const depth = this.calculatePathDepth(currentPath);
            const links = document.querySelectorAll('.navbar-menu a');
            
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (!this.isValidPath(href, depth)) {
                    throw new Error(`Invalid path resolution for link: ${href}`);
                }
            });
            
            return true;
        });

        // Test 4: Mobile Menu
        this.runTest('Mobile Menu', () => {
            const toggle = document.querySelector('.navbar-toggle');
            if (!toggle) throw new Error('Mobile menu toggle not found');
            
            const menu = document.querySelector('.navbar-menu');
            if (!menu) throw new Error('Mobile menu not found');
            
            // Test toggle functionality
            toggle.click();
            const isMenuActive = menu.classList.contains('active');
            if (!isMenuActive) throw new Error('Mobile menu not activating on click');
            
            // Reset state
            toggle.click();
            
            return true;
        });

        // Test 5: Active State
        this.runTest('Active State', () => {
            const currentPath = window.location.pathname;
            const activeLinks = document.querySelectorAll('.navbar-menu a.active');
            
            if (activeLinks.length === 0) {
                throw new Error('No active menu item found');
            }
            
            if (activeLinks.length > 1) {
                throw new Error('Multiple active menu items found');
            }
            
            return true;
        });

        console.log('✅ Header Component Tests Complete\n');
    }

    /**
     * Footer Component Tests
     */
    async testFooterComponent() {
        console.log('📋 Testing Footer Component...');
        
        // Test 1: Component Loading
        this.runTest('Footer Loading', () => {
            const footer = document.querySelector('footer');
            if (!footer) throw new Error('Footer element not found');
            return true;
        });

        // Test 2: Copyright Year
        this.runTest('Copyright Year', () => {
            const copyright = document.querySelector('.footer-bottom p');
            if (!copyright) throw new Error('Copyright text not found');
            
            const currentYear = new Date().getFullYear().toString();
            if (!copyright.textContent.includes(currentYear)) {
                throw new Error('Copyright year not updated to current year');
            }
            
            return true;
        });

        console.log('✅ Footer Component Tests Complete\n');
    }

    /**
     * Breadcrumb Component Tests
     */
    async testBreadcrumbComponent() {
        console.log('📋 Testing Breadcrumb Component...');
        
        // Test 1: Component Loading
        this.runTest('Breadcrumb Loading', () => {
            const breadcrumb = document.querySelector('.breadcrumb');
            if (!breadcrumb) throw new Error('Breadcrumb element not found');
            return true;
        });

        // Test 2: Home Link
        this.runTest('Home Link', () => {
            const homeLink = document.querySelector('#breadcrumb-home');
            if (!homeLink) throw new Error('Home link not found in breadcrumb');
            
            const href = homeLink.getAttribute('href');
            const depth = this.calculatePathDepth(window.location.pathname);
            const expectedPath = depth === 0 ? 'index.html' : '../'.repeat(depth) + 'index.html';
            
            if (href !== expectedPath) {
                throw new Error(`Invalid home link path. Expected: ${expectedPath}, Got: ${href}`);
            }
            
            return true;
        });

        console.log('✅ Breadcrumb Component Tests Complete\n');
    }

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

    calculatePathDepth(path) {
        if (!path.includes('/pages/')) return 0;
        return path.split('/').length - 2;
    }

    isValidPath(href, depth) {
        if (href.startsWith('http')) return true;
        if (depth === 0) return !href.includes('../');
        return href.startsWith('../'.repeat(depth)) || href.startsWith('/');
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
testRunner.id = 'component-test-runner';
testRunner.innerHTML = `
    <style>
        #component-test-runner {
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
        <button onclick="window.runComponentTests()">Run Tests</button>
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
window.runComponentTests = async function() {
    const output = document.getElementById('test-output');
    if (output) output.innerHTML = '';
    
    const tester = new ComponentTester();
    await tester.runTests();
}; 