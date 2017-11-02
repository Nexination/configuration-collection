# How to install Windows Subsystem for Linux (WSL)
Be aware that WSL only works on Windows 10 Pro and up and ONLY if it has the Fall Creators Update (Version 1609).

With Ubuntu/Linux being added to the Windows Store, this process has been made a lot simpler and a lot of bugs have been fixed. On top of that, do read the description on the Windows Store for your flavour of Linux, as there are a few steps needed to make it work.

To set this up with the old method, look into the Git history of this file.

## Using alias or ln -s for easy access
Symbolic links or alias can be used to map any folder on your Windows machine, so it becomes a lot easier to use your projects folder:
```shell
alias -p mypj='cd /mnt/c/projects' # Type mypj to use your alias

ln -s /mnt/c/projects projects # This will mount a fake folder in the path you are in
```
*Note:* All of your Windows drives are pre-mounted in the /mnt folder.

Alias unfortunately gets deleted after you close a session, to make it auto run on every log in, add it to the ".profile" or ".bashrc" files in your home directory.

## Getting SSH to work
This one was a bit tricky to get to work, I am guessing because SSH was never anything anyone thought about in the dev process.

To get started, add or change these lines in "/etc/ssh/sshd_config":
```shell
Port 2000 #Can be any port above 1024, important because of port reservation
```

Then you want to run the following commands to flush out the bad key pairs on the server:
```shell
dpkg-reconfigure openssh-server #Reconfigures the server
service ssh --full-restart #Forces a full restart
```

Last thing you need to do to get running is to create the folder ".ssh" in your home directory and then create the "authorized_keys" file with your public key inside and then ```chmod -R 600``` the whole thing.

As long as your Linux console is open, you will now be able to SSH into your "server". Remember to do a ```service ssh --full-restart``` every time have had the console closed.

Note: The reason you might want this, is if you like me are using agent forwarding or you just like Putty or another SSH client better than CMD.

## Keeping WSL from shutting down when closing the console
This also needs a kick in the butt as Windows runs smart and lean, so when you close the console the Linux process is suspended.

With the updated version of WSL, you are now forced to create a user, so in order for all of this to work, we now have to make some sudo magic. Basically you have to add ```NOPASSWD:ALL``` to the "%sudo" group in "/etc/sudoers":
```shell
%sudo   ALL=(ALL:ALL) NOPASSWD:ALL
# Instead of:
%sudo   ALL=(ALL:ALL) ALL
```

Then you create a VBS script to start a console that sleeps forever. Just create a file called "start.vbs" and put this inside:
```shell
set ws=wscript.createobject("wscript.shell")
ws.run "bash -c 'sudo service ssh --full-restart && sleep 60d'", 0
```

This will open a console in hidden mode, restart the SSH server and then sleep for 60 days.

Happy Linuxing on your Windows PC. :P