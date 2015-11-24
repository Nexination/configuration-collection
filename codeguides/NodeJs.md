# NodeJS quickstart module/app codeguide

Always start all new NodeJS with "npm init --yes" to generate the package.json file.

To this package.json file you can add a few things if you feel the need, a specific node engine and/or a git repository https://docs.npmjs.com/files/package.json:
```
"engines": {
    "node": "5.0.0"
}
"repository": {
    "type": "git",
    "url": "git@github.com:You/Your.git"
},
```

To install and add dependencies to node js use "npm install foobar --save" adding "--save-exact" will lock you into a specific version

use node flags to optimise the garbage collector "node --optimize_for_size --max_old_space_size=920 --gc_interval=100 server.js"

let vs var

lowercase filenames

be careful with bloated modules that are full of bad javascript

use environment variables instead of environment specific files

use lib and test folders to contain libraries and tests, libraries can be fetched with require, but the files have to contain an exports object
use nodejs' own assert methods to do testing https://nodejs.org/api/assert.html

NEVER nest closures and always name them, to get prettier stack traces

use "npm install -g /package/path/here" to install your own package globally, it requires you to have a package.json file

to publish your library to npm, use "npm adduser" and "npm publish"

always write objects with double quotes as opposed to the normal single quotes, it makes it directly JSON compatible



File formatting
Indentation
Indentation should consist of 4 spaces. Tabs are not allowed.
Newlines
Line termination follows the Unix text file convention. Lines must end with a single LF (Line feed, \n, 10 in decimal, 0x0A in hexadecimal) character.
All files should have a newline at the end. It makes sense, since all other lines have a newline character at the end, and it makes passing data around in non-binary formats (like diffs) easier. Also, some command-line tools don't handle files without one well (or at least, not in the way that one would like or expect).
Encoding
All text files must be encoded with UTF-8 without a Byte Order Mark. A BOM is a special character at the very top of the file and will be output by the web browser to the client. This can result in unexpected behaviour in the execution and rendering of files.
Do not use Microsoft Notepad to edit files, as it always inserts a BOM.
In short, make sure your editor supports UTF-8 without BOM.
Trailing whitespace
Don't add new trailing whitespace at the end of lines or the file. Use a text editor which allows you to easily spot/clean trailing whitespace or configure it to do so.
Maximum line length
A rule of thumb is to keep lines less than 120 characters for readability on smaller screens and general clarity.
Code documentation
Any and all documentation should be done outside files.
Naming conventions
Filenames
For files only ASCII letters, underscores, and the dash character ("-") are permitted. Spaces are strictly prohibited.
All Javascript files should end with the appropriate “.js” ending.
File names must map to class name.
It is good practice to name files according to their function.
When doing radical change to a file it is good practice to save the old version including the date in the filename to have it as backup.
Classes
Class names may only contain ASCII letters, with the first letter of each word being capitalized.
Capitalized letters must never be next to each other, even if the word is a an acronym like “PDF” or “CEO”.
Functions are always written as variables to properly bind them in the correct scope.
Example:
var NewClass = new function() {
    var privateFunction = function() {
    };
    this.publicFunction = function() {
    };
};
Functions and methods
Function names may only contain ASCII letters. Underscores are not permitted.
When a function name consists of more than one word, the first word must be in lower case, and the first letter of each additional word must be capitalized. This is commonly called "CamelCase" formatting.
Function names should properly describe the functions purpose and/or behaviour.
Functions are always written as variables to properly bind them in the correct scope, like so: var newFunction = function() {}; or this.newFunction = function() {}; if declared public in a class.
One should always attempt to collect functions inside classes to keep global scope clutter to a minimum.
Example:
var demoFunction = function(theString, newInteger, newArray) {
    if(theString === 'string') {
        newArray[newInteger] = theString;
    };
};
Variables
Variable names may only contain ASCII letters. Underscores are not permitted.
When a variable name consists of more than one word, the first word must be in lower case, and the first letter of each additional word must be capitalized. This is commonly called "CamelCase" formatting.
Variable names should properly describe what the content of that variable is.
All variables are always defined in the top of their scope, a class or a function.
Example:
var NewClass = new function() {
    var private = 0;
    this.public = {};
    var privateFunction = function() {
    };
};
Constants
All letters used in a constant name must be capitalized, while all words in a constant name must  not be separated, only ASCII letters are to be used. This is to keep constants from overwriting functions or classes.
All variables in the global scope that are not functions or classes are to be considered constants, and are never to be used unless no other solution can be found. In almost all cases public variables inside a class can be used instead.
Example:
const STRINGOFHOWOFTENTOUSE = 'Never';
Code markup
Strings
Strings delimiters are preferred to be single quotes over double quotes.
Multi line strings are always chained together by encasing each line in single quotes and prepending a plus for all lines except the first. One block encased in single quotes with breaks to indicated newline are not allowed.
Example:
example = 'This is an examples of'
    + 'how strings should'
    + 'be composed in'
    + 'proper format.';
Arrays and objects (Includes JSON)
Every array or object starts and ends on separate lines, every data entry is written between these on separate lines and indented.
The commas for each entry is written before the data entry, except on the first line where no comma is written.
Any manually written arrays or objects, must have all strings encased in double quotes and other variable types written without any form of quotation.
Example:
newArray = [
    "Item"
    , 1
    , true
    , []
];
 
newObject = {
    "items": "Item"
    , "integer": 1
    , "boolean": true
    , "object": {}
};
Definition of classes/functions
Every class/function starts and ends on separate lines, everything contained in them is written on separate lines and indented according to the statements level and rules applying to the statement.
A class/function start point always contains the variable it is attached to, a parenthesis that is either blank or containing parameters and the start bracket.
The brace should always be written on the same line as the class name with a single space before. Any space between the class name and the opening parenthesis of the argument list is not permitted.
A class/function end point must contain an end bracket and a semicolon to make sure the code has a breakpoint.
All variables in the variable field are written up against the parenthesis, in case of several variables they are all separated with a comma and a space with the last and first variable up against the parenthesis.
Any use of variables must be manually checked, as Javascript does not provide this feature and the possibility of breaking the script arises.
Use of a large number of variables is not allowed, as it will cause confusion and clutter, instead utilize an object containing the variables.
Always check variables before using them, if using an unset variable it can lead to a silent error that is incredibly hard to locate.
Example:
var NewClass = new function() {
    var privateFunction = function(objDetails) {
        var intUserId = objDetails['intUserId'];
        if(typeof intUserId === 'number') {
            this.publicFunction();
        };
    };
    this.publicFunction = function() {
    };
};
Use of classes/functions
Use of generic functions that uses the “start” and “end” bracket are always written on separate lines, with any statements inside indented after their set rules and on separate lines. This also includes if statements, NO single line if() statements are allowed.
All variables in the variable field are written up against the parenthesis, in case of several variables they are all separated with a comma and a space with the last and first variable up against the parenthesis.
Example:
NewClass.publicFunction(newString, newInteger, newArray);
if(newArray[0]) {
    demoIfFunction(newString);
} else {
    demoElseFunction(newInteger);
};
Semicolon and parenthesis
Always use semicolon to end every block or line of code.
Never use parenthesis, if they are not necessary.
Example:
var NewClass = new function() {
    var privateFunction = function() {
    };
    this.publicFunction = function() {
    };
};
General coding guidelines
Don’ts
Don’t under any circumstances use any sort of browser detection to base any coding decisions upon. Instead, checking if a function is there or not can be used and then used accordingly.
Don’t use this outside of classes, if you are looking for a way to send a source element to a function, look up event and learn how to use it.
Don’t use non-standard Javascript features under any circumstances, the single exception is if there is no other way to do it, and then only to make a polyfil to fix missing functionality.
Don’t use any framework that has not been explicitly allowed in this document, with the exception of Vanilla JS.
Don’t ever use i++ to increment, always use i += 1, it makes changing it easier and prevents a very nasty forever loop bug some Javascript implementations have.
Don’t use regex for every single search, indexOf/lastIndexOf and substr can be used in most cases and does the job a lot faster.
Don’t under any circumstances use eval(), not even to parse JSON.
Don’t under any circumstances construct functions inside blocks.
Don’t under any circumstances change the style attribute of elements, use classes instead, rare exceptions can be used when doing iterating changes.
Do’s
Do use null to empty variables that does not have a specific function for doing so already.
Do use classes as often as possible to reduce the risk of overwriting other variables and causing more chaos than necessary in the global scope.
Do use objects instead of multiple if() statements, they make it easier to get an overview and they are a lot faster.
Do always remove any alert() and console.log() statements, once you are done using them.
Do use triple equals (===) whenever possible, as it ensures better statement accuracy.
Do use setTimeout('newFunction();', 1000); correctly, with functions always encased as a string, to avoid error.
Correct use of loops
For
For has a double functionality to accommodate objects and arrays and are most effective if used properly.
The “incremental for” loop is used to iterate arrays or other numbered data points and is the fastest loop, so when at all possible, utilize this loop type.
The “for in” loop is used to iterate over objects and is very effective and easy to use with objects or object like data, like column names in a database array.
While
While is only to be used with true/false statements, where a loop is need to run until a certain action happens and the variable is set to false to stop the loop from running.
Data handling
Any asynchronous data handling will always be handled with properly formatted JSON or XML data structures, not pure HTML or other bandwidth waste.
Data should always be handled with templates, that is either hidden or visible on page, never by writing HTML in the Javascript.
Exceptions to these rules might apply, but only in cases where there are no way to adhere to the set rules.