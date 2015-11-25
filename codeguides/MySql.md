# MySQL best practice
First things first, [the official way](https://dev.mysql.com/doc/refman/5.6/en/what-is-mysql.html) to pronounce “MySQL” is “My Ess Que Ell” (not “my sequel”).

Tables and databases should always be using character encoding UTF-8, the preferred type is utf8_unicode_ci or utf8_bin.

## Naming conventions
Any naming in MySQL may only contain ASCII letters.
Any naming in MySQL should always be written in variable camelcase.
Any naming in MySQL should sufficiently describe what the table/column contains.

**Columns:**
All column types should be set to their default value.
If no negative values are needed, always set the number column to unsigned.
Always use not null.

*Column types:*
* Strings: Use any type with "text" or "blob" in the name and varchar, but use these sparingly as they make tables slower and hard to recover.
* Numbers: Use any type with "int" in the name or use decimal, float and double, these are special as they are represented by their byte size, so they are easy to recover and tables with just these are incredibly fast.
* Special: Char is a very special little fellow, it has the same benefit of numbers, but is in fact a string. However you ALWAYS have to set it's size and it can never exceed this size, this also makes it fast to index.
For all of these, the same rule applies, always strive to pick the smallest possible (but make sure it is future proof), as this will speed things up a lot.

Converting IP addresses to their integer representation and saving it as such, instead of a string will also speed up things a lot.

**Indexes:**
Always consider indexes carefully and don't make indexes that you can justify the existence of.
Multiple combination indexes should be avoided, unless they serve a very specific purpose.

## Optimizing
**Tables:**
* Use EXPLAIN on test queries to see if any indexes or other settings are misbehaving.
* Use PROCEDURE ANALYSE() to analyse table columns and get column type suggestions.
* Sanitize tables for unused or garbage data periodically, so performance will always be at it's highest.
* Choose the correct storage engine for the job, InnoDB for high activity smaller databases and MyISAM for larger ones that is mostly just read from.
* Always have an id field, except in the rare cases like reference tables that already have a unique id.

**Queries:**
* Use LIMIT if you only need a select amount of data, it will speed up queries.
* WHERE clauses are run procedurally, so using your clauses in the most limiting to the least, will also make faster queries.
* Always consider joins if you get the same number of rows from different tables instead of multiple queries.
* Only use joins with related foreign keys, otherwise it can have unforeseen effects.
* Never use SELECT *, this includes the use of COUNT() and other functionality, only select the columns you need.
* Strive to make tables that get searched a lot, to only contain numbered data, as this will make the table static and will increase performance extremely.
* Always utilize vertical partitioning. This means that rarely used or unused data points can be saved in separate tables, for example country specific data or other lists.
* Always split up large queries. This will put less strain on the server and also make the data easier to handle.
* Be mindful of open or persistent connections.
* All searches done with numeral values is done with operators "<, = and >".
* All searches done with string values is done with the LIKE or other text specific searches.

**Caching:**
Always make sure to make use of a MySQL driver that supports caching queries, and use vertical partitioning, so the queries are actually cacheable.

**Uncachable functions:**
Make sure to look these [functions](https://dev.mysql.com/doc/refman/5.7/en/query-cache-operation.html) up as this can cause your queries to become uncached and therefore slow.

## Storage engines
Always pick the storage engine that is right for the job.
**InnoDB:** Faster INSERT, slower SELECT
Read/write Lock: Row
Storage Limit: 64TB
Has: MVCC, clustered indexes, transactions, data caches, foreign key support

**MyISAM:** Faster SELECT, slower INSERT
Read/write lock: Table
Storage Limit: 256TB
Has: Geospatial indexing, full-text search
