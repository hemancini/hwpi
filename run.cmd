@echo off

net session >nul 2>&1
   if %errorlevel% neq 0 (
      echo error - this script must be run as an administrator
      pause
	  exit
   )

set patch=%~dp0
cd %patch%
echo %patch%
start run.hta