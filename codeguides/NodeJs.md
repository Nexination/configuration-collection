# NodeJS quickstart module/app codeguide

## Initiating a new directory
Always start all new NodeJS with "npm init --yes" to generate the package.json file.

You can add a number of things to this file to make your job easier.
Two of the more important ones are to specific what version of node you made this for and if you are using a repository.
[package.json](https://docs.npmjs.com/files/package.json)
```
"engines": {
    "node": "5.0.0"
}
"repository": {
    "type": "git",
    "url": "git@github.com:You/Your.git"
},
```

### Automated updates of package.json
You can install dependencies to your package and auto add them to your package.json file with these commands:
```
npm install foobar --save #Save for compatible versions
npm install foobar --save --save-exact #Save for exact version
```

### Installing your package
Once you have made a package, you can install it to another module/package or globally like this:
```
npm install /package/path/here #Install to local package/module
npm install -g /package/path/here #Install globally
```
This does however require you to have a proper made package.json file.

#### Publishing your package to NPM
This uses two very simple commands, just follow the instructions:
```
npm adduser
npm publish
```

If you want to package your app as a single executable or for mobiles, [JXCore](http://jxcore.com/home/) can be recommended.

## Good to know about NodeJS
You can optimise your node garbage collector to run more lean like this:
```
node --optimize_for_size --max_old_space_size=920 --gc_interval=100 server.js
```

Always be mindful of which modules/packages you download, some of them can be very bloated and have a ton of dependencies.

You can use [NodeJS assert](https://nodejs.org/api/assert.html) to do automated tests

Using a smart file structure, like having a folder lib and having a folder tests, will help you keep better track of things.
Also any files in the lib folder can be automatically used by using [require](https://nodejs.org/api/modules.html).

Using [environment variables](https://nodejs.org/api/process.html) between nodes can be a quick and efficient way for nodes to inform and share configs.

NodeJS is single threaded, therefore it can be a great advantage to use [clustering](https://nodejs.org/api/cluster.html), if you want to be able to use multiple cores/threads.

Any talk of NodeJS memory limits are no longer relevant, you can define exactly how much ram you want to allow by using the "--max-old-space-size=" flag (default limit is 1.7GB for 64-bit and 1GB for 32-bit).

## Guidelines to keep you out of trouble

### File formatting
You should aim to keep indentation to 2 spaces (like NodeJS itself does) or 4 spaces, no tabs.
Your line termination and character encoding should always be LF(line feed, UNIX standard) and UTF8(Unicode).
Always use lowercase filenames, or they can be hard to keep track of and/or host on linux systems.

### Variables, constants, methods(functions) and "classes"
All of these follow camel case convention, first word in all small letters all subesquent words with a big starting letter, the rest small.
There are a few caveats to this though, "classes" also start with a capital letter and constants are written in ALL capital letters to stand out.
Also all naming should make sense, so one should be able to read from a function or variable what it does (try not to shorten things).
To note, all letters have to be ASCII compatible.

**Variables and constants:**
*Constant:* NEWNODEMODULE
Use "const" to define a constant
These are constant and can not be changed, trying to change them will cause a crash/error.

*Variable:* newNodeModule
Use "var" to create a variable that has a scope to nearest function
Use "let" to create a variable that has a scope to neares block, statement, or expression
These are varying as the name suggests and can be used to contain changing data.

Variables can basically contain anything in JS, but most commonly is used for 6 different types:
* Integers - Should always be written without anything surrounding it
* Strings - Should always be written in single quotes
* Objects - Should always be filled with double quotes, this includes indexes
* Array - A type of object, that uses numeral indexes
* Functions
* Boolean - true/false

Whenever a string or object becomes really long, it can make sense to split it into several lines, using a nested tree structure:
```
// Array example
newArray = [
    "Item"
    , 1
    , true
    , []
];
// String example, in ES6 we can do these without using + for each line, called prototype strings
example = `This is an examples of
    how strings should
    be composed in
    proper format.`;
```
Whenever this method is used whatever is used to split up the statement should be a precursor on the lines.
In this case it is comma(,) and plus(+), it makes them a lot easier to copy and also easier to spot forgotten ones.

**Methods(functions) and classes:**

*Methods:* newNodeModule
Functions are the base of all repetitive behaviour and look like this:
```
var newNodeModule = function() {
    
};
```

Functions can also be written like closures (inline functions), this is common practice for callbacks (often used by async functions after they are run):
```
var newString = 'Stuff' + function() {return 5 + 5;};
```
It is a very good idea to add a name to these as it will ease your stack traces:
```
var newString = 'Stuff' + function newFunction() {return 5 + 5;};
```

*Classes:* NewNodeModule
Classes have been greatly improved in ES6 and now almost resemble real classes, these were introduced with the merge of NodeJS and io.js so they are available.
Classes support prototype-based inheritance, super calls, instance and static methods and constructors.
```
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  get boneCount() {
    return this.bones.length;
  }
  set matrixType(matrixType) {
    this.idMatrix = SkinnedMesh[matrixType]();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```
Thanks to [Luke Hoban](https://github.com/lukehoban/es6features) for this example, please go there to read more about ES6.

### JSON (JavaScrip Object Notation) or just JS objects
Only important things to remember with these is that opposed to the normal standard of writing with single quotes,
one should use double quotes for these, as this reduces errors and makes it copyable and usable as JSON.
```
var newJson = {
    "newInteger": 5
    , "newString": "test"
};
```

### Semicolons
These are in fact so important they get they own section, ALWAYS ALWAYS ALWAYS use semicolons to end all blocks, statements or expressions.
The reason for this is that if you do not, you can end up with some really peculiar errors, that can take you a long time to fix.

### Correct use of loops
**For:**
For has a double functionality to accommodate objects and arrays and are most effective if used properly.
The “incremental for” loop is used to iterate arrays or other numbered data points and is the fastest loop, so when at all possible, utilize this loop type.
The “for in” loop is used to iterate over objects and is very effective and easy to use with objects or object like data, like column names in a database array.
In ES6 we also have the "for of" loop, which is incredibly useful because it doesn't require realizing the array and allows for lazy design patterns.

**While:**
While is only to be used with true/false statements, where a loop is need to run until a certain action happens and the variable is set to false to stop the loop from running.

### Data handeling
This should preferrably use some sort of API scheme, currently the hottest trend is RESTful, so it is suggested to use this.
Mainly just use the scheme where you can convey the most data, with spending the least possible amount of bandwidth.

## Do's and Don'ts
**Don'ts:**
* Don’t under any circumstances use any sort of browser detection to base any coding decisions upon. Instead, checking if a function is there or not can be used and then used accordingly.
* Don’t use this outside of classes, if you are looking for a way to send a source element to a function, look up event and learn how to use it.
* Don’t use non-standard Javascript features under any circumstances, the single exception is if there is no other way to do it, and then only to make a polyfil to fix missing functionality.
* Don’t ever use i++ to increment, always use i += 1, it makes changing it easier and prevents a very nasty forever loop bug some Javascript implementations have.
* Don’t use regex for every single search, indexOf/lastIndexOf and substr can be used in most cases and does the job a lot faster.
* Don’t under any circumstances use eval(), not even to parse JSON.
* Don’t under any circumstances construct functions inside blocks.
* Don’t under any circumstances change the style attribute of elements, use classes instead, rare exceptions can be used when doing iterating changes.
* Don't use setInterval, it means you are lazy and it means you open up yourself to memory leaks.
* Don't use modules unless you absolutely have to, they clutter and slow down your program, especially the ones with a lot of dependencies, for the most part vanilla modules can do what you want.

**Do’s:**
* Do use null to empty variables that does not have a specific function for doing so already.
* Do use classes as often as possible to reduce the risk of overwriting other variables and causing more chaos than necessary in the global scope.
* Do use objects instead of multiple if() statements, they make it easier to get an overview and they are a lot faster.
* Do always remove any alert() and console.log() statements, once you are done using them.
* Do use triple equals (===) whenever possible, as it ensures better statement accuracy.
* Do use setTimeout(newFunction, 1000); correctly, with functions always as a direct reference without the brackets, to avoid error.