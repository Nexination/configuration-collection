Documentation
Always remember to update or add database changes to the wiki, so a full picture can be gained from this site, instead of having to spend hours looking through data and files.
Table and database settings
Tables and databases should always be using character encoding UTF-8, the preferred type is utf8_unicode_ci or utf8_bin.
Naming conventions
Any naming in MySQL may only contain lower case ASCII letters.
Any naming in MySQL should always be written in variable camelcase.
Any naming in MySQL should sufficiently describe what the table/column contains.
Tables
Tables must always be prefixed with the project it is a part of, like seec_.
Columns
Columns that contains foreign keys must always be suffixed with _fk.
Column settings
If a column type is not explicitly defined here, then it is by default not allowed.
All column types should be set to their default maximum allowed value.
If no negative values are needed, always set the number column to unsigned.
Always use not null.
Integers/decimals
http://dev.mysql.com/doc/refman/5.7/en/numeric-type-overview.html
Strings
http://dev.mysql.com/doc/refman/5.7/en/string-type-overview.html
Indexes
Always consider indexes carefully and don't make indexes that you can justify the existence of.
Multiple combination indexes are not allowed, unless they serve a very specific purpose.
Optimizing MySQL
Tables
Use EXPLAIN on test queries to see if any indexes or other settings are misbehaving.
Use PROCEDURE ANALYSE() to analyse table columns and get column type suggestions.
Sanitize tables for unused or garbage data periodically, so performance will always be at it's highest.
Choose the correct storage engine for the job, InnoDB for high activity smaller databases and MyISAM for larger ones that is mostly just read from.
Always have an id field, except in the rare cases like reference tables that already have a unique id.
Queries
Use LIMIT if you only need a select amount of data, it will speed up queries.
Always consider joins if you get the same number of rows from different tables instead of multiple queries.
Only use joins with related foreign keys, otherwise it can have unforeseen effects.
Never use SELECT *, this includes the use of COUNT() and other functionality, only select the columns you need.
Strive to make tables that get searched a lot, to only contain numbered data, as this will make the table static and will increase performance extremely.
Always utilize vertical partitioning. This means that rarely used or unused data points can be saved in separate tables, for example country specific data or other lists.
Always split up large queries. This will put less strain on the server and also make the data easier to handle.
Be mindful of open or persistent connections.
All searches done with numeral values is done with operators "<, = and >".
All searches done with string values is done with the LIKE or other text specific searches.
Banned MySQL functions
The following functions are banned, due to their ability to disable caching of statements.
BENCHMARK()
CONNECTION_ID()
CONVERT_TZ()
CURDATE()
CURRENT_DATE()
CURRENT_TIME()
CURRENT_TIMESTAMP()
CURTIME()
DATABASE()
ENCRYPT()
FOUND_ROWS()
GET_LOCK()
LAST_INSERT_ID()
LOAD_FILE()
MASTER_POS_WAIT()
NOW()
RAND()
RELEASE_LOCK()
SLEEP()
SYSDATE()
UNIX_TIMESTAMP()
USER()
UUID()
UUID_SHORT()

