// Draw.io Plugin: Menu actions for Valve, Pipe, and Validate

const { createValve, createPipe, getMetadata } = require('./components');
const { extractData } = require('./extractor');
const { RuleEngine } = require('./ruleEngine');

Draw.loadPlugin(function (ui) {

    // Action: Insert Valve component
    ui.actions.addAction('insertValve', function () {
        const id = prompt('Enter Valve ID (e.g., V-101):');
        const maxFlow = parseInt(prompt('Enter Max Flow:'));
        if (id && maxFlow) {
            const valve = createValve(id, maxFlow);
            const cell = new mxCell(valve.id,
                new mxGeometry(100, 100, valve.shape.width, valve.shape.height),
                valve.shape.style);
            cell.vertex = true;
            cell.setValue(JSON.stringify(getMetadata(valve)));
            ui.editor.graph.addCell(cell);
        }
    });

    // Action: Insert Pipe component
    ui.actions.addAction('insertPipe', function () {
        const id = prompt('Enter Pipe ID (e.g., P-201):');
        const diameter = parseInt(prompt('Enter Diameter:'));
        if (id && diameter) {
            const pipe = createPipe(id, diameter);
            alert('Select two valves to connect.');
        }
    });

    // Action: Validate all components in diagram
    ui.actions.addAction('validateSystem', function () {
        const graph = ui.editor.graph;
        const components = [];
        const cells = graph.getModel().cells;

        // Extract component data from cells
        for (let key in cells) {
            const cell = cells[key];
            if (cell.value) {
                try {
                    const meta = JSON.parse(cell.value);
                    if (meta.type === 'valve') {
                        components.push({ ...meta, type: 'valve' });
                    } else if (meta.type === 'pipe') {
                        components.push({
                            ...meta, type: 'pipe',
                            source: cell.source?.value ? JSON.parse(cell.source.value).id : null,
                            target: cell.target?.value ? JSON.parse(cell.target.value).id : null
                        });
                    }
                } catch (e) { }
            }
        }

        // Run validation
        const data = extractData(components);
        const engine = new RuleEngine('./rules/validation.json');
        const result = engine.validate(data);

        // Show result
        let msg = `Status: ${result.status}\nPassed: ${result.passed}/${result.totalRules}\n`;
        result.issues.forEach(i => msg += `[${i.severity}] ${i.message}\n`);
        alert(msg);
    });

    // Add menu items to Extras menu
    ui.menus.addMenuItems(ui.menus.get('extras'), ['-', 'insertValve', 'insertPipe', '-', 'validateSystem']);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createValve, createPipe, extractData, RuleEngine };
}
