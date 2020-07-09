@ECHO OFF

SETLOCAL
rem 当前路径
SET CWRSYNCHOME=%~dp0\..

IF NOT EXIST %CWRSYNCHOME%\home\%USERNAME%\.ssh MKDIR %CWRSYNCHOME%\home\%USERNAME%\.ssh
SET CWOLDPATH=%PATH%
SET PATH=%CWRSYNCHOME%\bin;%PATH%

rem 调用用户等配置
call config.bat

rem 获取得原始的路径
SET RSOURCE=%SRCDIR%
rem 将路径中冒号删除
set "RSOURCE=%RSOURCE::=%"
rem 将路径中的\变为/
set "RSOURCE=/cygdrive/%RSOURCE:\=/%"

chmod 400 %RPKEY%
ssh -l %RUSER% -p %RPORT% -i %RPKEY% %RHOST% "cd %RDEST%/;pm2 stop %PM2%"
ssh -l %RUSER% -p %RPORT% -i %RPKEY% %RHOST% "cd %RDEST%/;pm2 del %PM2%"
rsync -avz --progress --chmod=Du=rwx,Dog=rx,Fug=rw,Fo=r --exclude ".DS_Store" --exclude ".git" --exclude ".vscode" --exclude "node_modules" --exclude "cygdrive" --exclude "app" --exclude "runtime" --exclude "logs" -e "ssh -l%RUSER% -p%RPORT% -i%RPKEY%" -- %RSOURCE% %RHOST%:%RDEST%
ssh -l %RUSER% -p %RPORT% -i %RPKEY% %RHOST% "cd %RDEST%/;npm run build"
ssh -l %RUSER% -p %RPORT% -i %RPKEY% %RHOST% "cd %RDEST%/;pm2 startOrReload %PM2%"

