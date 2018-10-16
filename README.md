[![Build Status](https://travis-ci.org/ujjwalguptaofficial/sqlweb.svg?branch=master)](https://travis-ci.org/ujjwalguptaofficial/sqlweb)
[![npm version](https://badge.fury.io/js/sqlweb.svg)](https://badge.fury.io/js/sqlweb)
[![](https://data.jsdelivr.com/v1/package/npm/sqlweb/badge)](https://www.jsdelivr.com/package/npm/sqlweb)

# SqlWeb

SqlWeb is an extension of [JsStore](http://jsstore.net/) which allows to use sql query for performing database operation in IndexedDB.

### Example

```
var con = new JsStore.Instance(new Worker('jsstore script path'));

//insert into table customers
con.runSql('insert into Customers ({id: 1,name:ujjwal})');

//select all customers
con.runSql('select from Customers');

```

Please see [examples](https://github.com/ujjwalguptaofficial/sqlweb/tree/master/examples) folder for different tools support and real world example.