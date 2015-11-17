# Open VPN Server

1. Install OpenVPN
apt-get install openvpn easy-rsa

2. Copy default rsa key config with these commands
```
mkdir /etc/openvpn/easy-rsa/
cp -r /usr/share/easy-rsa/* /etc/openvpn/easy-rsa/
```

3. Modify rsa key settings in /etc/openvpn/easy-rsa/vars

4. Generate rsa key authority with these commands
```
cd /etc/openvpn/easy-rsa/
source vars
./clean-all
./build-ca
```

5. Generate server certificates with these commands
```
./build-key-server $servername
./build-dh
cd keys/
cp servername.crt servername.key ca.crt dh1024.pem /etc/openvpn/
```

6. Build client certificates with these commands
```
cd /etc/openvpn/easy-rsa/
source vars
./build-key $client
```

7. Copy, modify and use the config file from this git /etc/openvpn/server.conf

8. Main gateway on network needs to point a static route the 10.8.0.0 network to the OpenVPN server in it's routing table

9. Configure ip forwarding with this command
sysctl -w net.ipv4.ip_forward=1

10. Set up iptables to use the two following rules, to make sure your OpenVPN can reach your network
```
# Allow traffic initiated from VPN to access LAN
iptables -I FORWARD -i tun0 -o eth0 -s 10.8.0.0/24 -m conntrack --ctstate NEW -j ACCEPT

# Allow established traffic to pass back and forth
iptables -I FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
```