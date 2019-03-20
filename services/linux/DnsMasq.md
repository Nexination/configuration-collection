# DNSMasq

## Set static ip

In /etc/netplan/*
```
# /etc/netplan/50-cloud-init.yaml
network:
    ethernets:
        enp2s0:
            addresses: [192.168.1.254/24]
            gateway4: 192.168.1.1
            nameservers:
                search: [wt]
                addresses: [192.168.1.254,1.1.1.1,1.0.0.1]
            dhcp4: no
            dhcp6: no
            optional: true
        lo:
            nameservers:
                search: [wt]
                addresses: [192.168.1.254,1.1.1.1,1.0.0.1]
    version: 2

```

Then run ```netplan apply```

## Set up DNSMasq

* Run ```apt install -y dnsmasq```

* Copy [/etc/dnsmasq.conf](https://github.com/Nexination/configuration-collection/raw/master/etc/dnsmasq.conf) from this git onto your server /etc and modify it to your needs/network

* Run ```systemctl restart dnsmasq```

## Important files

/var/lib/misc/dnsmasq.leases - Shows all dhcp leases

/etc/hosts - Mark static services down here