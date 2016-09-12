# MongoDB
1. Install mongodb
Download it from the site in a zip or install via package manager

1b. Create a script
If downloaded as zip, use the following script to make it run:
```
#!/bin/bash
PIDF="processid"
start () {
  ./bin/mongod --config mongod.conf
}
stop () {
  ./bin/mongod --config mongod.conf --shutdown
}
if [ "$1" == "start" ]; then
    start
elif [ "$1" == "stop" ]; then
    stop
elif [ "$1" == "restart" ]; then
    stop
    start
fi
```

2. Create your config file
mongod.conf:
```
processManagement:
   fork: true
net:
   bindIp: 127.0.0.1
   port: 27017
storage:
   dbPath: ./data
systemLog:
   destination: file
   path: ./log/mongod.log
   logAppend: true
storage:
   journal:
      enabled: true
```

3. Start up the server and you are good to go