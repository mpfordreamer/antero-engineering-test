// Rule Engine: Load rules from JSON and validate

const fs = require('fs');

class RuleEngine {
    // Load rules from JSON file
    constructor(rulesPath) {
        this.rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
        this.checkFunctions = {
            duplicateIds: this.checkDuplicateIds.bind(this),
            validConnection: this.checkValidConnection.bind(this),
            flowCheck: this.checkFlowConstraint.bind(this)
        };
    }

    // Check for duplicate component IDs
    checkDuplicateIds(data, rule) {
        const allIds = [...data.valves.map(v => v.id), ...data.pipes.map(p => p.id)];
        const duplicates = [...new Set(allIds.filter((id, i) => allIds.indexOf(id) !== i))];
        if (duplicates.length > 0) {
            return {
                ruleId: rule.ruleId, severity: rule.severity, passed: false,
                message: `${rule.description}: ${duplicates.join(', ')}`,
                affectedItems: duplicates
            };
        }
        return { ruleId: rule.ruleId, passed: true };
    }

    // Check if pipes connect to valid valves
    checkValidConnection(data, rule) {
        const valveIds = new Set(data.valves.map(v => v.id));
        const issues = [];
        data.connections.forEach(conn => {
            const missing = [];
            if (!valveIds.has(conn.from)) missing.push(conn.from);
            if (!valveIds.has(conn.to)) missing.push(conn.to);
            if (missing.length > 0) {
                issues.push({
                    ruleId: rule.ruleId, severity: rule.severity, passed: false,
                    message: `Pipe ${conn.pipeId} → missing: ${missing.join(', ')}`,
                    affectedItems: [conn.pipeId, ...missing]
                });
            }
        });
        return issues.length > 0 ? issues : { ruleId: rule.ruleId, passed: true };
    }

    // Check upstream flow does not exceed downstream
    checkFlowConstraint(data, rule) {
        const valveMap = {};
        data.valves.forEach(v => valveMap[v.id] = v);
        const issues = [];
        data.connections.forEach(conn => {
            const up = valveMap[conn.from];
            const down = valveMap[conn.to];
            if (up && down && up.maxFlow > down.maxFlow) {
                issues.push({
                    ruleId: rule.ruleId, severity: rule.severity, passed: false,
                    message: `${conn.from} (${up.maxFlow}) > ${conn.to} (${down.maxFlow})`,
                    affectedItems: [conn.from, conn.to]
                });
            }
        });
        return issues.length > 0 ? issues : { ruleId: rule.ruleId, passed: true };
    }

    // Run all rules and return result
    validate(data) {
        const results = [];
        this.rules.forEach(rule => {
            const checkFn = this.checkFunctions[rule.check];
            if (checkFn) {
                const result = checkFn(data, rule);
                Array.isArray(result) ? results.push(...result) : results.push(result);
            }
        });
        const failed = results.filter(r => !r.passed);
        return {
            status: failed.length === 0 ? 'PASS' : 'FAIL',
            totalRules: this.rules.length,
            passed: results.filter(r => r.passed).length,
            failed: failed.length,
            issues: failed
        };
    }
}

module.exports = { RuleEngine };
