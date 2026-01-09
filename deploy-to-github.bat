@echo off
REM Скрипт для загрузки сайта на GitHub и настройки GitHub Pages
REM Убедитесь, что Git установлен и вы находитесь в папке web_design

echo ========================================
echo  Deploy to GitHub Pages
echo ========================================
echo.

REM Проверка наличия Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Git не установлен!
    echo Скачайте Git: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/6] Инициализация репозитория...
if not exist .git (
    git init
) else (
    echo Репозиторий уже инициализирован
)

echo.
echo [2/6] Добавление файлов...
git add .

echo.
echo [3/6] Создание коммита...
git commit -m "Deploy website to GitHub Pages" 2>nul
if errorlevel 1 (
    echo Нет изменений для коммита
) else (
    echo Коммит создан успешно
)

echo.
echo [4/6] Настройка ветки main...
git branch -M main

echo.
echo [5/6] Добавление remote репозитория...
git remote remove origin 2>nul
git remote add origin https://github.com/terizzizz/site-web-design.git

echo.
echo [6/6] Отправка на GitHub...
git push -u origin main --force

echo.
echo ========================================
echo  Готово!
echo ========================================
echo.
echo Следующие шаги:
echo 1. Откройте: https://github.com/terizzizz/site-web-design
echo 2. Settings ^> Pages
echo 3. Source: main branch, / (root)
echo 4. Сохраните
echo.
echo Ваш сайт будет доступен через 1-2 минуты:
echo https://terizzizz.github.io/site-web-design/
echo.
pause

