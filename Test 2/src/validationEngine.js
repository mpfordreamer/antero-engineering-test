// Validation Engine: Run rules against diagram data

class ValidationEngine {
    constructor(rules) {
        this.rules = rules;
    }

    // Validate diagram against all rules
    validateDiagram(data) {
        const issues = [];

        // Check data format
        if (!data || (!data.nodes && !data.edges)) {
            return { status: "FAIL", message: "Invalid Data", issues: [] };
        }

        // Run each rule
        this.rules.forEach(rule => {
            try {
                const result = rule.check(data);
                if (result) {
                    issues.push({
                        ruleId: rule.id,
                        severity: rule.severity || "ERROR",
                        message: result.message,
                        affectedItems: result.affectedItems || []
                    });
                }
            } catch (err) {
                issues.push({ ruleId: rule.id, severity: "CRITICAL", message: err.message, affectedItems: [] });
            }
        });

        // Determine final status
        return {
            status: issues.some(i => i.severity === "ERROR" || i.severity === "CRITICAL") ? "FAIL" : "PASS",
            timestamp: new Date().toISOString(),
            issueCount: issues.length,
            issues: issues
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationEngine;
}
