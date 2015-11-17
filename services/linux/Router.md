#Linux Router

1. Configure ip forwarding with this command
sysctl -w net.ipv4.ip_forward=1

2. Install DNSMasq from the instructions on this git

3. Copy firewall script from this git /etc/iptables/linuxrouter

4. Add script to load iptables to /etc/network/if-pre-up.d/iptablesload
```
#!/bin/sh
iptables-restore < /etc/iptables/linuxrouter
exit 0
```

4a. Optionally add a script to also save the running iptables configuration on shutdown in /etc/network/if-post-down.d/iptablessave
```
#!/bin/sh
iptables-save -c > /etc/iptables.rules
if [ -f /etc/iptables.downrules ]; then
   iptables-restore < /etc/iptables.downrules
fi
exit 0
```

Read more here https://help.ubuntu.com/community/IptablesHowTo
