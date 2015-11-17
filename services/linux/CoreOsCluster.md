# CoreOS Cluster Setup

1. Generate a new token for each unique cluster from https://discovery.etcd.io/new?size=3

2. Copy and modify cloud config file from /var/lib/coreos-install/user_data to your server

3. Update cloud config with command
sudo coreos-cloudinit --from-file /var/lib/coreos-install/user_data

4. Configure the network in /etc/systemd/network/static.network
```
[Match]
Name=ens160
[Network]
DNS=172.16.1.12
Address=172.16.1.44/24
Gateway=172.16.1.1
```
5. Restart network with command
sudo systemctl restart systemd-networkd

Fleet commands:
fleetctl submit servicename.service - Add a service file by name of "servicename"
fleetctl start/stop/status servicename - Start/stop/status of service "servicename"
fleetctl list-machines/list-units/list-unit-files - Lists machines, active services or service files

Fleet file example:
```
[Unit]
Description=VMWare Tools
After=systemd-networkd.service
[Service]
Restart=always
TimeoutStartSec=1200s
ExecStartPre=-/usr/bin/docker rm vmware-tools
ExecStart=/usr/bin/docker run --net=host --privileged --name vmware-tools corfr/
vmware-tools
ExecStop=-/usr/bin/docker stop vmware-tools
ExecStopPost=-/usr/bin/docker rm vmware-tools
[X-Fleet]
Global=true
```