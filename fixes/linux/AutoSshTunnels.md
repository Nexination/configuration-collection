1. Install AutoSSH
apt-get install autossh

2. Add a host 
echo "-NL 12000:127.0.0.1:6379 ubuntu@192.168.1.10" >> /etc/autossh.hosts

3. Copy config file /etc/init/autossh.conf and /etc/init/autossh_host.conf from this git to your server

4. Make sure and test if the tunnels work and are operating