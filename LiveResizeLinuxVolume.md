# Live resize linux volume

1. Install parted
apt-get install parted

2. Run parted to create a new physical volume with the empty space
    a. type mkpart
    b. press p
    c. type your journal system
    d. type in the space used
    e. type in the total space you want
    f. press t
    g. type your partition number
    h. type in lvm to use logical volume manager

3. Initiate the new physical volume with the following command (use pvdisplay to display physical volumes)
pvcreate /dev/newvolumename

4. Extend your current physical volume group with the one you created earlier with the following command (use vgdisplay to view volume groups)
vgextend volumegroupname /dev/newvolumename

5. Extend the logical volume with the new space in the group with the following command (use lvdisplay to see logical volumes)
lvextend -L+sizetoadd /dev/mapper/volumegroupname

6. Make the filesystem fit to the new size with this command
resize2fs /dev/mapper/volumegroupname