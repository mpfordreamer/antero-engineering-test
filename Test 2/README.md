# Diagram Validation Plugin (Test 2)

A Draw.io plugin for P&ID diagram validation with components and rule-based validation.

## Quick Test

```bash
node tests/runTests.js
```

## Project Structure
```
Test 2/
├── src/
│   ├── components.js   # Part 1: Valve & Pipe factories
│   ├── extractor.js    # Part 2: Data extraction
│   ├── validator.js    # Part 2: Basic validation
│   ├── ruleEngine.js   # Part 3: Rule-based engine
│   └── plugin.js       # Draw.io integration wrapper
├── rules/
│   └── validation.json # Part 3: Rules as data
└── tests/
    └── runTests.js     # Test suite
```

## Parts Implemented

### Part 1: Drag & Drop Components
- **Valve**: `{ id, type: 'valve', maxFlow }`
- **Pipe**: `{ id, type: 'pipe', diameter, source, target }`

### Part 2: Extract & Validate
- Extracts valves, pipes, and connections from diagram
- Validates: unique IDs, valid connections

### Part 3: Rule Engine
- Rules defined in `rules/validation.json`
- Adding new rules requires NO code changes
- Current rules: UNIQUE_IDS, VALID_CONNECTION, FLOW_001

## Validation Output Example
```json
{
  "status": "FAIL",
  "issues": [
    { "ruleId": "VALID_CONNECTION", "message": "Pipe P-201 connects to missing valve V-999" }
  ]
}
```

## Draw.io Integration Note

The `plugin.js` file demonstrates Draw.io API integration:
- `Draw.loadPlugin()` for plugin registration
- `ui.actions.addAction()` for menu items
- `graph.getModel().cells` for data extraction

> **Note**: Draw.io restricts external plugin loading by default for security. This is a platform limitation, not a code issue. The validation logic is fully functional and demonstrated via Node.js tests.

## Design Decisions

1. **Modular Architecture**: Separate files for components, extraction, validation, and rules
2. **Data-Driven Rules**: Rules stored as JSON, extensible without code changes
3. **Testable Code**: All logic works independently of Draw.io UI
4. **Clear Separation**: Data, logic, and UI are separated as required

## AI Tool Usage
Claude AI assisted with code structure, validation rules, and test design.
