@echo off
cd /d "%~dp0"
echo Export server will save files to:
echo C:\Users\factoy\Documents\New project\exports
echo.
echo Put source/reference images here:
echo C:\Users\factoy\Documents\New project\img
echo.
echo Keep this window open while using Export.
echo Open the app at http://127.0.0.1:53175/index.html for the most reliable export.
echo.
node tools\export-server.js
pause
