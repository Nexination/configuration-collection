# Live resize linux volume

1. Install parted
```apt install -y parted```

2. Run parted to create a new physical volume with the empty space
```
    run mkpart
    press p
    type $yourJournalSystem
    type $spaceUsed
    type $spaceTotal
    press t
    type $volumeNumber
    type in lvm to use logical volume manager
```

3. Initiate the new physical volume with the following command (use pvdisplay to display physical volumes) ```pvcreate /dev/$newVolumeName```

4. Extend your current physical volume group with the one you created earlier with the following command (use vgdisplay to view volume groups) ```vgextend $volumeGroupName /dev/$newVolumeName```

5. Extend the logical volume with the new space in the group with the following command (use lvdisplay to see logical volumes) ```lvextend -L+$sizeToAdd /dev/mapper/$volumeGroupName```

6. Make the filesystem fit to the new size with this command ```resize2fs /dev/mapper/$volumeGroupName```