@ECHO OFF

SETLOCAL
SET CWRSYNCHOME=%~dp0

IF NOT EXIST %CWRSYNCHOME%\home\%USERNAME%\.ssh MKDIR %CWRSYNCHOME%\home\%USERNAME%\.ssh

SET CWOLDPATH=%PATH%
SET PATH=%CWRSYNCHOME%\bin;%PATH%

SET RHOST=139.199.225.131
SET RPORT=22
SET RUSER=ubuntu
SET RPKEY=/cygdrive/d/vsDemo/id_rsa
SET RSOURCE=/cygdrive/d/vsDemo/xn-lr-web/dist
SET RDEST=/data/xn-lr-web/

chmod 400 %RPKEY%
rsync -avz --progress --chmod=Du=rwx,Dog=rx,Fug=rw,Fo=r --exclude ".DS_Store" --exclude ".git" --exclude ".idea" --exclude ".vscode" --exclude "node_modules" --exclude "e2e" --exclude "runtime" -e "ssh -l%RUSER% -p%RPORT% -i%RPKEY%" -- %RSOURCE% %RHOST%:%RDEST%
