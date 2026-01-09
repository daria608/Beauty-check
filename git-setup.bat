@echo off
REM Git setup script for site-web-design
REM Run this script after installing Git

echo Creating README.md...
echo # site-web-design >> README.md

echo Initializing Git repository...
git init

echo Adding README.md...
git add README.md

echo Making first commit...
git commit -m "first commit"

echo Renaming branch to main...
git branch -M main

echo Adding remote origin...
git remote add origin https://github.com/terizzizz/site-web-design.git

echo Pushing to GitHub...
git push -u origin main

echo Done!

