// Extractor: Extract valves, pipes, connections from components

function extractData(components) {
    const valves = [];
    const pipes = [];
    const connections = [];

    // Loop through all components
    components.forEach(comp => {
        // Extract valve data
        if (comp.type === 'valve') {
            valves.push({ id: comp.id, maxFlow: comp.maxFlow });
            // Extract pipe and connection data
        } else if (comp.type === 'pipe') {
            pipes.push({ id: comp.id, diameter: comp.diameter });
            // Add connection if pipe has source and target
            if (comp.source && comp.target) {
                connections.push({ from: comp.source, to: comp.target, pipeId: comp.id });
            }
        }
    });

    return { valves, pipes, connections };
}

module.exports = { extractData };
