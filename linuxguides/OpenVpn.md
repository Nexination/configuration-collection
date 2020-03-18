# Open VPN Server

## Install OpenVPN
Run ```apt install -y openvpn easy-rsa```

## Set up encryption keys

Copy default rsa key config with these commands

```
mkdir /etc/openvpn/easy-rsa/
cp -r /usr/share/easy-rsa/* /etc/openvpn/easy-rsa/
```

Modify rsa key settings in /etc/openvpn/easy-rsa/vars

Generate rsa key authority with these commands

```
cd /etc/openvpn/easy-rsa/
cp openssl-1.0.0.cnf openssl.cnf
source vars
./clean-all
./build-ca
```

Generate server certificates with these commands

```
./build-key-server $servername
./build-dh
cd keys/
cp $servername.crt $servername.key ca.crt dh1024.pem /etc/openvpn/
```

Build client certificates with these commands

```
cd /etc/openvpn/easy-rsa/
source vars
./build-key $client
```

## Configure OpenVPN and networking

1. Copy and modify the config file from this git [/etc/openvpn/server.conf](https://github.com/Nexination/configuration-collection/raw/master/etc/openvpn/server.conf)

2. Set up static route on main gateway for the network 10.8.0.0 network

3. Configure ip forwarding with this command
```sysctl -w net.ipv4.ip_forward=1```

4. Set up iptables to use the two following rules, to make sure your OpenVPN can reach your network

```
# Allow traffic initiated from VPN to access LAN
iptables -I FORWARD -i tun0 -o eth0 -s 10.8.0.0/24 -m conntrack --ctstate NEW -j ACCEPT

# Allow established traffic to pass back and forth
iptables -I FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
```