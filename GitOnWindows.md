# Git On Windows

1. Download and install official git https://git-scm.com/

2. Download and install the fully putty package http://www.putty.org/

3. Run plink with this command in windows cmd to make sure it doesn't freeze on rsa handshake (plink is part of putty)
plink -ssh git@github.com

4. Right click on the windows icon on the start menu, pick system, click advanced systems settings, click environment variables and add the variable GIT_SSH with the location of plink