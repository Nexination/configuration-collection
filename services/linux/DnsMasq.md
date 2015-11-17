# DNSMasq

1. Copy /etc/dnsmasq.conf from this git onto your server and modify it

2. Set up network interface in /etc/network/interfaces
```
# Set up interface with dhcp
auto eth0
iface eth0 inet dhcp

# Set up interface with static address
auto eth0
iface eth0 inet static
        address 192.168.111.254
        netmask 255.255.255.0
        gateway 192.168.111.1 # Needed for static interface only
        network 192.168.111.0 # Needed for gateway interface
        broadcast 192.168.111.255 # Needed for gateway interface
```

Important files:
/var/run/network/ifstate - Shows interface states, for use with ifup/ifdown
/var/lib/misc/dnsmasq.leases - Shows all dhcp leases
/etc/hosts - Mark static ip services down here
/etc/resolvconf/resolv.conf.d/ - Edit tail/head here to add nameservers to the front or end of resolv.conf, do resolvconf -u to update the config