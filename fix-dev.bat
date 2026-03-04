@echo off
echo ===== FIXING DEV SERVER ISSUES =====
echo.

echo Step 1: Deleting node_modules...
rd /s /q node_modules

echo Step 2: Deleting package-lock.json...
del package-lock.json

echo Step 3: Cleaning npm cache...
npm cache clean --force

echo Step 4: Reinstalling dependencies...
npm install

echo Step 5: Installing specific versions...
npm install --save-dev esbuild@latest vite@latest

echo Step 6: Starting dev server...
npm run dev

pause