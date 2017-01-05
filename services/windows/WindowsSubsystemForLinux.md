# How to install Windows Subsystem for Linux (WSL)
Be aware that WSL only works on Windows 10 Pro and up and ONLY if it has the anniversary update (Version 1607).

## Enabling WSL
1. Open up Windows settings by pressing start and clicking the cogwheel inside the start menu. In there you click "Update & Security", then you go to the tab "For developers". In this menu you select the radio button "Developer mode" and Windows will ask you to confirm.
2. Right click start and select "Programs and Features" from the dropdown. Then click "Turn Windows features on and off" in the top left corner, scroll down until you find "Windows Subsystem for Linux", tick the box and press OK. Windows will ask you to confirm and install the feature.

## Installing Linux
You aren't quite done yet, mainly because there is no Linux system installed yet.
To install Linux you will need an elevated command prompt, to do this click start and type in "cmd", then right click the program that comes up and click "Run as administrator".

To install Linux use the following command:
```
lxrun /install /y
```
To remove linux again, use the following command:
```
lxrun /uninstall /full /y
```

## Running WSL for the first time
To run WSL you want to click start and either locate or search for "Bash on Ubuntu on Windows", which is the Linux console for windows.

To make this console work a bit more Linux'esque you can right click the top bar and click "Properties", in here you want to enable "QuickEdit Mode".
This enables you to drag a selector around text with left click and then hitting enter or right click to copy and also enables you to use right click to paste.

For most of you, you are up and running now and can take it from here, the next few sections will primarily handle setting up Linux with SSH and other goodies.

## Fixing a few annoyances in Linux
To fix the language run the following command:
```shell
update-locale LANG=en_US.UTF-8
```

To get this outdate Linux back up to speed, run the following commands:
```shell
apt-get update
apt-get upgrade
apt-get install git #Use your favorite VCS
```

## Using alias, because symbolic links don't work
Symbolic links unfortunately do not work, but we can get a great substitute in using alias. To create an alias, use this command:
```shell
alias -p mypj='cd /mnt/c/projects'
```
*Note:* All of your Windows drives are pre-mounted in the /mnt folder.

You can now type ```mypj``` and it will execute the command outline by alias.

Alias unfortunately gets deleted after you close a session, to make it auto run on every log in, add it to the ".profile" or ".bashrc" files in your home directory.

## Getting SSH to work
This one was a bit tricky to get to work, I am guessing because SSH was never anything anyone thought about in the dev process.

To get started, add or change these lines in "/etc/ssh/sshd_config":
```shell
Port 2000 #Can be any port above 1024, important because of how networks work
UsePrivilegeSeparation no #Privilege separation doesn't work on WSL and will therefore crash SSH
UsePAM no #PAM also does not work on WSL
PermitRootLogin without-password #Just a safety measure, to make sure you can't login with passwords
```

Then you want to run the following commands to flush out the bad key pairs on the server:
```shell
dpkg-reconfigure openssh-server #Reconfigures the server
service ssh --full-restart #Forces a full restart
```

Last thing you need to do to get running is to create the folder ".ssh" in your home directory and set it to ```chmod 700``` and then create the "authorized_keys" file with ```chmod 600``` with your public key inside.

As long as your Linux console is open, you will now be able to SSH into your "server". Remember to do a ```service ssh --full-restart``` every time have had the console closed.

## Keeping WSL from shutting down when closing the console
This also needs a kick in the butt as Windows runs smart and lean, so when you close the console the Linux process is suspended.

To get this going you simply have to create a
VBS script to start a console that sleeps forever. Just create a file called "start.vbs" and put this inside:
```shell
set ws=wscript.createobject("wscript.shell")
ws.run "C:\Windows\System32\bash.exe -c 'service ssh --full-restart && sleep 60d'",0
```

This will open a console in hidden mode, restart the SSH server and then sleep for 60 days.