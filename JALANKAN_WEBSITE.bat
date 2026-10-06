@echo off
title BAYMOTION - Localhost Server
color 0A
cls
echo ============================================================
echo               🏆 BAYMOTION - LOCALHOST 🏆
echo ============================================================
echo.
echo Membuka browser ke http://localhost:3000 ...
start "" http://localhost:3000
echo.
npm run dev
pause
