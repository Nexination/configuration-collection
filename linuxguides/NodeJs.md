# NodeJS on Ubuntu

How to do a standalone file install of NodeJS on Ubuntu

## Installing standalone

1. Download the linux binaries from [NodeJS](https://nodejs.org/)

2. Add node to path and add a new environment variable called NODE_PATH in /etc/environment
```
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/home/node/bin"
NODE_PATH=/home/node/lib/node_modules
```

3. Log out and back in again to refresh the variables.

## Extra info

Environment variables can also be set for current session with the "export" command and be called with a $ from commandline.

```
export NODE_PATH=/home/node/lib/node_modules
cd $NODE_PATH
```

It is also possible on some systems to just add these through an environment profile like the Ubuntu .profile.

```
NODE_VERSION=node-v6.2.0

export PATH=$PATH:/home/node/$NODE_VERSION/bin
export NODE_PATH=/home/node/$NODE_VERSION/lib/node_modules
```