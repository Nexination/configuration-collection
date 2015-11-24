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
Naming conventions
Names can only contain letters from the basic ASCII character set.
All naming must follow the CamelCase naming convention. Specifically this means that the first letter of each new word must be capitalized and spaces left out. Successive capitalized letters are not allowed.
Following this convention "Better Collective ApS" should be written as BetterColletiveAps.
File naming
For file names underscores and dashes are also permitted, but discouraged. Spaces are strictly prohibited.
Any file that contains PHP code must end with the extension .php. It is good practice to name files according to their function, e.g. Controller.class.php or Header.inc.php.
When making radical change to a file (without version control) it is good practice to save a copy of the file with the current date between the file name and the extension, as shown in the example below, to have it as backup.
The following example shows an acceptable hierachy of files:
Pdf.class.php
Pdf/Handler.class.php
Pdf/Handler/Load.class.php
Pdf/Render.class.php
Pdf/Render.class.2013-01-16.php
Pdf/Render/Images.class.php


Namespace naming
Namespaces must map directly to directories, i.e. any class must define itself in a namespace of the same name as the directory it's in. Any class in a sub-directory must define itself in a sub-namespace of the same name, using backslashes (\) as separators.
In the file hierarchy described above Pdf.class.php would be in the global namespace (i.e. no namespace is defined), and both Pdf/Handler.class.php and Pdf/Render.class.php must be in the namespace Pdf.
In the same way Pdf/Handler/Load.class.php must be in the sub-namespace Pdf\Handler and Pdf/Render/Image.class.php must be in the sub-namespace Pdf\Render.
Class naming
Classes should have the same name as the file they are in.
In the file hierarchy described above Pdf.class.php should contain a class named Pdf and Pdf/Handler/Load.class.php should contain a class named Load.
Function and method naming
Function names must always start with a lowercase letter.
For methods on objects that are declared with limited visibility, using the private or protected modifier, the first character of the method name must be an underscore. This is the only acceptable application of an underscore in a method name. Methods declared public should never contain an underscore.
Verbosity is generally encouraged. Function names should be as verbose as is practical to fully describe their purpose and behavior.
These are examples of acceptable names for functions:
filterInput()
getElementById()
widgetFactory()


For object-oriented programming, accessors for static or instance variables should always be prefixed with "get" or "set". In implementing design patterns, such as the singleton or factory patterns, the name of the method should contain the pattern name where practical to more thoroughly describe behavior.
Functions in the global scope (a.k.a floating functions) are permitted but discouraged in most cases. Consider wrapping these functions in a static class.
Variable naming
Variables follow the same naming conventions as functions for capitalisation, visibility, and verbosity.
Variables should contain their type as the first part of the name, e.g. $blnBoolean, $intInteger, $strString, $arrArray, $objObject and $mixMixed.
Simple and non-descripting variable names such as $i and $n are discouraged, except for counters in the smallest loop contexts. If a loop contains more than 10 lines of code, the counter variables should have more descriptive names.
Constant naming
All letters used in a constant name must be capitalized and all words in a constant name must be separated by underscore characters.
For example, EMBED_SUPPRESS_EMBED_EXCEPTION is permitted but EMBED_SUPPRESSEMBEDEXCEPTION is not.
Constants must be defined as class members with the const modifier. Defining constants in the global scope with the define function is permitted but strongly discouraged.
Documentation
Inline documentation
Documentation Format
All code must be documented using the PhpDoc documentation block-comment notation.
All documentation blocks (DocBlocks) must be compatible with the format supported by PhpDocumentor (and preferably only using the subset supported by Doxygen [1] [2]).
Allowed tags
Adapted from http://en.wikipedia.org/wiki/PhpDoc#Tags and http://manual.phpdoc.org ... basic.tags.
Tags are single words prefixed by a @ symbol. Tags inform parsers how to present information and modify display of documentation as well as allow IDEs to define variable types. All tags are optional, but if you use a tag, they do have specific requirements to parse properly:
Tag
Parameter
Description
@author
author name <author@email>
The author of the current element.
@deprecated
version
The version in which the element was deprecated.
@global
type $globalvarname
A global variable or its use in a function or method.
@param
type $varname description
An input parameter for a function or method.
@return
type description
The return value from a function or method.
@see
element
An association to any element (global variable, include, page, class, method, function, define, variable).
@since
version
The version where this element was first added. By the version convention, this is the samea as the date.
@static


A static class, method, or function.
@staticvar
type
A static variable.
@throws
ExceptionType
An exception thrown by a method.
@todo
comment
Things that need to be done to the code at a later date.
@var
type $varname
The data type for a class variable
@version
version
The current version of a class, method, or function. Should be the current date in yyyy-mm-dd format.
Unused tags
Only the above tags should ever be used. This list serves to clarify why some other tags are not used:
@abstract
Abstract elements are only very rarely used, so this would just confuse.
@access, @ignore, @internal
Prevents some generation of the elements documentation. As our documentation is not for anyone else, nothing should be hidden.
@changed
Keeping track of who made a change and when should be redundant when using source and version control.
@copyright
We only document our own code, and we have copyright on all of it. This would just hold out-dated, redundant data.
@deprec, @exception
Less good aliases for other tags in the list above.
@package, @subpackage
Namespaces are used for grouping of related functionality.

Allowed data types
The type for the tags can be one of the following allowed data types
Data type
Description
bool
A boolean value of either true or false.
int
A whole number or integer.
float
A floating point, continuous, or real, number.
string
A string of binary characters.
void
Only used when defining the return type of a method or function.
This type does not contain a value and the user should not rely on any retrieved value.
object
Should only be used for instances of specific, complex classes.
The class name must be specified clearly in the description.
Multiple data types are specified by grouping them using pipe (|) characters:
@param datatype1|datatype2 $paramName description of this parameter
Arrays can not be specified as the datatype. This should be done using the basic data types described above. This way the structure of the array can be explained in a simple and fairly detailed way.
An array is specified by its return type followed by its index data type in brackets ([]). If there are multiple dimensions in the array, the brackets are followed by the index type of the next level, in brackets:
Data type
Example of literal array
string[int]
array('AA', 'BB');
string[int]
array(
    0   => 'AA'
    , 1 => 'BB'
);
string[string]
array(
    'a'   => 'AA'
    , 'b' => 'BB'
);
object[int]
array(new SomeClass());
float[string][int]
array(
    'a'   => array(1.0, 0.0)
    , 'b' => array(0.0, 1.0)
);
Complex arrays, that has multiple data types in one or more levels, are specified by grouping the possible data types inside parentheses (()):
Data type
Example of literal array
(int|float|string)[int]
array(1, 2.0, 'three');
float[(int|string)]
array(
    1       => 1.0
    , 'two' => 2.0
);
(int|float|string)[string][(int|string)]
array(
    'a'   => array(1, 'two')
    , 'b' => array(
        'three' => 3.0
    )
);
File documentation
All files that contains PHP code must contain a page-level DocBlock at the top. This must be the very first thing right after the first opening PHP tag. Any namespace declarations and use statements must follow after it.
The relevant tags are: @author, @deprecated, @see, @since, @todo, @version
Example of a minimal DocBlock:
<?php
/**
 * Short description for the file
 *
 * Long description for the file (if any)...
 *
 * @author Java Script <java@bettercollective.com>
 * @since 2012-08-05
 */
namespace MyNamespace;
Class documentation
All classes must have a DocBlock immediately before the class declaration.
The relevant tags are: @author, @deprecated, @see, @since, @todo, @version
Example of a minimal DocBlock:
/**
 * Short description for the class
 *
 * Long description for the class (if any)...
 *
 * @author Java Script <java@bettercollective.com>
 * @since 2012-08-05
 */
class MyClass {
Function and method documentation
All functions must have a DocBlock immediately before the function declaration.
If a function does not return any values, the @return tag is not required, but still recommended. In this case it should be used with a void return type.
The relevant tags are: @author, @deprecated, $param, @return, @see, @since, @$throws, @todo, @version
Example of a DocBlock:
/**
 * Short description for the function
 *
 * Long description for the function (if any)...
 *
 * @author Ruby Python <ruby@bettercollective.com>
 * @since 2012-11-23
 * @version 2013-01-16
 *
 * @throws MyRuntimeException
 *
 * @param string $strMyString Description of what the string is or does
 * @param bool[string] $arrMyOptions An array of settings indexed by the option names
 *
 * @return float The result of all the fancy calculations in the function
 */
function myFunction($strMyString, $arrMyOptions) {
Specific dos and don'ts
DO!
Keep special values (i.e. the constants null, true and false) in lowercase.
Write simple code! Complex code isn't clever, but it's very good at hiding bugs and other problems.
Give every assignment its own line, so it feels special, is not overlooked and does its job correctly (e.g. $d = ($a = $b + $c) is more than bad).
Make constructors stupid. They are made for constructing stuff, not doing real logic. Create class methods to do so.
Document EVERYTHING.
DON'T!
Use regular expressions (regex). Ever! You don't know how to use them, and will do more bad than good. It's true, you don't. No really, you don't. No!
For parsing HTML, use DOMDocument] and interact with the elements using either the related DOM functions (e.g. getElementById()) or DOMXPath and query using xpath expressions.
For validating dates, try to convert it to unix-time, i.e. using strtotime()
For validating/sanitising emails, IPs, URLs, and numerical ranges use filter_var() (i.e. http://php.net/manual/en/filter.examples.validation.php)
Use eval(), extract() or goto. Ever!
Use global variables for anything, except absolutely necessary instantiations of classes.
Common pitfalls
Understand and read the documentation for isset() and empty(). Use them only when appropriate.
empty() is inverted conversion to boolean with error suppression. Only use it when you really want to suppress errors. Otherwise just use the negation operator (!). Do not use it to test if an array is empty, unless you simultaneously want to check if the variable is unset.
Do not use isset() to test for null. Using isset() in this situation could introduce errors by hiding mis-spelled variable names. Instead, use $var === null
Study the rules for conversion to boolean. Be careful when converting strings to boolean.
Be careful with double-equals comparison operators. Triple-equals is often more intuitive.
'foo' == 0 is true
'000' == '0' is true
'000' === '0' is false
To check if two scalars that are supposed to be numeric are equal, use equality comparators (e.g. ==), e.g. (5 == '5') is true.
To check if two variables are both of type 'string' and are the same sequence of characters, use identity comparators (e.g. ===), e.g. ('1.e6' === '1.0e6') is false.
To check if two scalars that should be treated as strings are equal as strings, use strcmp(), e.g. strcmp(13, '13') is 0.
Array plus does not renumber the keys of numerically-indexed arrays, so array('a') + array('b') === array('a'). If you want keys to be renumbered, use array_merge(): array_merge(array('a'), array('b')) == array('a', 'b')
Make sure you have error_reporting set to E_ALL | E_STRICT for PHP 5. This will notify you of undefined variables and other subtle gotchas that stock PHP will ignore.
The goto syntax introduced in 5.3 is strictly prohibited. PHP may have introduced the feature, but that does not mean we should use it.
Coding style
PHP code demarcation
PHP code must always be delimited by the full-form, standard PHP tags:
<?php
 
?>
Short tags are never allowed.
For files that contain only PHP code, the closing tag (?>) is never permitted. It is not required by PHP, and omitting it prevents the accidental injection of trailing white space into the response.
Strings
String must always be demarcated using single-quoted (') string literals:
$strTest = 'Example String';
Strings containing apostrophes
When a string contains more than a couple of apostrophes, it is permitted to demarcate the string with double-quotes (") if it enhances readability significantly over escaping the single-quotes.
This is especially useful for SQL statements:
$strSql = "SELECT `id`, `name` FROM `people`"
        . " WHERE `name`='Fred' OR `name`='Susan'";
Linebreaks
Linebreaks are not allowed in strings.
$strMultiline = '<div>
    This is a totally cool string that spans more than one line!
</div>';
If it is absolutely needed to have a linebreak inside a string use concatenation and the PHP End-of-line constant:
$strMultiline = '<div>' . PHP_EOL
              . '    This is a completely correct string that spans more than one line!' . PHP_EOL
              . '</div>';
This inserts the linebreak used on the platform on which PHP is running, ensuring consistensy no matter
Inserting variables in strings
Variable substitution is strictly prohibited. This is also not possible when using single-quotes, so just skip to the next
$strMultipart = "Welcome back, $strName!";
Variables must be inserted in strings by concatenating using the dot (.) operator. A space must always be added before and after the dot operator to improve readability:
$strMultipart = 'Welcome back, ' . $strName . '!';
String concatenation
When concatenating strings with the dot (.) operator, it is encouraged to break the statement into multiple lines to improve readability. In these cases, each successive line should be padded with white space such that the dot operator is aligned under the assignment (=) operator:
$strSql = "SELECT `id`, `name` FROM `people`"
        . " WHERE `name`='Fred' OR `name`='Susan'"
        . " ORDER BY `name` ASC;";
Arrays
Numerically indexed arrays
Negative numbers are not permitted as indexes.
An indexed array may start with any non-negative integer, however all base indexes besides 0 are discouraged. One of the few examples of a place to use a base index that is not 0 is for converting month number to month name:
$arrMonths = array(1 => 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec');
$strMonth = $arrMonths[$intMonthNumber];
When declaring numerically indexed arrays using the array() construct, a trailing space must be added after each comma delimiter to improve readability:
$arrSample = array(1, 2, 3, 'Better', 'Collective');
It is permitted to declare multi-line arrays using the array() construct. In this case, the items should start on the line after the array decleration, and should be padded at one indentation level greater than the line containing the array declaration. The closing parenthesis should be on a line by itself at the same indentation level as the line containing the array declaration.
In this case, it is encouraged to use leading commas for all items in the array, except the first; this minimizes the impact of adding new items on successive lines, and helps to ensure no parse errors occur due to a missing comma. Each line must then be padded with spaces such that the first values in each line are aligned:
$arrSample = array(
    1, 2, 3, 'Better', 'Collective'
    , $a, $b, $c
    , 56.44, $d, 500
);
Associative arrays
For associative arrays, the keys follow the Variable naming conventions and the String coding style.
When declaring associative arrays using the array() construct, breaking the statement into multiple lines is encouraged. All items should be on their own lines, and should be padded at one indentation level greater than the line containing the array declaration. The closing parenthesis should be on a line by itself at the same indentation level as the line containing the array declaration.
In this case, it is encouraged to use leading commas for all item in the array, except the first; this minimizes the impact of adding new items on successive lines, and helps to ensure no parse errors occur due to a missing comma. Each line must then be padded with spaces such that both the keys and the assignment (=>) operators are aligned:
$arrSample = array(
    'firstKey'    => 'firstValue'
    , 'secondKey' => 142
    , 'thirdKey'  => $a
    , 'fourthKey' => -545.34
);
Using arrays
Array items must always be indexed using the same datatype they were created with:
$arrSample = array('one', 'two', 'three');
$strSample = $arrSample['0'];
 
$arrSample = array(
    'one'     => 1
    , 'two'   => 2
    , 'three' => 3
);
$intSample = $arrSample[one];
$arrSample = array('one', 'two', 'three');
$strSample = $arrSample[0];
 
$arrSample = array(
    'one'     => 1
    , 'two'   => 2
    , 'three' => 3
);
$intSample = $arrSample['one'];
Checking if a specific index in the array exists, must be done using array_key_exists(), not isset()
Assignment expressions
All assignment expressions should be on their own line.
Using an assignment as a conditional expression or embedded assignments is surprising to the reader and looks like a comparison or an error. Do not write code like this:
$d = ($a = $b + $c);
 
if($a = foo()) {
    bar();
}
Space is cheap, and you're a fast typist, so instead use:
$a = $b + $c;
$d = $a;
 
$a = foo();
if($a) {
    bar();
}
Using assignments for iteration in a while() clause is strongly discouraged. Instead get a complete array of the dataset and use foreach() to iterate over it.
Control statements
Control statements must always be written using the braced syntax and on multiple lines, no matter how quick or simple they are:
keyword(statement) {
    // Content
}
There can never be any space between the keyword and the opening parenthesis of the following expression and there must be a single space after the closing parenthesis.
Subsequent keywords must be placed on new lines, no matter if they are related (e.g. if and else) or not (e.g. switch and while, or an else and a new if). If they are not related an extra, blank line is encouraged.
In conditional expressions comparing a variable to a value, the value should be on the left side of the comparison operator. This helps to avoid the common mistake of typing an assignment operator:
// Gives an unexpected result
($intNumber = 2)
($strString = 'string')
 
// Fails
(2 = $intNumber)
('string' = $strString)
 
// No problems
(2 == $intNumber)
('string' == $strString)
Execution modifiers
Three language constructs can be used to change the execution flow of control statements.
Break
break ends execution of the current for, foreach, while, do-while or switch structure.
break accepts an optional numeric argument which tells it how many nested enclosing structures are to be broken out of.
Continue
continue is used within looping structures to skip the rest of the current loop iteration or switch statement and continue execution at the condition evaluation and then the beginning of the next iteration.
continue accepts an optional numeric argument which tells it how many levels of enclosing loops it should skip to the end of. The default value is 1, thus skipping to the end of the current loop.
Return
return immediately ends execution of the current function, and returns its argument as the value of the function call.
If called from the global scope, then execution of the current script file is ended. If the current script file was included, then control is passed back to the calling file.
If, else if, else
Within the conditional statements between the parentheses, operators must be separated by spaces for readability. Inner parentheses are encouraged to improve logical grouping for larger conditional expressions.
The opening brace is written on the same line as the conditional statement. The closing brace is always written on its own line. Any content within the braces must be indented one level more than the control statement.
if(2 != $intNumber) {
    $intNumber = 2;
}
If the conditional statement causes the line length to exceed the maximum line length and has several clauses, you may break the conditional into multiple lines.
In such a case, break the line prior to a logic operator, and pad the line such that it aligns under the first character of the conditional clause. The closing parenthesis in the conditional will then be placed on a line with the opening brace, with one space separating the two, at an indentation level equivalent to the opening control statement.
if(($intNumber == $intOtherNumber)
    && (3 == $intOtherNumber)
    || (12 == $intHighestNumber)
) {
    $intNumber = $intHighestNumber;
}
The intention of this declaration format is to prevent issues when adding or removing clauses from the conditional during later revisions. For conditional statements that include else if or else, the formatting conventions are similar to the if construct. The following examples demonstrate proper formatting for conditional statements with else and else if constructs:
if(2 != $intNumber) {
    $intNumber = 2;
}
else {
    $intNumber = 7;
}
 
if(2 != $intNumber) {
    $intNumber = 2;
}
else if(3 == $intNumber) {
    $intNumber = 4;
}
else {
    $intNumber = 7;
}
Ternary operator
The ternary operator should only be used if the expressions are very short and obvious:
$intNumber = (2 != $intNumber) ? 2 : 7;
If a ternary operator has an conditional expression comprised of more than one part or logic in any of the results, it must be written as an if statement.
For readability and compatibility reasons, the shorthand ternary operator (?:) is not allowed. Instead an if statement should be used.
Switch
All content within the switch statement must be indented one level more than the opening statement.
Content under each case statement must be indented using an additional level.
There should be a blank line after each case block.
The construct default should never be omitted from a switch statement.
switch($intPeople) {
    case 1:
        break;
 
    case 2:
        break;
 
    default:
        break;
}
Loops
For all loops in PHP the following is mandatory
Assignment expressions must be simple. All computation that can be done before the loop, must be done before the loop!
Comparison expressions can only contain one comparison operator and two values (either can only be a variable or a literal of a basic data type)
Increment expressions must be written using an updating assignment (e.g. $x += 1) not incrementing operators (e.g. $x++)
These are examples of the different loops doing the same thing in the right way:
$arrMonths= array(1 => 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec');
 
foreach($arrMonths as $intNumber => $strName) {
    echo 'Month number ' . $intNumber . ' is called "' . $strName . '"' . PHP_EOL;
}
 
 
for($i = 1, $intLength = (count($arrMonths) + 1); $i < $intLength; $i += 1) {
    echo 'Month number ' . $i . ' is called "' . $arrMonths[$i] . '"' . PHP_EOL;
}
 
 
$i = 1;
$intLength = count($arrMonths) + 1;
while($i < $intLength) {
    echo 'Month number ' . $i . ' is called "' . $arrMonths[$i] . '"' . PHP_EOL;
    $i += 1;
}
 
 
$i = 1;
$intLength = count($arrMonths) + 1;
do {
    echo 'Month number ' . $i . ' is called "' . $arrMonths[$i] . '"' . PHP_EOL;
    $i += 1;
}
while($i < $intLength);
Error handling
It is always recommended to find and solve a problem instead of suppressing it using the @ operator.
For better and more intelligent error handling, use PHP's exception system:
try {
    // Code that might fail
}
catch(SpecificException $objException) {
    echo 'Caught specific exception: ',  $objException->getMessage(), "\n";
}
catch(Exception $objException) {
    echo 'Caught exception: ',  $objException->getMessage(), "\n";
}
finally {
    // Code that will be executed after try and catch blocks, no matter what
}
Functions
Language constructs
PHP has a number of language constructs that work similarly to functions. You should never use parentheses around parameters for language constructs as it only takes a little longer to execute and makes it look like a function, i.e. if you do construct(expression) then you're not passing expression, but the result of the expression (expression) (which is, of course, the value of expression).
The permitted language constructs are:
echo echo
print print
break break
continue continue
return return
require_once require_once
instanceof instanceof


The following language constructs are also allowed, but discouraged. For the vast majority of uses, return is much better suited and less likely to break code completely. These also need parentheses if any parameters are passed:
die die()
exit exit()


Function declaration
As with Control statements, the brace should always be written on the same line as the class name with a single space before. Any space between the class name and the opening parenthesis of the argument list is not permitted.
The first and last line in the function should always be kept blank.
Functions in the global scope are strongly discouraged.
The following is an example of an acceptable function declaration in a class:
/**
 * Documentation Block Here
 */
function bar() {
 
    // all contents of the function must be indented one level more than the function declaration
 
}
Function parameters
Avoid passing huge numbers of parameters to functions. It quickly becomes impossible to remember the order of parameters, and you will inevitably end up having to hardcode all the defaults in callers just to customise a parameter at the end of the list. If you are tempted to code a function like this, you should pass an associative array of named parameters instead:
function setUserDetails($intUserId = 0, $strFirstName = '', $strLastName = '', $strAddress = '', $intBirthDate = 0) {
    // ...
}
function setUserDetails($arrDetails) {
    // Either just reference the array directly or the keys in their own variables.
    // Default values should be implemented by checking if the array index exists:
    if(!array_key_exists('intUserId', $arrDetails) {
        $arrDetails['intUserId'] = 0; // Default value
    }
 
    // ...
}
Using boolean parameters in functions is discouraged. It will easily get impossible to know what those parameters are meant to indicate, without looking up the documentation for the function:
$arrUserDetails = getUserDetails($intUserId, true, true, false);
Much better is to either use class constants, and make a generic flag parameter or to make your function accept an array of named parameters:
// Using predefined constants from the relevant class
$arrUserDetails = getUserDetails($intUserId, UserClass::FROM_DB | UserClass::PUBLIC_ONLY);
 
// Using an array, defining each true boolean by the presence of an item
$arrUserDetails = getUserDetails($intUserId, array('blnFromDb', 'blnPublicOnly'));
 
// Using an associative array, defining each boolean by the presence of a key and the related value
$arrUserDetails = getUserDetails($intUserId, array(
    'blnFromDb'       => false
    , 'blnPublicOnly' => true
));
Try not to repurpose variables over the course of a function, and avoid modifying the parameters passed to a function (unless they're passed by reference and that's the whole point of the function, obviously).
Function usage
Function arguments should be separated by comma (,) delimiters, followed by a single trailing. The following is an example of an acceptable invocation of a function that takes three arguments:
threeArguments(1, 2, 3);
In passing arrays as arguments to a function, it is recommended to have the array() construct before the function call:
$arrArguments = array(
    1, 2, 3, 'Better', 'Collective'
    , $a, $b, $c
    , 56.44, $d, 500
);
threeArguments($arrArguments, 2, 3);
If, for some reason this is not possible, it can be written directly in the function call, following the guidelines for writing arrays:
threeArguments(array(1, 2, 3), 2, 3);
 
threeArguments(array(
    1, 2, 3, 'Better', 'Collective'
    , $a, $b, $c
    , 56.44, $d, 500
), 2, 3);
 
threeArguments(array(
    'firstKey'    => 'firstValue'
    , 'secondKey' => 142
    , 'thirdKey'  => $a
    , 'fourthKey' => -545.34
), 2, 3);
Classes
Only one class is permitted in each PHP file.
Placing additional code in class files is permitted but strongly discouraged. In this case there must be a note in the top of the file explaining what extra code is in the file and why it has been placed there.
Any extra code must be marked with two blank lines and a line containing only the comment "// Bastard code:" to separate it from the class and make it easier to find and identify as code not belonging to the class.
Class declaration
Class declarations follow the conventions of function declarations, except that classes should always be in namespaces and not the global scope.
The following is an example of an acceptable class declaration:
/**
 * Documentation Block Here
 */
class ClassName {
 
    // all contents of the class must be indented one level more than the class declaration
 
}
Class methods
Methods are functions inside classes and follow the coding style for function declaration, parameters, and usage.
They must always declare their visibility by using one of the private, protected, or public modifiers.
There should be one blank line between methods.
Class member variables
Variables in classes or class methods should follow the coding style for variables.
They must always declare their visibility by using one of the private, protected, or public modifiers.

