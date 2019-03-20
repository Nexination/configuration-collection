# How to install Windows Subsystem for Linux (WSL)
Be aware that WSL only works on Windows 10 with the Fall Creators Update (Version 1609).

WSL can now be installed from the Windows store, but check the description on the store for install tips.

## Getting SSH to work
This one was a bit tricky to get to work, I am guessing because SSH was never anything anyone thought about in the dev process.

Add a port to "/etc/ssh/sshd_config"

```shell
Port 2000 #Can be any port above 1024, important because of port reservation
```

The reconfigure SSH to fix broken elements

```shell
dpkg-reconfigure openssh-server #Reconfigures the server
service ssh --full-restart #Forces a full restart
```

As long as your Linux console is open, you will now be able to SSH into your "server". Remember to do a ```service ssh --full-restart``` every time have had the console closed.

*Note:* The reason you might want this, is if you like me are using agent forwarding or you just like Putty or another SSH client better than CMD.

## Keeping WSL from shutting down when closing the console

In cmd run ```ubuntu1804 config --default-user root``` to always open console as root (replace ubuntu1804 with the linx you installed).

Then create a VBS script to start a console that sleeps forever, i.e. start.vbs:

```shell
set ws=wscript.createobject("wscript.shell")
ws.run "bash -c 'sudo service ssh --full-restart && sleep 60d'", 0
```

## Using symbolic links for easy access
Symbolic links or alias can be used to map any folder on your Windows machine for easy access.

```shell
ln -s /mnt/c/projects projects # This will mount a fake folder in the path you are in
```
*Note:* All of your Windows drives are pre-mounted in the /mnt folder.

Happy Linuxing on your Windows PC. :P