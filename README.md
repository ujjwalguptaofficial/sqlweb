[![Build Status](https://travis-ci.org/ujjwalguptaofficial/sqlweb.svg?branch=master)](https://travis-ci.org/ujjwalguptaofficial/sqlweb)
[![npm version](https://badge.fury.io/js/sqlweb.svg)](https://badge.fury.io/js/sqlweb)
[![](https://data.jsdelivr.com/v1/package/npm/sqlweb/badge)](https://www.jsdelivr.com/package/npm/sqlweb)

# SqlWeb

SqlWeb allows you to use sql query for performing database operation in IndexedDB.

## Important
SqlWeb uses jsstore to run the indexedb query. SqlWeb parse sql query in terms of jsstore and passes to jsstore for further execution.

### Example

```
var sqlCon = new SqlWeb.Instance('jsstore script path');

//insert into table customers
sqlCon.runQuery('insert into Customers ({id: 1,name:ujjwal})');

//select all customers
sqlCon.runQuery('select from Customers');

```

Please see examples folder for different tools support and real world example.