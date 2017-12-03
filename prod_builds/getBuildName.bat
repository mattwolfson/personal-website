@echo off
setlocal enabledelayedexpansion

For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (
	set fulldate=%%c.%%a.%%b
)

set mydate=%fulldate:~2,10%

dir prod_builds /s/b | findstr %mydate% | find /c /v "fakenews" > tmp.txt
set /p deployment_total=<tmp.txt
del tmp.txt

set /a current_version=%deployment_total% + 1
set new_name=mattwolfson-site-%mydate%.%current_version%

set temp_name=%new_name%

7z a -tzip prod_builds/%temp_name%.zip application.js config.json package.json bin models public routes views

echo %temp_name%