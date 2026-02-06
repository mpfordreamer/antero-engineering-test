# Antero Engineering Technical Test

This repository contains solutions for three technical tests.

---

## Test 1: Text Chunking & Search System

**Language:** Python

A system to process text files, chunk them into smaller pieces, store in SQLite database, and search with scoring.

**Features:**
- Process `.txt` and `.docx` files
- Automatic text chunking (500 chars, 100 overlap)
- SQLite storage with metadata
- Search with relevance scoring

**Quick Start:**
```bash
cd "Test 1/text_search_project"
pip install python-docx
python main.py --add sample.txt
python main.py --search "keyword"
```

---

## Test 2: Diagram Validation Plugin

**Language:** JavaScript (Node.js)

A validation system for P&ID diagrams with rule-based engine.

**Features:**
- Component definitions (Valve, Pipe)
- Data extraction from diagrams
- Validation rules (unique IDs, valid connections, flow checks)
- JSON-based rule engine for extensibility

**Quick Start:**
```bash
cd "Test 2/diagram_validation_plugin"
node tests/runTests.js
```

---

## Test 3: TFF Simulation System

**Language:** Python

Batch Tangential Flow Filtration (TFF) simulation with Excel I/O and automated charts.

**Features:**
- Read parameters from Excel
- ODE-based simulation with non-ideal CSTR model
- Dead zone and bypass modeling
- Auto-generated charts in Excel dashboard

**Quick Start:**
```bash
cd "Test 3"
pip install pandas numpy scipy openpyxl
python solve_system.py
# Or double-click RUN_SIMULATION.bat
```

---

## AI Tool Usage

Claude AI was used to assist with:
- Code structure and implementation
- Debugging and optimization
- Documentation

---

## Author

Dewa Merta
