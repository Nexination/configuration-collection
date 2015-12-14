# NodeJS on Ubuntu
How to do a manual install of NodeJS on Ubuntu

1. Download the linux binaries of NodeJS from https://nodejs.org/

2. Add node to path and add a new environment variable called NODE_PATH in /etc/environment
```
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/home/node/bin"
NODE_PATH=/home/node/lib/node_modules
```

3. Log out and back in again or if you are SSH'ed in, just open a new terminal.

Environment variables can also be set for current session with the "export" command and be called with a $ from commandline.
```
export NODE_PATH=/home/node/lib/node_modules
cd $NODE_PATH
```
