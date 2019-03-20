# AutoSSH tunnels

## Install AutoSSH
Run ```apt install -y autossh```

## Configure AutoSSH
Add a host with command ```echo "-NL 12000:127.0.0.1:6379 ubuntu@192.168.1.10" >> /etc/autossh.hosts```

Copy config files [/etc/init/autossh.conf](https://github.com/Nexination/configuration-collection/raw/master/etc/init/autossh.conf) and [/etc/init/autossh_host.conf](https://github.com/Nexination/configuration-collection/raw/master/etc/init/autossh_host.conf) from this git to your server

Make sure and test if the tunnels work and are operating