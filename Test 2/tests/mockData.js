/**
 * mockData.js
 * Simple Node.js script to test the Validation Logic without the browser.
 */

const rules = require('../src/rules.js');
const ValidationEngine = require('../src/validationEngine.js');

const engine = new ValidationEngine(rules);

// --- TEST CASE 1: VALID DIAGRAM ---
const validData = {
    nodes: [
        { id: "V-101", type: "valve", maxFlow: 100 },
        { id: "V-102", type: "valve", maxFlow: 100 }
    ],
    edges: [
        { id: "P-001", type: "pipe", diameter: 10, source: "V-101", target: "V-102" }
    ]
};

console.log("--- TEST 1: Valid Data ---");
const report1 = engine.validateDiagram(validData);
console.log("Status:", report1.status);
console.log("Issues:", report1.issues.length);
console.log("");


// --- TEST CASE 2: INVALID DIAGRAM (Duplicate IDs, Orphan Pipe) ---
const invalidData = {
    nodes: [
        { id: "V-101", type: "valve" },
        { id: "V-101", type: "valve" } // DUPLICATE!
    ],
    edges: [
        { id: "P-999", type: "pipe", source: "V-101", target: "V-GHOST" } // ORPHAN! Target doesn't exist
    ]
};

console.log("--- TEST 2: Invalid Data ---");
const report2 = engine.validateDiagram(invalidData);
console.log("Status:", report2.status);
console.log("Issues found:");
report2.issues.forEach(issue => {
    console.log(`[${issue.severity}] ${issue.message}`);
});
console.log("");
console.log("Test Complete.");
