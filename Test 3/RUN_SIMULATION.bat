@echo off
echo ============================================
echo   TFF Simulation - Running...
echo ============================================
cd /d "%~dp0"
python solve_system.py
echo.
echo ============================================
echo   Complete! Opening results...
echo ============================================
start "" "system_outputs.xlsx"
pause
