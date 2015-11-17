# Apache Subversion

1. Install Apache and NFS
apt-get install nfs-common subversion apache2 libapache2-svn

2. Add and NFS volume to /etc/fstab:
```
192.168.1.10:/vcs/   /mnt/vcs   nfs    auto  0  0
```

3. Run these commands to enable modules in Apache to make it Subversion capable
a2enmod ldap
a2enmod authnz_ldap
a2enmod dav
a2enmod dav_svn

4. Modify and use the configuration file /etc/apache2/mods-available/dav_svn.conf from this git