# PHP best practice

## Good to know about PHP
First things first, all PHP scripts start with a "<?php", no abbreviation of this or similar.
Normally people use a "?>" to end PHP, but it should be avoided, as it can only cause injection issues and is not needed.

### Common pitfalls
* Understand and read the documentation for isset() and empty(). Use them only when appropriate.
* empty() is inverted conversion to boolean with error suppression. Only use it when you really want to suppress errors. Otherwise just use the negation operator (!). Do not use it to test if an array is empty, unless you simultaneously want to check if the variable is unset.
* Do not use isset() to test for null. Using isset() in this situation could introduce errors by hiding mis-spelled variable names. Instead, use $var === null
* Study the rules for conversion to boolean. Be careful when converting strings to boolean.
* Be careful with double-equals comparison operators. Triple-equals is often more intuitive.
--* 'foo' == 0 is true
--* '000' == '0' is true
--* '000' === '0' is false
* To check if two scalars that are supposed to be numeric are equal, use equality comparators (e.g. ==), e.g. (5 == '5') is true.
* To check if two variables are both of type 'string' and are the same sequence of characters, use identity comparators (e.g. ===), e.g. ('1.e6' === '1.0e6') is false.
* To check if two scalars that should be treated as strings are equal as strings, use strcmp(), e.g. strcmp(13, '13') is 0.
* Array plus does not renumber the keys of numerically-indexed arrays, so array('a') + array('b') === array('a'). If you want keys to be renumbered, use array_merge(): array_merge(array('a'), array('b')) == array('a', 'b')
* Make sure you have error_reporting set to E_ALL | E_STRICT for PHP 5. This will notify you of undefined variables and other subtle gotchas that stock PHP will ignore.
* The goto syntax introduced in 5.3 is strictly prohibited. PHP may have introduced the feature, but that does not mean we should use it.

When a string contains more than a couple of apostrophes, it is permitted to demarcate the string with double-quotes (") if it enhances readability significantly over escaping the single-quotes.
This is especially useful for SQL statements:
```
$strSql = "SELECT `id`, `name` FROM `people`"
    . " WHERE `name`='Fred' OR `name`='Susan'";
```

If it is absolutely needed to have a linebreak inside a string use concatenation and the PHP End-of-line constant:
```
$multiline = '<div>' . PHP_EOL
    . 'This is a completely correct string that spans more than one line!' . PHP_EOL
    . '</div>';
```
This inserts the linebreak used on the platform on which PHP is running, ensuring consistensy no matter what.

## Guidelines to keep you out of trouble
### File formatting
You should aim to keep indentation to 2 spaces or 4 spaces, no tabs.
Your line termination and character encoding should always be LF(line feed, UNIX standard) and UTF8(Unicode).
Always use lowercase filenames, or they can be hard to keep track of and/or host on linux systems.

### Variables, constants, methods(functions), namespaces and classes
All of these follow camel case convention, first word in all small letters all subesquent words with a big starting letter, the rest small.
There are a few caveats to this though, classes and namespaces also start with a capital letter and constants are written in ALL capital letters to stand out.
Also all naming should make sense, so one should be able to read from a function or variable what it does (try not to shorten things).
To note, all letters have to be ASCII compatible.

**Variables and constants:**
*Constant:* NEWPHPCONSTANT
Use define() to define a constant, they are called without the need of a $.
These are constant and can not be changed, trying to change them will cause a crash/error.

*Variable:* newPhpVariable
$ is used to denominate all PHP variables, and also used to call them.

A quick overview of variable types:
* Integers - Should always be written without anything surrounding it
* Strings - Should always be written in single quotes
* Array - A type of object, that uses numeral indexes
* Functions
* Boolean - true/false

Whenever a string or array becomes really long, it can make sense to split it into several lines, using a nested tree structure:
```
// Old way of creating arrays
$newArray = array(
    "Item"
    , 1
    , true
    , []
);
// New way of creating arrays
$newArray = [
    "Item"
    , 1
];
// Creating an array with string indexes
$indexArray = [
    'firstKey'    => 'firstValue'
    , 'secondKey' => 142
];
// String example
$example = 'This is an examples of'
    . ' how strings should be composed'
    . ' in proper format.';
```
Whenever this method is used whatever is used to split up the statement should be a precursor on the lines.
In this case it is comma(,) and plus(+), it makes them a lot easier to copy and also easier to spot forgotten ones.

**Methods(functions), namespaces and classes:**
*Methods:* phpFunction
Functions are the base of all repetitive behaviour and look like this:
```
function phpFunction = function($newVariable) {
    return $newVariable;
};
```

Functions are also very good for storing loops, even though loops can also be used outside of functions.
```
foreach($array as $index => $indexValue) {
    $index;
    $indexValue;
};
for($i = 1, $length = (count($array) + 1); $i < $length; $i += 1) {
    $array[$i];
};
```
Loops can also be broken out of with break/continue, break stops the loop entirely and continue skips on to the next iteration.
It can even be used with a number argument, to do it out into parent loops.
There is also while and "do while" loops, but you will have to look those up.

*Classes:* PhpClass
Classes
Only one class is permitted in each PHP file.
Placing additional code in class files is permitted but strongly discouraged.
```
class ClassName {
    public $variable = 'string'
    protected $protected = 2;
    private function privateFunction() {
        $this->protected;
    }
    static function staticFunction() {
        
    }
};
$class = new ClassName();
```
Classes work together with namespaces or on their own, their real power lies in being able to inclued and instantiate a classe and use functionality saved within it.
It uses public/protected/private/static to define it's relationship to other classes and namespaces:
* Public - Is publicly visible and usable from everywhere
* Protected - Is usable within friendly namespaces
* Private - Is only usable by the class itself
* Static - Is callable even without instantiating the function

*Namespaces:* PhpNamespace/SubSpace
[Namespaces](http://php.net/manual/en/language.namespaces.php) are quite simple programming contructs that helps you compartmentalise your classes.

**Error handling:**
It is always recommended to find and solve a problem instead of suppressing it using the @ operator.
For better and more intelligent error handling, use PHP's exception system:
```
try {
    // Code that might fail
}
catch(SpecificException $exception) {
    $exception->getMessage();
}
catch(Exception $exception) {
    $exception->getMessage();
}
finally {
    // Code that will be executed after try and catch blocks, no matter what
}
```

## Do's and Don'ts
**Don'ts:**
* Use regular expressions (regex). Ever! You don't know how to use them, and will do more bad than good. It's true, you don't. No really, you don't. No!
* Use eval(), extract() or goto. Ever!
* Use global variables for anything, except absolutely necessary instantiations of classes.

**Do's:**
* Keep special values (i.e. the constants null, true and false) in lowercase.
* Write simple code! Complex code isn't clever, but it's very good at hiding bugs and other problems.
* Give every assignment its own line, so it feels special, is not overlooked and does its job correctly (e.g. $d = ($a = $b + $c) is more than bad).
* Make constructors stupid. They are made for constructing stuff, not doing real logic. Create class methods to do so.
* For parsing HTML, use DOMDocument and interact with the elements using either the related DOM functions (e.g. getElementById()) or DOMXPath and query using xpath expressions.
* For validating dates, try to convert it to unix-time, i.e. using strtotime()
* For validating/sanitising emails, IPs, URLs, and numerical ranges use filter_var() (i.e. http://php.net/manual/en/filter.examples.validation.php)
* Document EVERYTHING.