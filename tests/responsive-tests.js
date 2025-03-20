/**
 * Responsive Design Testing Suite
 * Tests responsive behavior across different viewport sizes
 */

class ResponsiveTester {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            total: 0
        };
        this.errors = [];
        this.viewports = {
            desktop: { width: 1920, height: 1080 },
            laptop: { width: 1366, height: 768 },
            tablet: { width: 768, height: 1024 },
            mobile: { width: 375, height: 667 }
        };
    }

    /**
     * Test Runner
     */
    async runTests() {
        console.log('🧪 Starting Responsive Design Tests...\n');
        
        // Test each viewport size
        for (const [device, dimensions] of Object.entries(this.viewports)) {
            await this.testViewport(device, dimensions);
        }
        
        // Test orientation changes
        await this.testOrientationChange();
        
        // Report Results
        this.reportResults();
    }

    /**
     * Viewport Testing
     */
    async testViewport(device, dimensions) {
        console.log(`📋 Testing ${device.charAt(0).toUpperCase() + device.slice(1)} Viewport (${dimensions.width}x${dimensions.height})...`);
        
        // Set viewport size
        this.setViewport(dimensions.width, dimensions.height);
        
        // Test 1: Container Responsiveness
        this.runTest(`${device} Container`, () => {
            const container = document.querySelector('.container');
            if (!container) throw new Error('Container element not found');
            
            const style = window.getComputedStyle(container);
            const width = parseInt(style.width);
            
            if (width > dimensions.width) {
                throw new Error(`Container width (${width}px) exceeds viewport width (${dimensions.width}px)`);
            }
            
            return true;
        });

        // Test 2: Navigation Menu
        this.runTest(`${device} Navigation`, () => {
            const navbar = document.querySelector('.navbar');
            if (!navbar) throw new Error('Navbar not found');
            
            if (dimensions.width < 768) {
                // Mobile menu should be collapsed
                const menu = document.querySelector('.navbar-menu');
                if (menu && window.getComputedStyle(menu).display !== 'none') {
                    throw new Error('Mobile menu should be collapsed by default');
                }
                
                // Hamburger should be visible
                const toggle = document.querySelector('.navbar-toggle');
                if (!toggle || window.getComputedStyle(toggle).display === 'none') {
                    throw new Error('Hamburger menu not visible on mobile');
                }
            } else {
                // Desktop menu should be visible
                const menu = document.querySelector('.navbar-menu');
                if (menu && window.getComputedStyle(menu).display === 'none') {
                    throw new Error('Desktop menu should be visible');
                }
            }
            
            return true;
        });

        // Test 3: Image Scaling
        this.runTest(`${device} Images`, () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                const style = window.getComputedStyle(img);
                const width = parseInt(style.width);
                
                if (width > dimensions.width) {
                    throw new Error(`Image width (${width}px) exceeds viewport width (${dimensions.width}px)`);
                }
            });
            
            return true;
        });

        // Test 4: Font Scaling
        this.runTest(`${device} Typography`, () => {
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach(heading => {
                const fontSize = parseInt(window.getComputedStyle(heading).fontSize);
                if (fontSize > dimensions.width * 0.15) {
                    throw new Error(`Heading font size (${fontSize}px) too large for viewport`);
                }
            });
            
            return true;
        });

        // Test 5: Grid Layouts
        this.runTest(`${device} Grid Layouts`, () => {
            const grids = document.querySelectorAll('.grid, .row');
            grids.forEach(grid => {
                const items = grid.children;
                if (dimensions.width < 768) {
                    // Check if grid items stack on mobile
                    Array.from(items).forEach(item => {
                        const style = window.getComputedStyle(item);
                        if (style.float !== 'none' && style.display !== 'block') {
                            throw new Error('Grid items should stack on mobile');
                        }
                    });
                }
            });
            
            return true;
        });

        console.log(`✅ ${device} Viewport Tests Complete\n`);
    }

    /**
     * Orientation Testing
     */
    async testOrientationChange() {
        console.log('📋 Testing Orientation Changes...');
        
        const dimensions = { width: 375, height: 667 };
        
        // Test portrait orientation
        this.setViewport(dimensions.width, dimensions.height);
        this.runTest('Portrait Orientation', () => {
            return this.testOrientationLayout('portrait');
        });
        
        // Test landscape orientation
        this.setViewport(dimensions.height, dimensions.width);
        this.runTest('Landscape Orientation', () => {
            return this.testOrientationLayout('landscape');
        });
        
        console.log('✅ Orientation Tests Complete\n');
    }

    /**
     * Helper Methods
     */
    setViewport(width, height) {
        // In a real browser environment, this would resize the viewport
        // For our test runner, we'll simulate it by updating CSS custom properties
        document.documentElement.style.setProperty('--viewport-width', `${width}px`);
        document.documentElement.style.setProperty('--viewport-height', `${height}px`);
    }

    testOrientationLayout(orientation) {
        const container = document.querySelector('.container');
        if (!container) throw new Error('Container element not found');
        
        const style = window.getComputedStyle(container);
        const width = parseInt(style.width);
        
        if (orientation === 'portrait') {
            if (width > 375) throw new Error('Container too wide for portrait orientation');
        } else {
            if (width > 667) throw new Error('Container too wide for landscape orientation');
        }
        
        return true;
    }

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
testRunner.id = 'responsive-test-runner';
testRunner.innerHTML = `
    <style>
        #responsive-test-runner {
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
        <button onclick="window.runResponsiveTests()">Run Responsive Tests</button>
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
window.runResponsiveTests = async function() {
    const output = document.getElementById('test-output');
    if (output) output.innerHTML = '';
    
    const tester = new ResponsiveTester();
    await tester.runTests();
}; 