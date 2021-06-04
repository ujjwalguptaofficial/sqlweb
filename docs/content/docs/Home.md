SqlWeb is a plugin of [JsStore](http://jsstore.net/) which allows to use sql query for performing database operation in IndexedDB.

## Get Started

In this tutorial , we will learn how to do crud operation in sqlweb.

### How to use

Since sqlweb is an extension of jsstore, you need to install the jsstore first. We recommend to take a look at [get-started](http://jsstore.net/tutorial/get-started/) page of jsstore for having a clear idea of how jsstore works.

You can install sqlweb by different sources like github,npm,cdn. For more about installation check out the [installation](https://github.com/ujjwalguptaofficial/sqlweb/wiki/Installation) page.

In this tutorial we are going to use cdn.

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Crud Demo using sqlweb</title>
    <script src="jsstore.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sqlweb/dist/sqlweb.min.js"></script>
</head>

<body>
    <h4>We have included sqlweb script in this html code.</h4>
</body>

</html>
```

In above html code - you can see that i have included jsstore script with sqlweb.

### Creating Database  

```
function getDbSchema() {
    var dbQuery = "CREATE DB demo";
    var tblQuery = "CREATE TABLE Product(Id primaryKey autoIncrement,Name notNull string, Price notNull number,Quantity number notNull)";
    var query = dbQuery + tblQuery;
    return query;
}
```

Now we need to create the database in indexeddb. So, lets create the database.

```
var connection = new JsStore.Connection(new Worker('jsstore.worker.js'));

// add sqlweb 
connection.addPlugin(SqlWeb);

function initDb() {
     var dbQuery = getDbSchema();
    connection.$sql.run(dbQuery).then(function(isDbCreated) {
       console.log('db initiated');
    }).catch(function(err) {
        console.error(err);
    });
}
```
You can call initDb in onload your from somewhere where your app starts.

### Inserting data

```
connection.$sql.run("insert into Product({Name:'jeans',Price:2000,Quantity:1000})").then(function(rowsInserted) {
    if (rowsInserted > 0) {
        alert('successfully added');
    }
}).catch(function(err) {
    console.log(err);
    alert(err.message);
});
```

### Read data

```
connection.$sql.run("select from Product where Id=5").then(function(rowsInserted) {
    if (rowsInserted > 0) {
        alert('successfully added');
    }
}).catch(function(err) {
    console.log(err);
    alert(err.message);
});
```


### Updating data

```
connection.$sql.run("update Product set Quantity 2000 where Id=5").then(function(rowsInserted) {
    if (rowsInserted > 0) {
        alert('successfully added');
    }
}).catch(function(err) {
    console.log(err);
    alert(err.message);
});
``` 

### Delete data

```
connection.$sql.run("remove from Product where Id=5").then(function(rowsInserted) {
    if (rowsInserted > 0) {
        alert('successfully added');
    }
}).catch(function(err) {
    console.log(err);
    alert(err.message);
});
```


Hope you have understood this tutorial. You can check [examples](https://github.com/ujjwalguptaofficial/sqlweb/blob/master/examples/) folder for more examples.


## Contents

* [Installation](../Installation)
* [Create Database](../Create-Database)
* [Insert](../Insert)
* [Select](../Select)
* [Count](../Count)
* [Delete](../Delete)
* [Count](../Count)
* [Delete](../Delete)
* [Update](../Update)
* [Where](../Where)
* More can be found on wiki list.