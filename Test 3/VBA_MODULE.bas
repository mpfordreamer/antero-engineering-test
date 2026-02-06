' ============================================
' VBA Module for TFF Simulation
' Copy this entire file content into Excel VBA
' ============================================
' HOW TO USE:
' 1. Save system_inputs.xlsx as system_inputs.xlsm (macro-enabled)
' 2. Press Alt+F11 to open VBA Editor
' 3. Insert > Module
' 4. Paste this entire code
' 5. Insert a button on sheet, assign macro "RunSimulation"
' ============================================

Sub RunSimulation()
    Dim objShell As Object
    Dim PythonScript As String
    Dim OutputFile As String
    Dim Result As Integer
    
    ' Get file paths
    PythonScript = ThisWorkbook.Path & "\solve_system.py"
    OutputFile = ThisWorkbook.Path & "\system_outputs.xlsx"
    
    ' Check if Python script exists
    If Dir(PythonScript) = "" Then
        MsgBox "Error: solve_system.py not found!", vbCritical
        Exit Sub
    End If
    
    ' Close output file if open
    On Error Resume Next
    Workbooks("system_outputs.xlsx").Close SaveChanges:=False
    On Error GoTo 0
    
    ' Show status
    Application.StatusBar = "Running TFF Simulation... Please wait."
    Application.ScreenUpdating = False
    
    ' Run Python script
    Set objShell = CreateObject("WScript.Shell")
    Result = objShell.Run("python """ & PythonScript & """", 1, True)
    
    ' Reset status
    Application.StatusBar = ""
    Application.ScreenUpdating = True
    
    ' Check result
    If Result = 0 Then
        ' Success - ask to open results
        If MsgBox("Simulation Complete!" & vbNewLine & vbNewLine & _
                  "Open results file?", vbYesNo + vbInformation, "Success") = vbYes Then
            If Dir(OutputFile) <> "" Then
                Workbooks.Open OutputFile
            Else
                MsgBox "Output file not found!", vbExclamation
            End If
        End If
    Else
        MsgBox "Simulation failed! Check Python installation.", vbCritical
    End If
    
    Set objShell = Nothing
End Sub

Sub CreateRunButton()
    ' Helper macro to create button on active sheet
    Dim btn As Button
    Set btn = ActiveSheet.Buttons.Add(10, 10, 120, 30)
    btn.Caption = "Run Simulation"
    btn.OnAction = "RunSimulation"
End Sub
