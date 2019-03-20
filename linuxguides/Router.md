# Linux Router

## Install

1. Configure ip forwarding with this command
```sysctl -w net.ipv4.ip_forward=1```

2. [Install DNSMasq](https://github.com/Nexination/configuration-collection/blob/master/services/linux/DnsMasq.md) from the instructions on this git

3. Copy paste a [firewall script](https://github.com/Nexination/configuration-collection/tree/master/etc/iptables) from this git into console and save it with the command ```iptables-save -c > /etc/iptables/firewall```

4. Add script to load iptables to /etc/network/if-pre-up.d/iptablesload
```
#!/bin/sh
iptables-restore < /etc/iptables/firewall
exit 0
```

## Extra Info

You can also add a script to save iptables configuration on shutdown in /etc/network/if-post-down.d/iptablessave

```
#!/bin/sh
iptables-save -c > /etc/iptables/firewall
if [ -f /etc/iptables/firewalldown ]; then
   iptables-restore < /etc/iptables/firewalldown
fi
exit 0
```

[Read more about iptables](https://help.ubuntu.com/community/IptablesHowTo)
