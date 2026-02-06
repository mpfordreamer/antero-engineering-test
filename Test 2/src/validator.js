// Validator: Check unique IDs, valid connections, flow constraints

function validate(data) {
    const issues = [];

    // Check for duplicate IDs
    const allIds = [...data.valves.map(v => v.id), ...data.pipes.map(p => p.id)];
    const duplicates = allIds.filter((id, i) => allIds.indexOf(id) !== i);
    if (duplicates.length > 0) {
        issues.push({
            ruleId: 'UNIQUE_IDS',
            status: 'FAIL',
            message: `Duplicate IDs: ${[...new Set(duplicates)].join(', ')}`,
            affectedItems: [...new Set(duplicates)]
        });
    }

    // Check if pipes connect to existing valves
    const valveIds = new Set(data.valves.map(v => v.id));
    data.connections.forEach(conn => {
        if (!valveIds.has(conn.from)) {
            issues.push({
                ruleId: 'VALID_CONNECTION',
                status: 'FAIL',
                message: `Pipe ${conn.pipeId} → missing valve ${conn.from}`,
                affectedItems: [conn.pipeId, conn.from]
            });
        }
        if (!valveIds.has(conn.to)) {
            issues.push({
                ruleId: 'VALID_CONNECTION',
                status: 'FAIL',
                message: `Pipe ${conn.pipeId} → missing valve ${conn.to}`,
                affectedItems: [conn.pipeId, conn.to]
            });
        }
    });

    // Check flow constraints between connected valves
    const valveMap = {};
    data.valves.forEach(v => valveMap[v.id] = v);
    data.connections.forEach(conn => {
        const upstream = valveMap[conn.from];
        const downstream = valveMap[conn.to];
        if (upstream && downstream && upstream.maxFlow > downstream.maxFlow) {
            issues.push({
                ruleId: 'FLOW_CHECK',
                status: 'WARNING',
                message: `${conn.from} (${upstream.maxFlow}) > ${conn.to} (${downstream.maxFlow})`,
                affectedItems: [conn.from, conn.to]
            });
        }
    });

    // Return validation result
    return {
        status: issues.length === 0 ? 'PASS' : 'FAIL',
        issueCount: issues.length,
        issues: issues
    };
}

module.exports = { validate };
