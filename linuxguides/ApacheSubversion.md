# Apache Subversion

## Install Apache and NFS

```apt install -y nfs-common subversion apache2 libapache2-svn```

## Set up Subversion

Add an NFS volume to /etc/fstab:

```
192.168.1.10:/vcs/   /mnt/vcs   nfs    auto  0  0
```

Enable modules in Apache
```
a2enmod ldap
a2enmod authnz_ldap
a2enmod dav
a2enmod dav_svn
```

Modify and use the configuration file [/etc/apache2/mods-available/dav_svn.conf](https://github.com/Nexination/configuration-collection/raw/master/etc/apache2/mods-available/dav_svn.conf) from this git