[![Build Status](https://travis-ci.org/ujjwalguptaofficial/sqlweb.svg?branch=master)](https://travis-ci.org/ujjwalguptaofficial/sqlweb)
[![npm version](https://badge.fury.io/js/sqlweb.svg)](https://badge.fury.io/js/sqlweb)
[![](https://data.jsdelivr.com/v1/package/npm/sqlweb/badge)](https://www.jsdelivr.com/package/npm/sqlweb)

# SqlWeb

SqlWeb is an extension of [JsStore](http://jsstore.net/) which allows to use sql query for performing database operation in IndexedDB.

### Website

[https://github.com/ujjwalguptaofficial/sqlweb/wiki](https://github.com/ujjwalguptaofficial/sqlweb/wiki)

### Examples

```
var connection = new JsStore.Instance('jsstore worker path');
connection.runSql("select * from Customers").then(function(result) {
    console.log(result);
});
```
For a complete example - check out below link.

* [Using it in react](https://github.com/ujjwalguptaofficial/sqlweb/tree/master/examples/react)
* [Using it with typescript](https://github.com/ujjwalguptaofficial/sqlweb/tree/master/examples/typescript)
* [Using it with webpack](https://github.com/ujjwalguptaofficial/sqlweb/tree/master/examples/webpack)
* [Simple example without any framework](https://github.com/ujjwalguptaofficial/sqlweb/tree/master/examples/simple%20example)
