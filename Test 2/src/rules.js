// Rules: Unique ID and Orphan Pipe checks

const rules = [
    {
        id: "UNIQUE_ID",
        description: "All components must have unique IDs",
        severity: "ERROR",
        // Check for duplicate IDs across all items
        check: (data) => {
            const allItems = [...data.nodes, ...data.edges];
            const seen = new Set();
            const duplicates = [];
            allItems.forEach(item => {
                if (item.id) {
                    if (seen.has(item.id)) duplicates.push(item.id);
                    seen.add(item.id);
                }
            });
            return duplicates.length > 0 ? { affectedItems: duplicates, message: `Duplicate IDs: ${duplicates.join(", ")}` } : null;
        }
    },
    {
        id: "ORPHAN_PIPE",
        description: "Pipes must connect valid nodes",
        severity: "WARNING",
        // Check if pipe connects to existing nodes
        check: (data) => {
            const nodeIds = new Set(data.nodes.map(n => n.id));
            const orphans = [];
            data.edges.forEach(edge => {
                if (edge.type === 'pipe' && (!nodeIds.has(edge.source) || !nodeIds.has(edge.target))) {
                    orphans.push(edge.id);
                }
            });
            return orphans.length > 0 ? { affectedItems: orphans, message: `Orphan Pipes: ${orphans.join(", ")}` } : null;
        }
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = rules;
}
