# Ubuntu LAMP
1. Install LAMP this command
tasksel

2. Install additions with this command
apt-get install php5-curl php5-gd php5-fpm php5-json php5-intl phpmyadmin

3. Add index.php to DirectoryIndex and "AllowOverride All" and "Require all granted" to <Directory /var/www/> in /etc/apache2/sites-enabled/000-default

4. Fix apache with these commands
```
a2enmod rewrite
service apache2
```

5. Upload sites/

6. Change permissions with these commands
```
chown -R www-data /var/www
chgrp -R www-data /var/www
chmod -R 775 /var/www/sites
```

7. Add users with these commands
```
useradd john -g www-data -p newpassword
passwd john
```

8. Add firewall from this git iptables/lampsecurity