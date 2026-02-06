// Components: Valve and Pipe factories

// Create valve with ID and maxFlow
function createValve(id, maxFlow) {
    return {
        id: id,
        type: 'valve',
        maxFlow: maxFlow,
        shape: { width: 40, height: 40, style: 'shape=mxgraph.pid.valves.gate_valve' }
    };
}

// Create pipe with ID, diameter, and optional connections
function createPipe(id, diameter, source = null, target = null) {
    return {
        id: id,
        type: 'pipe',
        diameter: diameter,
        source: source,
        target: target,
        shape: { style: 'endArrow=none;strokeWidth=3' }
    };
}

// Extract metadata for Draw.io cell storage
function getMetadata(component) {
    if (component.type === 'valve') {
        return { id: component.id, type: 'valve', maxFlow: component.maxFlow };
    } else if (component.type === 'pipe') {
        return { id: component.id, type: 'pipe', diameter: component.diameter };
    }
    return null;
}

module.exports = { createValve, createPipe, getMetadata };
