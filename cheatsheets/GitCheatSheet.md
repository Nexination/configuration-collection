# GIT cheatsheet
## Getting started
To get started you want to create a new repository ```git init``` or clone a current one from a remote ```git clone git@github.com:yourrepository.git```

## Basic usage
The most commonly used git commands are usually checking old commits, adding new one and pushing/pulling from a remote.

### Working with git
Use ```git add *``` to stage everything and ```git commit -m "Stuff"``` to commit your staged changes with a message. The command ```git add``` can also be used to stage file patterns or specific paths.
To undo something you staged without removing the file, use ```git rm --cached myfile.md```.
Both ```git rm``` and ```git mv``` can be used to delete or remove files from git and stage the changes while doing so. The last one is also quite important ```git checkout -- myfile.md```, this will let you check out a specific file and overwrite any changes. This can also be used with other flags to reset parts of a working directory.

### Checking logs/status
Git has a status command but some of the flags like ```git status -s``` will simplify the use of the status message and make them easier to read.
The command ```git diff --staged``` is also quite helpful as it will only show you the diff of staged items, instead of everything.

Logs can also be quite the powerful tool if used correctly, there are a lot of flags to showcase the information in a lot of different ways. A short takeout of these:
```
git log -2 - Show last two logs
git log -p - Show git logs in like diff
git log --stat - Show log statistics
git log --pretty=oneline - Shorten logs into onliners
git log --since=2weeks - Show logs from the past two weeks
git log --until=2weeks - Show any logs before two weeks ago
```
### Working with remotes
To get an overview use ```git remote -v``` to get a view of all the remotes currently associated with this git.
To add more remotes or even to remove or rename some, use the following commands:
```
git remote add myremote git@github.com:yourrepository.git
git remote rename myremote myrealremote
git remote remove myrealremote
```
To get more detailed information on a remote use ```git remote show myremote```.

The process of updating data is split into three, just getting the updated information, getting the information and applying it and pushing information to the remote:
```
git fetch - Fetches information without applying
git pull - Fetches and applies information
git push - Pushes your commits to the remote
```
All these commands can be used with one or more specified remotes or the ```--all``` flag to use all remotes.

#### Tags
Tags are pretty short and simple, they allow you to tag a commit, but they need a bit something special to be sent to a remote as well. Overview of commands:
```
git tag - See an overview of tags
git tag v0.1 - Add a v0.1 tag in next commit
git tag -a v0.1 -m "A bit of info" - Add a v0.1 tag with a description in next commit
git push origin --tags - Push tags to remote named origin
```

## Working with branches
When it comes to git, branches is pretty much where it's all at, it allows for moving around in code and fixing different issues, while only having one repository downloaded.

The most crucial part of information about branches is that they are for all intents and purposes local only, unless pushed to a remote or already present in a remote.

First off finding out if there are branches and if so what they are named and where they are from is key, it can be done with these commands:
```
git branch -vv - List all branches and their current status
git log --oneline --decorate --graph --all - Show logs of all branches and their commit history
```

Creating branches and checking them out is easy:
```
git branch mybranch
git checkout mybranch
or
git checkout -b mybranch
```
Checking out and tracking a remote branch is quite easy, but there are also quite a few ways to do it:
```
git checkout mybranch - Will checkout a remote branch automagically or checkout a loca branch if no remote
git checkout -b mybranch origin/develop - Will check out remote branch develop with the name mybranch
git checkout --track origin/develop - Will checkout remote branch develop
```
To merge or remove a branch do the following:
```
git merge mybranch - Merge branch called mybranch into current branch
git branch -d mybranch - Delete branch named mybranch
```
To push or remote branch do the following:
```
git push origin mybranch:develop - Push mybranch to the remote origin, but rename it to develop
git push origin --delete develop - Destroy remote branch develop on origin
```

### Rebasing a branch
Rebasing will clean up the commit history and remove branches, be cautious when doing this and **DO NOT** do it on remotes.
This set of commands will rebase the develop branch into master and remove the develop branch:
```
git rebase master develop
git checkout master
git merge develop
git branch -d develop
```

## A bit about alias and hooks
Alias and hook are not so commonly known features, but alias' allow you to make shorthand git commands and hooks allow you to execute a piece of code before/after/while a git command is being run.

For more on hooks, either Google it or go have a look in the .git/hooks directory of your repository.

Alias' can be summed up with the following commands:
```
git config --global alias.unstage 'reset HEAD --' - Make the command "git unstage" that allows you to reset your working directory
git config --global alias.visual '!gitk' - Make the command "git visual" that allows you to pipe data to the *gitk* program (external indicated by !)
```

## The two special files
### .gitignore
This nifty little file, lets you ignore files generated by builds or files you otherwise do not want to end up in a commit.
* Blank lines or lines starting with # are ignored.
* Standard glob patterns work.
* You can start patterns with a forward slash (/) to avoid recursivity.
* You can end patterns with a forward slash (/) to specify a directory.
* You can negate a pattern by starting it with an exclamation point (!).

### .gitattributes
The biggest use of this file is to avoid bad line endings or line endings getting applied to files where it shouldn't. A short example of enforced linux line endings with some files being check ```text``` and some files not being checked ```binary```.
```
* text eol=lf
*.css text
*.php text
*.js text
*.json text
*.txt text
*.scss text
*.jpg binary
*.png binary
*.gif binary
```