@echo off
title Plataforma Dorada - Servidor local

set "NODE_HOME=C:\Users\usuari_crae\Documents\node-v24.21.0-win-x64"
set "PATH=%NODE_HOME%;%PATH%"

cd /d "%~dp0"

echo.
echo ==========================================
echo       PLATAFORMA DORADA
echo       Servidor de desarrollo
echo ==========================================
echo http://localhost:3000
echo.
echo Iniciando...
echo.

call "%NODE_HOME%\npm.cmd" run dev -- --port 3000

echo.
echo ==========================================
echo El servidor se ha detenido.
echo Puedes cerrar esta ventana.
echo ==========================================
pause

