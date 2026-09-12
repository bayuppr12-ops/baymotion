@echo off
title PJOK PLAYGROUND - Localhost Server
color 0A
cls
echo ============================================================
echo           🏆 PJOK PLAYGROUND - LOCALHOST 🏆
echo ============================================================
echo.
echo Membuka browser ke http://localhost:3000 ...
start "" http://localhost:3000
echo.
npm run dev
pause
