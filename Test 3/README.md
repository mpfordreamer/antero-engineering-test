# TFF Simulation System (Test 3)

Tangential Flow Filtration simulation with Excel-Python automation and chart generation.

## Requirements

```bash
pip install pandas numpy scipy openpyxl
```

## How to Run

### Option 1: Double-click (Recommended)
```
Double-click: RUN_SIMULATION.bat
```
Python runs automatically → Results file opens with charts.

### Option 2: Command Line
```bash
python solve_system.py
```

### Option 3: Excel VBA Button
1. Save `system_inputs.xlsx` as `.xlsm` (macro-enabled)
2. Press `Alt+F11` → Import `VBA_MODULE.bas`
3. Press `Alt+F8` → Run `CreateRunButton`
4. Click the button to run simulation

## Files

| File | Description |
|------|-------------|
| solve_system.py | Main simulation script |
| generate_inputs.py | Generate sample input data |
| system_inputs.xlsx | Input parameters (edit this) |
| system_outputs.xlsx | Results with charts (generated) |
| RUN_SIMULATION.bat | One-click automation |
| VBA_MODULE.bas | Excel VBA code for button |

## Input Parameters

| Column | Description |
|--------|-------------|
| Volume_Retentat_Initial_L | Initial volume (L) |
| Conc_Active_Initial_gL | Initial concentration (g/L) |
| DeadZone_Fraction_Alpha | Dead zone fraction (0-1) |
| Bypass_Fraction_Beta | Bypass flow fraction (0-1) |
| Feed_Flow_Rate_Lmin | Feed flow rate (L/min) |
| Permeate_Flow_Rate_Lmin | Permeate flow (L/min) |

## Output Analysis

| Column | Insight |
|--------|---------|
| Time_min | Process duration |
| Volume_Retentat_L | Volume change over time |
| Conc_Active_gL | Active zone concentration |
| Conc_DeadZone_gL | Dead zone effects |
| Conc_Total_Output_gL | Combined output |

## Dashboard Charts
- **Line Chart**: Concentration vs Time for all scenarios
- **Bar Chart**: Final concentration comparison

## AI Tool Usage
Claude AI assisted with simulation logic and automation scripts.
