#Linux Router

1. Configure ip forwarding with this command
sysctl -w net.ipv4.ip_forward=1

2. Install DNSMasq from the instructions on this git

3. Copy paste a firewall script from this git into console

3a. Save the configuration to file
```
iptables-save -c > /etc/iptables/firewall
```

4. Add script to load iptables to /etc/network/if-pre-up.d/iptablesload
```
#!/bin/sh
iptables-restore < /etc/iptables/firewall
exit 0
```

4a. Optionally add a script to also save the running iptables configuration on shutdown in /etc/network/if-post-down.d/iptablessave
```
#!/bin/sh
iptables-save -c > /etc/iptables/firewall
if [ -f /etc/iptables/firewalldown ]; then
   iptables-restore < /etc/iptables/firewalldown
fi
exit 0
```

Read more here https://help.ubuntu.com/community/IptablesHowTo
