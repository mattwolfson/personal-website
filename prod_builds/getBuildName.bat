@echo off

For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (
	set year=%%c
	set mydate=%year:~2,3%.%%a.%%b
)

dir prod_builds /s/b | findstr %mydate% | find /c /v "fakenews" > tmp.txt
set /p deployment_total=<tmp.txt
del tmp.txt

set /a current_version=%deployment_total% + 1
set new_name=mattwolfson-site-%mydate%.%current_version%

set temp_name=%new_name%
echo %temp_name%