@ECHO OFF

SETLOCAL
SET CWRSYNCHOME=%~dp0

IF NOT EXIST %CWRSYNCHOME%\home\%USERNAME%\.ssh MKDIR %CWRSYNCHOME%\home\%USERNAME%\.ssh

SET CWOLDPATH=%PATH%
SET PATH=%CWRSYNCHOME%\bin;%PATH%

SET RHOST=123.207.68.133
SET RPORT=22
SET RUSER=ubuntu
SET RPKEY=../key/test_lr.txt
rem 获取得原始的路径
SET RSOURCE=%CWRSYNCHOME%../../dist
rem 将路径中冒号删除
set "RSOURCE=%RSOURCE::=%"
rem 将路径中的\变为/
set "RSOURCE=/cygdrive/%RSOURCE:\=/%"
SET RDEST=/data/xn-lr-web/

chmod 400 %RPKEY%
rsync -avz --progress --chmod=Du=rwx,Dog=rx,Fug=rw,Fo=r --exclude ".DS_Store" --exclude ".git" --exclude ".idea" --exclude ".vscode" --exclude "node_modules" --exclude "e2e" --exclude "runtime" -e "ssh -l%RUSER% -p%RPORT% -i%RPKEY%" -- %RSOURCE% %RHOST%:%RDEST%
