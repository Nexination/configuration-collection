# Cisco Router and Switch Cheatsheet
$hn = hostname, $pwd = password, $asn = AS number, $inout = use in or out of the router, $ip = IP, $nwip = network address number, $nmsk = netmask, $pn = Port number, $un = username, $add = address, $wm = Wildcard Mask, $areano = area number, $ono = ospf number, $priono = priority number, $keyno = key number, $vlanno = VLAN number, $vlanna = VLAN name, $inlclip = inside local ip, $inglip = inside global ip, $ipsta = ip range start, $ipsto = ip range stop, $npname = NAT pool name, $dpname = DHCP pool name, $dnname = domain name, $day = time in days, $spid = Spid number, $isdntp = ISDN router Type, $tsrange = Timeslot range, $autosn = Autonomous System Number, $remip = Remote ip of opposite router, $dlci = DLCI number, $lmit = LMI Type, $if = interface name, $tag = name or definition,
Initial Router Setup
 
 
hostname $hn = Sets hostname $hn
 
line con 0           	             \
password $pwd              | = Enables console password, without password you cant login
login           	             /
 
line vty 0 4           	             \
password $pwd              | = Enables vty(telnet) password, login local is to set local $pwd
login local           	             /
 
line aux 0           	             \
password $pwd              | = Enables auxiliary password
login           	             /
 
service password-encryption = Encrypts all passwords
 
enable secret $pwd = Sets up the enable(privileged) password, as secret(md5 encrypted)
 
int s 0/0           	          	             \ = Opens interface configuration for Serial 0/0
ip add 192.168.1.1 255.255.255.224              | = Set interface IP address
ip access-group $asn $inout               | = Adds access list $asn to interface as $inout
ip ospf priority $priono              | = Sets OSPF priority, highest is designated router
ip ospf cost $cost           	             | = Sets OSPF cost, reflects bandwidth
ip ospf message-digest-key $keyno md5 0 $pwd | = Sets an OSPF authentication key
ip nat inside/outside           	             | = Sets interface to be marked for inside/outside NAT
bandwidth 64           	             | = Sets the serial interface bandwidth
no keepalive           	             | = Makes sure interface never goes down
clockrate 64000           	             | = Sets a serial interface clock rate for DCE
no shutdown           	             / = Sets the interface as up
 
int fa or e 0/0           	             \ = Opens interface configuration for Ethernet 0/0
ip add 192.168.1.33 255.255.255.224              | = Set interface IP address
full-duplex            	          	             | = Sets full duplex on an Ethernet interface
no shutdown           	             / = Sets interface as up
 
int fa or e 0/0.2           	             \ = Opens interface configuration for VLAN 0.2
description VLAN $vlanno              | = Description of the interface
encapsulation dot1q $vlanno              | = Sets the interface encapsulation to 802.1q
ip add 223.2.0.129 255.255.255.192              / = Sets an interface address
Routing Protocols
 
 
router rip            	             \ = Opens router protocol configuration for rip protocol
version 2            	             | = Set version 2 for a rip protocol
network 192.168.1.0               | = Defines the network for the Serial interface
network 192.168.1.32              / = Defines the network for the Ethernet interface
 
router ospf $ono            	          	             \ = Sets the routing protocol to ospf
network $add $wm area $areano           	             | = Adds a network to the protocol
area $areano authentication message-digest              | = Sets authentication for an area
default-information originate           	             / = Makes sure that ospf shares info
 
router eigrp $autosn           	             \ = Sets eigrp with an autonomous system number
network 192.168.1.0 255.255.255.0              | = Defines a network connected to the router
redistribute static           	             | = Sends routing updates of static routes
no auto-summary           	             / = Sets discover other subnets
Encapsulation
 
 
int s0           	             \ = Opens interface
encapsulation hdlc              / = Sets up standard encapsulation HDLC
 
username $hn password $pwd           	             \ = Sets the $hn of opposing router with a            	          	          	             password $pwd which should be identical            	          	          	             on both routers
int s0           	          	          	             | = Opens interface
encapsulation ppp           	          	             | = Enables ppp
ppp authentication chap/pap           	             | = Sets authentication to use
ppp multilink           	          	             | = Enables multilinking
compress stac/predictor                         	             | = Enables compression stac or predictor
ppp quality 80           	          	             / = Defines Link Quality
 
encapsulation frame-relay           	             \ = Enables frame relay
frame-relay lmi-type $lmit            	             | = Sets LMI type to use
frame-relay map ip $remip $dlci broadcast              / = Set the frame relay map to a remote router
Initial Switch Setup
 
 
vlan database           	             \ = Opens up the VLAN database as privileged
vlan 2 name Sale           	             | = Set VLAN 2 with name of Sale
vlan 3 name Insurance           	             | = Sets VLAN 3 with name of Insurance
vtp v2-mode           	             | = Starts vtp and sets the mode for it
vtp domain Group1           	             | = Sets which domain group vtp is in
vtp server/client/transparent              / = Sets vtp to run on this switch as server, client or transparent
 
hostname $hn = Sets hostname $hn
 
line con 0           	             \
password $pwd              | = Enables console password, without password you cant login
login           	             /
 
line vty 0 4           	             \
password $pwd              | = Enables vty(telnet) password, login local is to set local $pwd
login local           	             /
 
service password-encryption = Encrypts all passwords
 
enable secret $pwd = Sets up the enable(privileged) password, as secret(md5 encrypted)
 
int vlan 1           	          	             \ = Opens the default VLAN interface
ip add 223.2.1.2 255.255.255.0              | = Sets the ip address for the default inteface
ip default-gateway 223.2.1.1              | = Set the default gateway of the default interface
int vlan1           	          	             | = Re opens the interface as the default-gateway command exits it
no shutdown           	             / = Starts the default interface
 
int fa 0/1           	          	          	             \ = Opens fast Ethernet interface 1
description Trunk to switch           	             | = Describes that this is a trunk line
duplex full/auto           	          	             | = Duplex mode, not used for routers
speed 100           	          	          	             | = Interface speed, not used for routers
switchport trunk encapsulation dot1q              | = Sets the switchport encpasulation
switchport mode trunk           	          	             / = Sets the switchport mode to trunk
 
int fa 0/4           	          	             \ = Opens fast Ethernet interface 4
switchport access vlan 2           	             | = Sets VLAN 2 access to the interface
port security max-mac-count 1              / = Sets port security to max-mac-count of 1
Advanced Switching
 
 
vlan $vlanno              \ = Creates a vlan
name $vlanna              / = Defines the name of the vlan
 
int range fa 0/1-4           	             \ = Opens up a range of interfaces
swi mode access                            | = Enables access mode on the switchports
swi access vlan $vlanno              | = Restricts the access on the ports to $vlanno
no shut                                          / = Enables the interfaces
 
inf fa 0/1           	          	             \ = Opens up an interface
no swi           	          	             | = Makes the port a non switching port, can be used for routing
swi trunk native vlan $vlanno               | = sets native vlan for sending and receiving untagged traffic
swi nonegotiate           	             | = Disables DTP
swi trunk encap isl/dot1q/negotiate | = Sets the trunk port encapsulation
swi mode access/dynamic(auto/desirable/trunk) | = Sets the mode of the trunk, dynacmic auto/desirable are used to autonegotiate trunk
swi trunk allowed vlan add/except/all/remove $vlanno,$vlanno,$vlanno-$vlanno | = Defines allowed vlan's
spanning-tree portfast / = Forces to enter forwarding state
 
vtp mode server/client/transparent = Server sends VLAN tables around, client receives them and transparent only forwards them
vtp v2-mode = Is the same as "vtp mode", except it enables version 2
vtp domain $dnname = Defines the VTP domain name
vtp password $passwd = Defines the VTP domain password
 
spanning-tree vlan $vlanno root primary/secondary = Sets spanning tree primary and secondary root
spanning-tree vlan $vlanno priority $priono = Sets the switch priority in a spanning tree
spanning-tree portfast default = Forces all nontrunking ports to forward, without making spanning-tree state changes
 
ip routing = Enables switch routing
router eigrp = Selects the eigrp routing protocol
 
sh vlan = Error finding command for vlan's
sh vlan internal use = shows the internal vlans
sh int swi = Shows statues of switching ports
sh dtp interface = Shows current dtp mode
sh vtp status = Shows the setup of VTP
sh vtp counters = Shows if VTP updates are sent and received
sh vlan = Shows the parameters of all VLAN's
sh ip prot = Shows the protocol
sh ip route = Shows routing information
Access Lists
 
 
access-list $asn deny ip 192.168.1.1 = Blocks specific IP, in this case 192.168.1.1, simple accesslist
 
access-list $asn deny ip 192.168.1.0 0.0.0.31 = Blocks an entire subnet, the 0.0.0.31
is the wildcard mask, simple accesslist
 
access-list $asn deny ip 192.168.1.0 0.0.0.31 192.168.1.32 0.0.0.31 = Block anyone from subnet 192.168.1.0 going to subnet 192.168.1.32, enhanced access list
 
access-list $asn permit ip any any = Allow anyone from any range, remember to add this at end of access list
 
Wildcard mask can be found by taking the subnet mask and subtracting it from 255.255.255.255. In this case it would be 255.255.255.255 minus 255.255.255.224 which is equal to 0.0.0.31
 
ALWAYS organize ACL’s with the most specific rules first and then the more general ones, and to put the simple ACL’s closest to the destination.
 
host $ip = Use this at the end of an access list to add a specific host to the access rule
eq$pn = Use this at the end of an access list to set a port number value to equal
neq$pn = Use this at the end of an access list to set a port number value to not equal
gt$pn = Use this at the end of an access list to a port number value to greater than
lt$pn = Use this at the end of an access list to a port number value to lesser than
NAT
 
 
ip nat inside source static $inlclip $inglip = Sets a static NAT between an inside local ip            	          	          	             and an inside global ip
ip nat pool $npname $ipsta $ipsto netmask $nmsk = Makes a NAT ip pool
 
ip nat inside source list $asn pool $npname = Sets dynamic NAT on a pool
 
ip nat inside source list $asn int s 0/0 overload  = Sets dynamic PAT(overload) on            	          	          	          	          	             interface serial 0/0
ip nat translation timeout 60 = Sets the NAT translation timeout to 60 seconds
DHCP
 
 
ip dhcp pool $dpname           	             \
network $nwip $nmsk                            |
default-router $ip           	             |
dns-server $ip           	             | = Sets up a DHCP pool with according configuration
netbios-name-server $ip              |
domain-name $dnname              |
lease $day                         	             / = Sets lease time, default is one day
 
ip dhcp excluded-address $ipsta $ipsto = Sets addresses to be excluded from the pool in a DHCP request
 
service dhcp/no service dhcp = Enables/Disables DHCP on a router
ISDN/DDR
 
 
int bri 0           	             \ = Opens up the BRI ISDN interface
isdn spid1 $spid              / = Sets the interfaces spid number
 
isdn switch-type $isdntp = Can be set on interface or in conf t to set the ISDN type
 
controller t1/e1 0           	             \ = Selects PRI controller
framing sf/esf            	             | = Sets framing method
linecode ami/b8zs/hdb3               | = Sets linecode to use
pri-group timeslots $tsrange              / = Sets amount of timeslots
 
interface s0 : 23(t1)/15(e1) = Sets PRI on a serial interface
 
dialer-list 1 protocol ip permit = Will set DDR to allow ip traffic
dialer-list 1 protocol ip list $asn = Defines DDR traffic from an access list
 
interface bri0/0            	          	             \ = Opens BRI interface
encapsulation ppp            	          	             | = Enables PPP
ppp authentication chap            	             | = Enables PPP CHAP
ip address $ip $nmsk           	          	             | = Sets interface ip
dialer pool-member 1 priority 100           	             | = Sets a dailer pool and priority
dialer-group 1            	          	             | = Enables dialer list 1
dialer map $remip name $hn speed 56/64              / = Maps remote interface
 
interface dailer1           	             \ = Makes a virtual dialer interface
dialer string 456848468              | = Assigns a string to it
dialer remote-name $hn              | = Sets Remote hostname
dialer pool 1           	             / = Adds the interface to a dailer pool
SDM
 
username $un privilege 15 password $pwd              \ = Adds a user with privilege 15
ip http server                         	             | = Enables http server for SDM
ip http secure-server                         	             | = Enables https server for SDM
ip http authentication local           	             / = Sets http authentication to local
 
line vty 0 4                         	             \ = Used to configure the line
login local                         	             | = Defines the line as a local line
transport input telnet ssh              / = Enables ssh and telnet
 
Enable preview commands:
Edit → preferences → Check preview references
 
Configure Site-to-site VPN:
Configure → VPN → Site-to-site VPN → Create a site to site vpn → step by step wizard → vpn connection information (pre-shared) → IKE proposals (add new encryption sha) → Transform set (add sha transform set) → Traffic to protect (choose remote and local networks) → Finish → Deliver
Generate mirror → copy configuration to the other vpn router cli → add crypto map to interface in cli → Test tunnel in SDM
 
Secure gre tunnel:
Configure → VPN → Site-to-site VPN → Create a secure gre → next → GRE tunnel information → Backup GRE tunnel (no) → vpn connection information (pre-shared) → IKE proposals (add new encryption sha) → Transform set (add sha transform set) → Select Routing protocol (eigrp) → Routing information (new eigrp as) → Finish → Deliver
Generate mirror → copy configuration to the other vpn router cli → add crypto map to interface in cli → add gre tunnel interface → add eigrp protocol → Test tunnel in SDM
 
Easy VPN:
Configure → VPN → Easy VPN Server → Enable AAA → Next → Interface and authentication (pre-shared) → IKE proposals (use default) → Transform set (use default) → Group authorization and Group policy lookup (local) → User authentication (add user credentials, no md5 hash, privilege 15) → Group authorization and User Group policies (add) → Add group policy (setup pool and pre-shared key, enable split tunneling) → Group authorization and User Group policies (set idle timer for new policy) → Finish → Deliver
Setup VPN Client on machine (use group policy settings) → Test VPN in SDM
 
One-step lockdown:
Configure → Security audit → one-step lockdown → yes → Deliver
 
Firewall:
Configure → Firewall and ACL → Advanced Firewall → Next → Advanced Firewall Interface Configuration (outside is external, inside is internal, dmz is loopback) → Advanced Firewall DMZ Service configuration (add, choose service and ip to allow) → Advanced Firewall Security Configuration (custom create new policy) → Url filtering (Enable http inspection) and Applications/ Protocols (choose all general tcp and udp) → Finish → Deliver → Check statements → Make changes if needed → Deliver
 
IPS:
Configure → Intrusion Prevention → Launch IPS Rules Wizard → Re Login to SDM → Next → Select Interfaces (only select the external as inbound) → SDF Locations (no) → SDF file in memory (no) → Finish → Deliver → Edit IPS → Apply Changes when done
VPN Tunnels
 
int tunnel0                         	             \ = Initiates a VTI (use standard for GRE tunnel)
tunnel source $if           	             | = Defines the interface the tunnel will go to
tunnel destination $ip           	             | = Defines the ip of the other tunnel peer
ip add $ip $nmsk           	             | = Defines the ip of this end of the tunnel
tunnel mode ipsec ipv4              | = Sets the tunnel to run ipsec (only if secure VTI)
tunnel protection ipsec profile $tag/ = Sets what profile with the name $tag the VTI should use (only secure VTI)
 
crypto ipsec profile $tag              \ = Creates and ipsec profile with the name $tag for a VTI to use (is used on VTI's instead of the crypto map on physical interfaces)
set tranform set $tag           	             / = Defines what transform set with name $tag the ipsec profile should use
 
crypto isakmp enable              = Enables isakmp if it has been disabled, but default is enabled
 
crypto isakmp policy 10              \ = Creates an IKE policy, cisco chooses lower numbers first, due to them being the most secure policies
auth pre-share           	             | = Defines what type of key is to be used
encr aes 256           	             | = Defines the encryption, aes 256 being the best
hash sha           	          	             | = Defines the hash, sha being the best
group 5           	          	             | = Defines the group the policy belongs to
lifetime 3600           	             / = Defines the lifetime
 
crypto isakmp key $pwd address $ip              = Defines the key $pwd for the remote peers $ip
 
crypto ipsec transform-set $tag esp-sha-hmac esp-aes 256 ah-sha-hmac              \= Sets up a transform set with the different encryption option, with a name of $tag
             
access-list 101 permit ip $ip $wm $ip $wm = Access list for allowing $ip one to access $ip two, needed to bind the tunnel to specific networks (remember both ways)
 
access-list 101 permit gre host $ip host $ip = Access list for making a secure gre tunnel, the $ip's points at the ipsec tunnels endpoints (remember both ways)
 
crypto map $tag 10 ipsec-isakmp                            \ = Creates a crypto map, giving it the name of $tag and the number of the policy
set transform-set $tag           	          	             | = Defines the transform set with the name of $tag from earlier
set peer $ip                         	             | = Defines the remote peer
match address 101           	          	             | = Defines the access list number to use
set pfs group5           	          	             | = Defines pfs group5
set security-assoc lifetime seconds 3600              / = Defines the lifetime
 
int $if           	             \ = Opens up the interface $if that is supposed to carry the ipsec
crypto map $tag              / = Defines the crypto map with the name $tag on this interface, to engage ipsec on this interface
 
Enable AAA for easy vpn to work!
Username $un password $pwd = Setup username and password
aaa new-model = Enable aaa
aaa authentication login default local none = Options for aaa
 
Ip local pool $tag $ipsta $ipsto = Create an ip pool with the name $tag and with the range $ipsta to $ipsto
 
aaa authorization network $tag local = Creates a Group authorization with the name of $tag
 
Create an IKE policy without hash and with a group of 2!
 
crypto isakmp client configuration group $tag\ = Creates an ISAKMP authorization group with the name of $tag
key $pwd                                                        | = Defines a key with the name $pwd
pool $tag                                                         | = Defines the pool defined earlier with the name $tag             
acl 100                                                        | = Defines an access-list
netmask $nmsk                                          / = Defines the netmask
 
access-list 100 permit ip $ip $wm any = Used to define an all access pass to and from the easy vpn
 
Create a transform set!
 
Crypto dynamic-map $tag 10              \ = Create a dynamic map with the name $tag and with policy 10
set transform-set $tag                            | = Define a transform set with the name of $tag
reverse-route                            / = Ensures that a route is installed for the remote peer
 
crypto map $tag client configuration address respond = Enable response to vpn requests on the dynamic map with name $tag
crypto map $tag isakmp authorization list $tag = Associate the map $tag with the aaa authorization list with name $tag
crypto map $tag 10 ipsec-isakmp dynamic $tag = Create a crypto map with name $tag from the earlier created dynamic map with name $tag
 
Add the map to an interface!
 
crypto isakmp keepalive 30 5 = Issues a keepalive for 30 seconds, with a retry of 5 seconds
 
aaa authentication login $tag local = Enable xauth with a name of $tag
username $un password $pwd = Create a new user
crypto isakmp xauth timeout 60 = The amount of second to wait for authentication before timeout
crypto map $tag client authentication list $tag = Associate recently created crypto map with the name $tag with the xauth called $tag
 
Security
 
auto secure = Start the auto secure wizard
 
no ip finger = Disables fingering service, so one cannot see who is logged on
 
no service udp-small-servers = Disables udp small servers like echo and discard
no service tcp-small-servers = Disables tcp small servers like echo and discard
 
service tcp-keepalives-in = Helps keep track of telnet connections and closes broken ones
service tcp-keepalives-out = Helps keep track of telnet connections and closes broken ones
 
no cdp run = Disables CDP(Cisco Discovery Protocol), so device information is not shared
 
no service pad = Disables translation in legacy networks
 
no ip bootp server = Disables the tftp boot service, so a cisco image can't be stolen
 
no ip http server = Disables the cisco web interface
 
no ip source-route = Disable a clients ability to decide packets routes through the network
 
no ip gratuitois-arps = Stops arp poisoning
 
int $if                            \ = Interface edit mode of interface $if
no ip redirects              | = Disables ICMP redirect messages
no ip proxy-arp              | = Enables responding to Arp requests on remote networks
no ip unreachables              | = Disables ICMP unreachable messages
no ip directed-broadcast              | = Disables ip broadcasts
no ip mask-reply              | = Disable unnecessary ICMP messages from ICMP mask requests
no mop enabled              / = Disable Maintenance Operation Protocol, usually only active on Ethernet interfaces
 
username $un password $pwd = Make a local user
 
line vty 0 4              \ = Enable local user login on telnet
login local              /
 
enable secret $pwd = Set a password on enable
 
login block-for 30 attempts 3 within 15 = Blocks login for 30 seconds, if 3 wrong attempts is made within 15 seconds
 
login quiet-mode access-class 1              \ = Allows login from hosts in access list 1 if quiet mode is invoked by the login block
access-list 1 permit $ip $wm              /
 
login delay 3 = Set a 3 second delay between login attempts
login on-failure log = Generate a log entry if login fails
 
security passwords min-length 8 = Set minimum password length to 8 characters
 
enable secret level 5 $pwd = Sets a password to enable level 5
privilege exec level 5 configure terminal = Sets level 5 access to the configure terminal command
privilege configure level 5 interface = Sets level 5 access to interface configuration
privilege interface level 5 shutdown = Sets level 5 access to interface shutdown
 
banner ~ = Write a banner login message
 
ip domain name cisco.com              \ = Create a domain name
crypto key generate rsa              / = Generate an rsa key for ssh
line vty 0 4                            \ = Force telnet connections over to ssh
transport input ssh              /
 
service password-encryption = Encrypts all passwords
 
logging host $ip                            \ = Logging host
logging trap critical                            | = What to trigger logging on
logging trap informational              / = What to trigger logging on
 
logging buffered 32768 informational = Engage local buffer logging with a cache of 32KB
 
parser view $tag                                          \ = Create a new view with name $tag
secret $pwd                                          | = Define password $pwd
commands exec include show interface              | = Define what commands to show
commands exec include clear counters              | = Define what commands to show
enable view root                                           | = Enables root view, the password is the same as the enable password
enable view $tag                                          / = Enter the view named $tag
 
parser view $tag superview              \ = Create a super view with name $tag
view $tag                                          / = Add another view with the name $tag
 
ntp master 5 = Set as ntp master with a stratum number of 5, every time an ntp update occurs the stratum number is incremented by one
 
ntp server $ip = Points a client to an ntp server
 
NTP authenticate must be set on all masters and clients!
ntp authenticate                            \ = Enable ntp authentication
ntp authentication-key 1 md5 $pwd| = Define ntp key 1
ntp trusted-key 1                            / = Use ntp key 1
 
ntp peer $ip = Is used to setup an active peer, to get the time from a non master
 
access-list 100 deny ip any any log = Needs to be extended for use with CBAC
ip inspect name $tag ?              \ = Define CBAC rule with name $tag
int $if                            | = Open up interface configuration
ip inspect $tag in              | = Enables the CBAC rule $tag on the interface inwards
ip access-group 100 in              / = Enables access-list on the interface for CBAC to use
 
ip ips name $tag                            \ = Create an IPS with the name $tag
ip ips signature 2004 disable              | = Disables ICMP attack alert
int $if                                          | = Opens interface configuration
ip ips $tag in                            / = Sets IPS with the name $tag on the interface
NQR
 
nqr
fastethernet0/0
add tcp
datalink ios-dependent fastethernet0/0.10             
l2-arp-for 172.16.10.1
l3-src 172.16.10.4
l3-dest 172.16.20.4
l4-dest 23
fastethernet0/0.20 ios-dependent capture
start
stop
fastethernet0/0
add tcp
send 1000
rate 60
length random 200 to 1000
l2-dest $mac
l3-src 172.16.10.4
l3-dest 172.16.20.4
l4-dest 23
fastethernet0/1 capture
add clone-of 1
l4-dest 21
add clone-of 1
l4-dest 119
add clone-of 1
l4-dest 22
add clone-of 1
l4-dest 6000
 
show pkt-seq-drop-stats
show delay-stats
show jitter-stats
 
VRF/Header Compression/NBAR/IP Accounting
 
VRF:
int fa0/0.10
description $tag
encap dot1q $vlanno
ip vrf forwarding PAGENT
ip add $ip $nmsk
 
 
Header compression:
int s0/0
ip tcp header-compression
 
show ip tcp header-compression
 
 
NBAR:
int s0/0
ip nbar protocol-discovery
 
show ip nbar protocol-disc
show ip nbar port-map
 
 
IP Accounting:
int s0/0
ip accounting precedence input
Queueing
 
WFQ/FIFO:
int s0/0
no fair-queue              FIFO
fair-queue 256 32              WFQ
hold queue 1000 out
 
 
Custom (CQ):
access-list 101 ip any any precedence internet
queue-list 5 proto ip 1 list 101
queue-list 5 proto ip 2 tcp telnet
queue-list 5 proto ip 2 tcp 22
queue-list 5 proto ip 3 tcp 123
queue-list 5 proto ip 3 tcp 6000
queue-list 5 proto ip 4 tcp www
queue-list 5 default 4
queue-list 5 queue 1 limit 8
queue-list 5 queue 4 byte-count 5000
 
int s0/0
custom-queue-list 5
 
 
Priority Queueing (PQ):
access-list 101 permit ip any any precedence internet
priority-list 7 proto ip high list 101
priority-list 7 proto ip medium tcp telnet
priority-list 7 proto ip medium tcp 22
priority-list 7 proto ip normal tcp 123
priority-list 7 default low
priority-list 7 queue-limit 10 20 30 40                            high, med, normal, low
 
int s0/0
priority-group 7
 
 
show queueing
show queue s0/0
Precedence levels (CoS)
 
All numbers are 3 bit binary representations
0 = Routine
1 = Priority
2 = Immediate
3 = Flash
4 = Flash-override
5 = Critical
6 = Internet
7 = Network
Policy and Class mapping
 
Class map:
class-map match-any critical
match proto ospf
match proto ntp
class-map match-any interactive
match proto telnet
match proto ssh
match proto xwindows
class-map match-any web
match proto pop3
match proto http
match proto smtp
 
show class-map
 
 
Policy map:
policy-map $tag
class critical
set precedence 7
class interactive
set precedence 5
class web
set precedence 3
class class-default
set precedence 0
 
int s0/0
service-policy output $tag
 
show policy-map
DSCP/Class Based Shaping
 
DSCP:
Make a class map and use the following policy map:
policy-map $tag
class critical
set dscp ef
class interactive
set dscp af41
class web
set dscp af32
class class-default
set dscp default
 
int s0/0
service-policy output $tag
 
 
Class based shaping:
class-map ef
match dscp ef
class-map af41
match dscp af41
class-map af32
match dscp af32
 
policy-map innerpolicy
class ef
shape peak 40000           	             class based shaping
class af41
shape peak 80000
class af32
shape peak 120000
compression header ip tcp              compression
 
policy-map shapingpolicy
class class-default
service-policy innerpolicy
shape peak 400000
 
int s0/0
service-policy output shapingpolicy
Multilink PPP/CAR(Committed Access Rate)/GTS(Generic Traffic Shaping)/LFI
 
int s 0/0             
bandwidth 800
clockrate 800000
encapsulation ppp
ppp multilink
ppp multilink group 1
no shut
 
int s 0/1             
bandwidth 800
clockrate 800000
encapsulation ppp
ppp multilink
ppp multilink group 1
rate-limit output 56000 1500 4000 conform-action continue exceed-action drop = CAR
no shut
 
int multilink1
ip add $ip $nmsk
shutdown           	          	             \ = Shutdown to prevent flapping
fair-queue           	          	             | = enable fair-queue
ppp multilink fragment delay 20              | = set fragmentation delay
ppp multilink interleave           	             | = enable LFI
no shut           	          	             / = Reenable interface
traffic shape rate 128000              = GTS
 
show ppp multilink           	             = PPP check
show traffic-shape           	             = GTS check
show int rate-limit           	             = CAR check
QoS Preclassify/AutoQos
 
Preclassify:
int tunnel0
qos pre-classify
 
 
AutoQoS:
int s0/0
auto discovery qos              = Discover qos settings
auto discovery qos trust = Discover qos settings with DCSP
auto qos                            = Begin automatic qos
 
show auto discovery qos
show auto qos
LLQ/CBWFQ/Traffic Policing
 
class-map prec0
match precedence 0
class-map prec3
match precedence 3
class-map prec5
match precedence 5
class-map match-any prec7
match precedence 7
match protocol ospf
 
policy-map $tag
class prec7
priority percent 15                            LLQ priority
class prec5
bandwidth percent 20                            bandwidth allocation
class prec3
bandwidth percent 20
class prec0
bandwidth percent 20
class class-default
fair-queue
police 3000000
 
int s0/0
service-policy output $tag
Misc Commands
 
 
configure terminal = Opens the configuration terminal
 
enable 15 = Enables privileged mode with a privilege level of 15
 
ip subnet-zero = Enables the use of subnet zero
 
ip helper $remip = Enables broadcast to unicast conversion, is sent to remote IP
 
no ip domain-lookup = No automatic domain lookup
 
no service config = No annoying service messages
 
ip route 192.168.1.1 255.255.255.224 s0/0 = Maps a static route to an IP through Serial interface 0/0
 
ip host 192.168.1.1 Oldboy = Maps the name Oldboy to IP 192.168.1.1
 
terminal history size 50 = Sets history size to 50 lines
 
banner motd #Warning Military Software, disperse!# = Sets message of the day, message is between the ##
 
username $un privilege 15 password $pwd = Sets username and password for a virtual
terminal connection, if login local has been enabled on vty, privilege 15 is auto enable
 
copy run start = Write the running-config to startup-config, wr or write can also be issued
 
erase nvram/startup-config = Erase startup-config, wr e or write erase can also be issued
 
exit = Takes one step back in config mode
 
end = Exits config mode entirely
 
reload = Reboots the router
Error Handling
 
sh crypto ?           	             = Use to error find in secure tunnels
 
sh ip route                            = Shows routing table
 
sh ip int bri                            = Shows a brief of the interfaces
 
sh run | $if                            = Shows the running config, but with an interface isolation
 
sh login           	             = Shows login attempt details
 
sh priv           	             = Shows privilege level
 
sh logging           	             = Shows logging information
 
sh ntp status              = Shows ntp status
 
sh ntp assoc              = Shows ntp associations
 
sh ip inspect all              = Shows CBAC setup
 
sh ip ips all              = Shows IPS configuration

Page 29 of 29
Made by Kristian Bøtcher in TEC Ballerup
2009-11-25
 
 
$hn = hostname, $pwd = password, $asn = AS number, $inout = use in or out of the router, $ip = IP, $nwip = network address number, $nmsk = netmask, $pn = Port number, $un = username, $add = address, $wm = Wildcard Mask, $areano = area number, $ono = ospf number, $priono = priority number, $keyno = key number, $vlanno = VLAN number, $vlanna = VLAN name, $inlclip = inside local ip, $inglip = inside global ip, $ipsta = ip range start, $ipsto = ip range stop, $npname = NAT pool name, $dpname = DHCP pool name, $dnname = domain name, $day = time in days, $spid = Spid number, $isdntp = ISDN router Type, $tsrange = Timeslot range, $autosn = Autonomous System Number, $remip = Remote ip of opposite router, $dlci = DLCI number, $lmit = LMI Type, $if = interface name, $tag = name or definition,
Initial Router Setup
 
 
hostname $hn = Sets hostname $hn
 
line con 0           	             \
password $pwd              | = Enables console password, without password you cant login
login           	             /
 
line vty 0 4           	             \
password $pwd              | = Enables vty(telnet) password, login local is to set local $pwd
login local           	             /
 
line aux 0           	             \
password $pwd              | = Enables auxiliary password
login           	             /
 
service password-encryption = Encrypts all passwords
 
enable secret $pwd = Sets up the enable(privileged) password, as secret(md5 encrypted)
 
int s 0/0           	          	             \ = Opens interface configuration for Serial 0/0
ip add 192.168.1.1 255.255.255.224              | = Set interface IP address
ip access-group $asn $inout               | = Adds access list $asn to interface as $inout
ip ospf priority $priono              | = Sets OSPF priority, highest is designated router
ip ospf cost $cost           	             | = Sets OSPF cost, reflects bandwidth
ip ospf message-digest-key $keyno md5 0 $pwd | = Sets an OSPF authentication key
ip nat inside/outside           	             | = Sets interface to be marked for inside/outside NAT
bandwidth 64           	             | = Sets the serial interface bandwidth
no keepalive           	             | = Makes sure interface never goes down
clockrate 64000           	             | = Sets a serial interface clock rate for DCE
no shutdown           	             / = Sets the interface as up
 
int fa or e 0/0           	             \ = Opens interface configuration for Ethernet 0/0
ip add 192.168.1.33 255.255.255.224              | = Set interface IP address
full-duplex            	          	             | = Sets full duplex on an Ethernet interface
no shutdown           	             / = Sets interface as up
 
int fa or e 0/0.2           	             \ = Opens interface configuration for VLAN 0.2
description VLAN $vlanno              | = Description of the interface
encapsulation dot1q $vlanno              | = Sets the interface encapsulation to 802.1q
ip add 223.2.0.129 255.255.255.192              / = Sets an interface address
Routing Protocols
 
 
router rip            	             \ = Opens router protocol configuration for rip protocol
version 2            	             | = Set version 2 for a rip protocol
network 192.168.1.0               | = Defines the network for the Serial interface
network 192.168.1.32              / = Defines the network for the Ethernet interface
 
router ospf $ono            	          	             \ = Sets the routing protocol to ospf
network $add $wm area $areano           	             | = Adds a network to the protocol
area $areano authentication message-digest              | = Sets authentication for an area
default-information originate           	             / = Makes sure that ospf shares info
 
router eigrp $autosn           	             \ = Sets eigrp with an autonomous system number
network 192.168.1.0 255.255.255.0              | = Defines a network connected to the router
redistribute static           	             | = Sends routing updates of static routes
no auto-summary           	             / = Sets discover other subnets
Encapsulation
 
 
int s0           	             \ = Opens interface
encapsulation hdlc              / = Sets up standard encapsulation HDLC
 
username $hn password $pwd           	             \ = Sets the $hn of opposing router with a            	          	          	             password $pwd which should be identical            	          	          	             on both routers
int s0           	          	          	             | = Opens interface
encapsulation ppp           	          	             | = Enables ppp
ppp authentication chap/pap           	             | = Sets authentication to use
ppp multilink           	          	             | = Enables multilinking
compress stac/predictor                         	             | = Enables compression stac or predictor
ppp quality 80           	          	             / = Defines Link Quality
 
encapsulation frame-relay           	             \ = Enables frame relay
frame-relay lmi-type $lmit            	             | = Sets LMI type to use
frame-relay map ip $remip $dlci broadcast              / = Set the frame relay map to a remote router
Initial Switch Setup
 
 
vlan database           	             \ = Opens up the VLAN database as privileged
vlan 2 name Sale           	             | = Set VLAN 2 with name of Sale
vlan 3 name Insurance           	             | = Sets VLAN 3 with name of Insurance
vtp v2-mode           	             | = Starts vtp and sets the mode for it
vtp domain Group1           	             | = Sets which domain group vtp is in
vtp server/client/transparent              / = Sets vtp to run on this switch as server, client or transparent
 
hostname $hn = Sets hostname $hn
 
line con 0           	             \
password $pwd              | = Enables console password, without password you cant login
login           	             /
 
line vty 0 4           	             \
password $pwd              | = Enables vty(telnet) password, login local is to set local $pwd
login local           	             /
 
service password-encryption = Encrypts all passwords
 
enable secret $pwd = Sets up the enable(privileged) password, as secret(md5 encrypted)
 
int vlan 1           	          	             \ = Opens the default VLAN interface
ip add 223.2.1.2 255.255.255.0              | = Sets the ip address for the default inteface
ip default-gateway 223.2.1.1              | = Set the default gateway of the default interface
int vlan1           	          	             | = Re opens the interface as the default-gateway command exits it
no shutdown           	             / = Starts the default interface
 
int fa 0/1           	          	          	             \ = Opens fast Ethernet interface 1
description Trunk to switch           	             | = Describes that this is a trunk line
duplex full/auto           	          	             | = Duplex mode, not used for routers
speed 100           	          	          	             | = Interface speed, not used for routers
switchport trunk encapsulation dot1q              | = Sets the switchport encpasulation
switchport mode trunk           	          	             / = Sets the switchport mode to trunk
 
int fa 0/4           	          	             \ = Opens fast Ethernet interface 4
switchport access vlan 2           	             | = Sets VLAN 2 access to the interface
port security max-mac-count 1              / = Sets port security to max-mac-count of 1
Advanced Switching
 
 
vlan $vlanno              \ = Creates a vlan
name $vlanna              / = Defines the name of the vlan
 
int range fa 0/1-4           	             \ = Opens up a range of interfaces
swi mode access                            | = Enables access mode on the switchports
swi access vlan $vlanno              | = Restricts the access on the ports to $vlanno
no shut                                          / = Enables the interfaces
 
inf fa 0/1           	          	             \ = Opens up an interface
no swi           	          	             | = Makes the port a non switching port, can be used for routing
swi trunk native vlan $vlanno               | = sets native vlan for sending and receiving untagged traffic
swi nonegotiate           	             | = Disables DTP
swi trunk encap isl/dot1q/negotiate | = Sets the trunk port encapsulation
swi mode access/dynamic(auto/desirable/trunk) | = Sets the mode of the trunk, dynacmic auto/desirable are used to autonegotiate trunk
swi trunk allowed vlan add/except/all/remove $vlanno,$vlanno,$vlanno-$vlanno | = Defines allowed vlan's
spanning-tree portfast / = Forces to enter forwarding state
 
vtp mode server/client/transparent = Server sends VLAN tables around, client receives them and transparent only forwards them
vtp v2-mode = Is the same as "vtp mode", except it enables version 2
vtp domain $dnname = Defines the VTP domain name
vtp password $passwd = Defines the VTP domain password
 
spanning-tree vlan $vlanno root primary/secondary = Sets spanning tree primary and secondary root
spanning-tree vlan $vlanno priority $priono = Sets the switch priority in a spanning tree
spanning-tree portfast default = Forces all nontrunking ports to forward, without making spanning-tree state changes
 
ip routing = Enables switch routing
router eigrp = Selects the eigrp routing protocol
 
sh vlan = Error finding command for vlan's
sh vlan internal use = shows the internal vlans
sh int swi = Shows statues of switching ports
sh dtp interface = Shows current dtp mode
sh vtp status = Shows the setup of VTP
sh vtp counters = Shows if VTP updates are sent and received
sh vlan = Shows the parameters of all VLAN's
sh ip prot = Shows the protocol
sh ip route = Shows routing information
Access Lists
 
 
access-list $asn deny ip 192.168.1.1 = Blocks specific IP, in this case 192.168.1.1, simple accesslist
 
access-list $asn deny ip 192.168.1.0 0.0.0.31 = Blocks an entire subnet, the 0.0.0.31
is the wildcard mask, simple accesslist
 
access-list $asn deny ip 192.168.1.0 0.0.0.31 192.168.1.32 0.0.0.31 = Block anyone from subnet 192.168.1.0 going to subnet 192.168.1.32, enhanced access list
 
access-list $asn permit ip any any = Allow anyone from any range, remember to add this at end of access list
 
Wildcard mask can be found by taking the subnet mask and subtracting it from 255.255.255.255. In this case it would be 255.255.255.255 minus 255.255.255.224 which is equal to 0.0.0.31
 
ALWAYS organize ACL’s with the most specific rules first and then the more general ones, and to put the simple ACL’s closest to the destination.
 
host $ip = Use this at the end of an access list to add a specific host to the access rule
eq$pn = Use this at the end of an access list to set a port number value to equal
neq$pn = Use this at the end of an access list to set a port number value to not equal
gt$pn = Use this at the end of an access list to a port number value to greater than
lt$pn = Use this at the end of an access list to a port number value to lesser than
NAT
 
 
ip nat inside source static $inlclip $inglip = Sets a static NAT between an inside local ip            	          	          	             and an inside global ip
ip nat pool $npname $ipsta $ipsto netmask $nmsk = Makes a NAT ip pool
 
ip nat inside source list $asn pool $npname = Sets dynamic NAT on a pool
 
ip nat inside source list $asn int s 0/0 overload  = Sets dynamic PAT(overload) on            	          	          	          	          	             interface serial 0/0
ip nat translation timeout 60 = Sets the NAT translation timeout to 60 seconds
DHCP
 
 
ip dhcp pool $dpname           	             \
network $nwip $nmsk                            |
default-router $ip           	             |
dns-server $ip           	             | = Sets up a DHCP pool with according configuration
netbios-name-server $ip              |
domain-name $dnname              |
lease $day                         	             / = Sets lease time, default is one day
 
ip dhcp excluded-address $ipsta $ipsto = Sets addresses to be excluded from the pool in a DHCP request
 
service dhcp/no service dhcp = Enables/Disables DHCP on a router
ISDN/DDR
 
 
int bri 0           	             \ = Opens up the BRI ISDN interface
isdn spid1 $spid              / = Sets the interfaces spid number
 
isdn switch-type $isdntp = Can be set on interface or in conf t to set the ISDN type
 
controller t1/e1 0           	             \ = Selects PRI controller
framing sf/esf            	             | = Sets framing method
linecode ami/b8zs/hdb3               | = Sets linecode to use
pri-group timeslots $tsrange              / = Sets amount of timeslots
 
interface s0 : 23(t1)/15(e1) = Sets PRI on a serial interface
 
dialer-list 1 protocol ip permit = Will set DDR to allow ip traffic
dialer-list 1 protocol ip list $asn = Defines DDR traffic from an access list
 
interface bri0/0            	          	             \ = Opens BRI interface
encapsulation ppp            	          	             | = Enables PPP
ppp authentication chap            	             | = Enables PPP CHAP
ip address $ip $nmsk           	          	             | = Sets interface ip
dialer pool-member 1 priority 100           	             | = Sets a dailer pool and priority
dialer-group 1            	          	             | = Enables dialer list 1
dialer map $remip name $hn speed 56/64              / = Maps remote interface
 
interface dailer1           	             \ = Makes a virtual dialer interface
dialer string 456848468              | = Assigns a string to it
dialer remote-name $hn              | = Sets Remote hostname
dialer pool 1           	             / = Adds the interface to a dailer pool
SDM
 
username $un privilege 15 password $pwd              \ = Adds a user with privilege 15
ip http server                         	             | = Enables http server for SDM
ip http secure-server                         	             | = Enables https server for SDM
ip http authentication local           	             / = Sets http authentication to local
 
line vty 0 4                         	             \ = Used to configure the line
login local                         	             | = Defines the line as a local line
transport input telnet ssh              / = Enables ssh and telnet
 
Enable preview commands:
Edit → preferences → Check preview references
 
Configure Site-to-site VPN:
Configure → VPN → Site-to-site VPN → Create a site to site vpn → step by step wizard → vpn connection information (pre-shared) → IKE proposals (add new encryption sha) → Transform set (add sha transform set) → Traffic to protect (choose remote and local networks) → Finish → Deliver
Generate mirror → copy configuration to the other vpn router cli → add crypto map to interface in cli → Test tunnel in SDM
 
Secure gre tunnel:
Configure → VPN → Site-to-site VPN → Create a secure gre → next → GRE tunnel information → Backup GRE tunnel (no) → vpn connection information (pre-shared) → IKE proposals (add new encryption sha) → Transform set (add sha transform set) → Select Routing protocol (eigrp) → Routing information (new eigrp as) → Finish → Deliver
Generate mirror → copy configuration to the other vpn router cli → add crypto map to interface in cli → add gre tunnel interface → add eigrp protocol → Test tunnel in SDM
 
Easy VPN:
Configure → VPN → Easy VPN Server → Enable AAA → Next → Interface and authentication (pre-shared) → IKE proposals (use default) → Transform set (use default) → Group authorization and Group policy lookup (local) → User authentication (add user credentials, no md5 hash, privilege 15) → Group authorization and User Group policies (add) → Add group policy (setup pool and pre-shared key, enable split tunneling) → Group authorization and User Group policies (set idle timer for new policy) → Finish → Deliver
Setup VPN Client on machine (use group policy settings) → Test VPN in SDM
 
One-step lockdown:
Configure → Security audit → one-step lockdown → yes → Deliver
 
Firewall:
Configure → Firewall and ACL → Advanced Firewall → Next → Advanced Firewall Interface Configuration (outside is external, inside is internal, dmz is loopback) → Advanced Firewall DMZ Service configuration (add, choose service and ip to allow) → Advanced Firewall Security Configuration (custom create new policy) → Url filtering (Enable http inspection) and Applications/ Protocols (choose all general tcp and udp) → Finish → Deliver → Check statements → Make changes if needed → Deliver
 
IPS:
Configure → Intrusion Prevention → Launch IPS Rules Wizard → Re Login to SDM → Next → Select Interfaces (only select the external as inbound) → SDF Locations (no) → SDF file in memory (no) → Finish → Deliver → Edit IPS → Apply Changes when done
VPN Tunnels
 
int tunnel0                         	             \ = Initiates a VTI (use standard for GRE tunnel)
tunnel source $if           	             | = Defines the interface the tunnel will go to
tunnel destination $ip           	             | = Defines the ip of the other tunnel peer
ip add $ip $nmsk           	             | = Defines the ip of this end of the tunnel
tunnel mode ipsec ipv4              | = Sets the tunnel to run ipsec (only if secure VTI)
tunnel protection ipsec profile $tag/ = Sets what profile with the name $tag the VTI should use (only secure VTI)
 
crypto ipsec profile $tag              \ = Creates and ipsec profile with the name $tag for a VTI to use (is used on VTI's instead of the crypto map on physical interfaces)
set tranform set $tag           	             / = Defines what transform set with name $tag the ipsec profile should use
 
crypto isakmp enable              = Enables isakmp if it has been disabled, but default is enabled
 
crypto isakmp policy 10              \ = Creates an IKE policy, cisco chooses lower numbers first, due to them being the most secure policies
auth pre-share           	             | = Defines what type of key is to be used
encr aes 256           	             | = Defines the encryption, aes 256 being the best
hash sha           	          	             | = Defines the hash, sha being the best
group 5           	          	             | = Defines the group the policy belongs to
lifetime 3600           	             / = Defines the lifetime
 
crypto isakmp key $pwd address $ip              = Defines the key $pwd for the remote peers $ip
 
crypto ipsec transform-set $tag esp-sha-hmac esp-aes 256 ah-sha-hmac              \= Sets up a transform set with the different encryption option, with a name of $tag
             
access-list 101 permit ip $ip $wm $ip $wm = Access list for allowing $ip one to access $ip two, needed to bind the tunnel to specific networks (remember both ways)
 
access-list 101 permit gre host $ip host $ip = Access list for making a secure gre tunnel, the $ip's points at the ipsec tunnels endpoints (remember both ways)
 
crypto map $tag 10 ipsec-isakmp                            \ = Creates a crypto map, giving it the name of $tag and the number of the policy
set transform-set $tag           	          	             | = Defines the transform set with the name of $tag from earlier
set peer $ip                         	             | = Defines the remote peer
match address 101           	          	             | = Defines the access list number to use
set pfs group5           	          	             | = Defines pfs group5
set security-assoc lifetime seconds 3600              / = Defines the lifetime
 
int $if           	             \ = Opens up the interface $if that is supposed to carry the ipsec
crypto map $tag              / = Defines the crypto map with the name $tag on this interface, to engage ipsec on this interface
 
Enable AAA for easy vpn to work!
Username $un password $pwd = Setup username and password
aaa new-model = Enable aaa
aaa authentication login default local none = Options for aaa
 
Ip local pool $tag $ipsta $ipsto = Create an ip pool with the name $tag and with the range $ipsta to $ipsto
 
aaa authorization network $tag local = Creates a Group authorization with the name of $tag
 
Create an IKE policy without hash and with a group of 2!
 
crypto isakmp client configuration group $tag\ = Creates an ISAKMP authorization group with the name of $tag
key $pwd                                                        | = Defines a key with the name $pwd
pool $tag                                                         | = Defines the pool defined earlier with the name $tag             
acl 100                                                        | = Defines an access-list
netmask $nmsk                                          / = Defines the netmask
 
access-list 100 permit ip $ip $wm any = Used to define an all access pass to and from the easy vpn
 
Create a transform set!
 
Crypto dynamic-map $tag 10              \ = Create a dynamic map with the name $tag and with policy 10
set transform-set $tag                            | = Define a transform set with the name of $tag
reverse-route                            / = Ensures that a route is installed for the remote peer
 
crypto map $tag client configuration address respond = Enable response to vpn requests on the dynamic map with name $tag
crypto map $tag isakmp authorization list $tag = Associate the map $tag with the aaa authorization list with name $tag
crypto map $tag 10 ipsec-isakmp dynamic $tag = Create a crypto map with name $tag from the earlier created dynamic map with name $tag
 
Add the map to an interface!
 
crypto isakmp keepalive 30 5 = Issues a keepalive for 30 seconds, with a retry of 5 seconds
 
aaa authentication login $tag local = Enable xauth with a name of $tag
username $un password $pwd = Create a new user
crypto isakmp xauth timeout 60 = The amount of second to wait for authentication before timeout
crypto map $tag client authentication list $tag = Associate recently created crypto map with the name $tag with the xauth called $tag
 
Security
 
auto secure = Start the auto secure wizard
 
no ip finger = Disables fingering service, so one cannot see who is logged on
 
no service udp-small-servers = Disables udp small servers like echo and discard
no service tcp-small-servers = Disables tcp small servers like echo and discard
 
service tcp-keepalives-in = Helps keep track of telnet connections and closes broken ones
service tcp-keepalives-out = Helps keep track of telnet connections and closes broken ones
 
no cdp run = Disables CDP(Cisco Discovery Protocol), so device information is not shared
 
no service pad = Disables translation in legacy networks
 
no ip bootp server = Disables the tftp boot service, so a cisco image can't be stolen
 
no ip http server = Disables the cisco web interface
 
no ip source-route = Disable a clients ability to decide packets routes through the network
 
no ip gratuitois-arps = Stops arp poisoning
 
int $if                            \ = Interface edit mode of interface $if
no ip redirects              | = Disables ICMP redirect messages
no ip proxy-arp              | = Enables responding to Arp requests on remote networks
no ip unreachables              | = Disables ICMP unreachable messages
no ip directed-broadcast              | = Disables ip broadcasts
no ip mask-reply              | = Disable unnecessary ICMP messages from ICMP mask requests
no mop enabled              / = Disable Maintenance Operation Protocol, usually only active on Ethernet interfaces
 
username $un password $pwd = Make a local user
 
line vty 0 4              \ = Enable local user login on telnet
login local              /
 
enable secret $pwd = Set a password on enable
 
login block-for 30 attempts 3 within 15 = Blocks login for 30 seconds, if 3 wrong attempts is made within 15 seconds
 
login quiet-mode access-class 1              \ = Allows login from hosts in access list 1 if quiet mode is invoked by the login block
access-list 1 permit $ip $wm              /
 
login delay 3 = Set a 3 second delay between login attempts
login on-failure log = Generate a log entry if login fails
 
security passwords min-length 8 = Set minimum password length to 8 characters
 
enable secret level 5 $pwd = Sets a password to enable level 5
privilege exec level 5 configure terminal = Sets level 5 access to the configure terminal command
privilege configure level 5 interface = Sets level 5 access to interface configuration
privilege interface level 5 shutdown = Sets level 5 access to interface shutdown
 
banner ~ = Write a banner login message
 
ip domain name cisco.com              \ = Create a domain name
crypto key generate rsa              / = Generate an rsa key for ssh
line vty 0 4                            \ = Force telnet connections over to ssh
transport input ssh              /
 
service password-encryption = Encrypts all passwords
 
logging host $ip                            \ = Logging host
logging trap critical                            | = What to trigger logging on
logging trap informational              / = What to trigger logging on
 
logging buffered 32768 informational = Engage local buffer logging with a cache of 32KB
 
parser view $tag                                          \ = Create a new view with name $tag
secret $pwd                                          | = Define password $pwd
commands exec include show interface              | = Define what commands to show
commands exec include clear counters              | = Define what commands to show
enable view root                                           | = Enables root view, the password is the same as the enable password
enable view $tag                                          / = Enter the view named $tag
 
parser view $tag superview              \ = Create a super view with name $tag
view $tag                                          / = Add another view with the name $tag
 
ntp master 5 = Set as ntp master with a stratum number of 5, every time an ntp update occurs the stratum number is incremented by one
 
ntp server $ip = Points a client to an ntp server
 
NTP authenticate must be set on all masters and clients!
ntp authenticate                            \ = Enable ntp authentication
ntp authentication-key 1 md5 $pwd| = Define ntp key 1
ntp trusted-key 1                            / = Use ntp key 1
 
ntp peer $ip = Is used to setup an active peer, to get the time from a non master
 
access-list 100 deny ip any any log = Needs to be extended for use with CBAC
ip inspect name $tag ?              \ = Define CBAC rule with name $tag
int $if                            | = Open up interface configuration
ip inspect $tag in              | = Enables the CBAC rule $tag on the interface inwards
ip access-group 100 in              / = Enables access-list on the interface for CBAC to use
 
ip ips name $tag                            \ = Create an IPS with the name $tag
ip ips signature 2004 disable              | = Disables ICMP attack alert
int $if                                          | = Opens interface configuration
ip ips $tag in                            / = Sets IPS with the name $tag on the interface
NQR
 
nqr
fastethernet0/0
add tcp
datalink ios-dependent fastethernet0/0.10             
l2-arp-for 172.16.10.1
l3-src 172.16.10.4
l3-dest 172.16.20.4
l4-dest 23
fastethernet0/0.20 ios-dependent capture
start
stop
fastethernet0/0
add tcp
send 1000
rate 60
length random 200 to 1000
l2-dest $mac
l3-src 172.16.10.4
l3-dest 172.16.20.4
l4-dest 23
fastethernet0/1 capture
add clone-of 1
l4-dest 21
add clone-of 1
l4-dest 119
add clone-of 1
l4-dest 22
add clone-of 1
l4-dest 6000
 
show pkt-seq-drop-stats
show delay-stats
show jitter-stats
 
VRF/Header Compression/NBAR/IP Accounting
 
VRF:
int fa0/0.10
description $tag
encap dot1q $vlanno
ip vrf forwarding PAGENT
ip add $ip $nmsk
 
 
Header compression:
int s0/0
ip tcp header-compression
 
show ip tcp header-compression
 
 
NBAR:
int s0/0
ip nbar protocol-discovery
 
show ip nbar protocol-disc
show ip nbar port-map
 
 
IP Accounting:
int s0/0
ip accounting precedence input
Queueing
 
WFQ/FIFO:
int s0/0
no fair-queue              FIFO
fair-queue 256 32              WFQ
hold queue 1000 out
 
 
Custom (CQ):
access-list 101 ip any any precedence internet
queue-list 5 proto ip 1 list 101
queue-list 5 proto ip 2 tcp telnet
queue-list 5 proto ip 2 tcp 22
queue-list 5 proto ip 3 tcp 123
queue-list 5 proto ip 3 tcp 6000
queue-list 5 proto ip 4 tcp www
queue-list 5 default 4
queue-list 5 queue 1 limit 8
queue-list 5 queue 4 byte-count 5000
 
int s0/0
custom-queue-list 5
 
 
Priority Queueing (PQ):
access-list 101 permit ip any any precedence internet
priority-list 7 proto ip high list 101
priority-list 7 proto ip medium tcp telnet
priority-list 7 proto ip medium tcp 22
priority-list 7 proto ip normal tcp 123
priority-list 7 default low
priority-list 7 queue-limit 10 20 30 40                            high, med, normal, low
 
int s0/0
priority-group 7
 
 
show queueing
show queue s0/0
Precedence levels (CoS)
 
All numbers are 3 bit binary representations
0 = Routine
1 = Priority
2 = Immediate
3 = Flash
4 = Flash-override
5 = Critical
6 = Internet
7 = Network
Policy and Class mapping
 
Class map:
class-map match-any critical
match proto ospf
match proto ntp
class-map match-any interactive
match proto telnet
match proto ssh
match proto xwindows
class-map match-any web
match proto pop3
match proto http
match proto smtp
 
show class-map
 
 
Policy map:
policy-map $tag
class critical
set precedence 7
class interactive
set precedence 5
class web
set precedence 3
class class-default
set precedence 0
 
int s0/0
service-policy output $tag
 
show policy-map
DSCP/Class Based Shaping
 
DSCP:
Make a class map and use the following policy map:
policy-map $tag
class critical
set dscp ef
class interactive
set dscp af41
class web
set dscp af32
class class-default
set dscp default
 
int s0/0
service-policy output $tag
 
 
Class based shaping:
class-map ef
match dscp ef
class-map af41
match dscp af41
class-map af32
match dscp af32
 
policy-map innerpolicy
class ef
shape peak 40000           	             class based shaping
class af41
shape peak 80000
class af32
shape peak 120000
compression header ip tcp              compression
 
policy-map shapingpolicy
class class-default
service-policy innerpolicy
shape peak 400000
 
int s0/0
service-policy output shapingpolicy
Multilink PPP/CAR(Committed Access Rate)/GTS(Generic Traffic Shaping)/LFI
 
int s 0/0             
bandwidth 800
clockrate 800000
encapsulation ppp
ppp multilink
ppp multilink group 1
no shut
 
int s 0/1             
bandwidth 800
clockrate 800000
encapsulation ppp
ppp multilink
ppp multilink group 1
rate-limit output 56000 1500 4000 conform-action continue exceed-action drop = CAR
no shut
 
int multilink1
ip add $ip $nmsk
shutdown           	          	             \ = Shutdown to prevent flapping
fair-queue           	          	             | = enable fair-queue
ppp multilink fragment delay 20              | = set fragmentation delay
ppp multilink interleave           	             | = enable LFI
no shut           	          	             / = Reenable interface
traffic shape rate 128000              = GTS
 
show ppp multilink           	             = PPP check
show traffic-shape           	             = GTS check
show int rate-limit           	             = CAR check
QoS Preclassify/AutoQos
 
Preclassify:
int tunnel0
qos pre-classify
 
 
AutoQoS:
int s0/0
auto discovery qos              = Discover qos settings
auto discovery qos trust = Discover qos settings with DCSP
auto qos                            = Begin automatic qos
 
show auto discovery qos
show auto qos
LLQ/CBWFQ/Traffic Policing
 
class-map prec0
match precedence 0
class-map prec3
match precedence 3
class-map prec5
match precedence 5
class-map match-any prec7
match precedence 7
match protocol ospf
 
policy-map $tag
class prec7
priority percent 15                            LLQ priority
class prec5
bandwidth percent 20                            bandwidth allocation
class prec3
bandwidth percent 20
class prec0
bandwidth percent 20
class class-default
fair-queue
police 3000000
 
int s0/0
service-policy output $tag
Misc Commands
 
 
configure terminal = Opens the configuration terminal
 
enable 15 = Enables privileged mode with a privilege level of 15
 
ip subnet-zero = Enables the use of subnet zero
 
ip helper $remip = Enables broadcast to unicast conversion, is sent to remote IP
 
no ip domain-lookup = No automatic domain lookup
 
no service config = No annoying service messages
 
ip route 192.168.1.1 255.255.255.224 s0/0 = Maps a static route to an IP through Serial interface 0/0
 
ip host 192.168.1.1 Oldboy = Maps the name Oldboy to IP 192.168.1.1
 
terminal history size 50 = Sets history size to 50 lines
 
banner motd #Warning Military Software, disperse!# = Sets message of the day, message is between the ##
 
username $un privilege 15 password $pwd = Sets username and password for a virtual
terminal connection, if login local has been enabled on vty, privilege 15 is auto enable
 
copy run start = Write the running-config to startup-config, wr or write can also be issued
 
erase nvram/startup-config = Erase startup-config, wr e or write erase can also be issued
 
exit = Takes one step back in config mode
 
end = Exits config mode entirely
 
reload = Reboots the router
Error Handling
 
sh crypto ?           	             = Use to error find in secure tunnels
 
sh ip route                            = Shows routing table
 
sh ip int bri                            = Shows a brief of the interfaces
 
sh run | $if                            = Shows the running config, but with an interface isolation
 
sh login           	             = Shows login attempt details
 
sh priv           	             = Shows privilege level
 
sh logging           	             = Shows logging information
 
sh ntp status              = Shows ntp status
 
sh ntp assoc              = Shows ntp associations
 
sh ip inspect all              = Shows CBAC setup
 
sh ip ips all              = Shows IPS configuration
