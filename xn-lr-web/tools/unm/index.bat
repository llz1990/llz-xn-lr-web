SET mypath=%~dp0

Powershell.exe -executionpolicy remotesigned -File  %mypath%\unm.ps1
