// Test Suite for Diagram Validation Plugin
// Run: node tests/runTests.js

const { createValve, createPipe, getMetadata } = require('../src/components');
const { extractData } = require('../src/extractor');
const { validate } = require('../src/validator');
const { RuleEngine } = require('../src/ruleEngine');
const path = require('path');

console.log('='.repeat(60));
console.log('DIAGRAM VALIDATION PLUGIN - TEST SUITE');
console.log('='.repeat(60));

// Test 1: Component Creation (Part 1)
console.log('\n--- TEST 1: Component Creation ---');
const v1 = createValve('V-101', 100);
const v2 = createValve('V-102', 80);
const p1 = createPipe('P-201', 25, 'V-101', 'V-102');
console.log('Valve V-101:', getMetadata(v1));
console.log('Valve V-102:', getMetadata(v2));
console.log('Pipe P-201:', getMetadata(p1));
console.log('✅ Part 1: Components created successfully');

// Test 2: Data Extraction (Part 2)
console.log('\n--- TEST 2: Data Extraction ---');
const components = [v1, v2, p1];
const extractedData = extractData(components);
console.log('Extracted Data:', JSON.stringify(extractedData, null, 2));
console.log('✅ Part 2: Data extracted successfully');

// Test 3: Basic Validation (Part 2)
console.log('\n--- TEST 3: Basic Validation (Valid Data) ---');
const validResult = validate(extractedData);
console.log('Status:', validResult.status);
console.log('Issues:', validResult.issueCount);

// Test 4: Invalid Data Validation
console.log('\n--- TEST 4: Basic Validation (Invalid Data) ---');
const invalidComponents = [
    createValve('V-101', 100),
    createValve('V-101', 50),  // Duplicate ID!
    createPipe('P-201', 25, 'V-101', 'V-999')  // Missing valve V-999!
];
const invalidData = extractData(invalidComponents);
const invalidResult = validate(invalidData);
console.log('Status:', invalidResult.status);
console.log('Issues found:');
invalidResult.issues.forEach(issue => {
    console.log(`  [${issue.ruleId}] ${issue.message}`);
});

// Test 5: Rule Engine (Part 3)
console.log('\n--- TEST 5: Rule Engine (Part 3) ---');
const rulesPath = path.join(__dirname, '..', 'rules', 'validation.json');
const engine = new RuleEngine(rulesPath);

console.log('\nTesting with VALID data:');
const engineValidResult = engine.validate(extractedData);
console.log('Status:', engineValidResult.status);
console.log(`Rules: ${engineValidResult.passed}/${engineValidResult.totalRules} passed`);

console.log('\nTesting with INVALID data:');
const engineInvalidResult = engine.validate(invalidData);
console.log('Status:', engineInvalidResult.status);
console.log(`Rules: ${engineInvalidResult.passed}/${engineInvalidResult.totalRules} passed`);
console.log('Issues:');
engineInvalidResult.issues.forEach(issue => {
    console.log(`  [${issue.severity}] ${issue.ruleId}: ${issue.message}`);
});

// Test 6: Flow Constraint
console.log('\n--- TEST 6: Flow Constraint Check ---');
const flowComponents = [
    createValve('V-001', 200),  // High flow upstream
    createValve('V-002', 50),   // Low flow downstream - violation!
    createPipe('P-001', 30, 'V-001', 'V-002')
];
const flowData = extractData(flowComponents);
const flowResult = engine.validate(flowData);
console.log('Status:', flowResult.status);
flowResult.issues.forEach(issue => {
    console.log(`  [${issue.severity}] ${issue.message}`);
});

console.log('\n' + '='.repeat(60));
console.log('ALL TESTS COMPLETED');
console.log('='.repeat(60));
