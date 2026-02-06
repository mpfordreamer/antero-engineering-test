import pandas as pd
import openpyxl
import os

def create_inputs_file():
    filename = "system_inputs.xlsx"
    
    # Define Base Parameters
    base_params = {
        "Volume_Retentat_Initial_L": 100.0,
        "Conc_Active_Initial_gL": 5.0,
        "Conc_DeadZone_Initial_gL": 5.0,
        "Feed_Flow_Rate_Lmin": 10.0,
        "Permeate_Flow_Rate_Lmin": 2.0,
        "Bypass_Fraction_Beta": 0.1,
        "DeadZone_Fraction_Alpha": 0.2,
        "Mass_Transfer_Coeff_kd": 0.5,
        "Simulation_Time_End_min": 60.0,
        "Time_Step_dt_min": 0.5
    }

    # Create 3 Scenarios
    scenarios = []
    
    # Scenario 1: Base Case
    s1 = base_params.copy()
    s1["Scenario_ID"] = "Run_Base"
    scenarios.append(s1)
    
    # Scenario 2: High Bypass
    s2 = base_params.copy()
    s2["Scenario_ID"] = "Run_HighBypass"
    s2["Bypass_Fraction_Beta"] = 0.3
    scenarios.append(s2)
    
    # Scenario 3: Large Dead Zone
    s3 = base_params.copy()
    s3["Scenario_ID"] = "Run_BigDeadZone"
    s3["DeadZone_Fraction_Alpha"] = 0.5
    scenarios.append(s3)
    
    # Create DataFrame
    # Ensure Scenario_ID is the first column
    df_inputs = pd.DataFrame(scenarios)
    cols = ["Scenario_ID"] + [c for c in df_inputs.columns if c != "Scenario_ID"]
    df_inputs = df_inputs[cols]
    
    # Write to Excel
    try:
        with pd.ExcelWriter(filename, engine='openpyxl') as writer:
            df_inputs.to_excel(writer, sheet_name='Inputs', index=False)
            
        print(f"Successfully created {filename}")
        print("Created 3 Scenarios with 'Scenario_ID' in Column A.")
        print("Outputs will be written to a separate file 'TFF_Simulation_Results.xlsx' by the solver.")
        
    except PermissionError:
        print(f"ERROR: Could not write to {filename}. Please close the file if it is open in Excel.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    create_inputs_file()
