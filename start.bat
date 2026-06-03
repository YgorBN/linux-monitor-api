@echo off
cd /d %~dp0

call venv\Scripts\activate

start cmd /k "uvicorn main:app --reload"

timeout /t 3 >nul

start http://127.0.0.1:8000