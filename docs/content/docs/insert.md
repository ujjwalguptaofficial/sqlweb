# Insert

```
insert into TABLE_NAME ({column1:value1,column2:value2,...});
```

e.g - 

```
INSERT INTO CUSTOMERS ("{ID:1,NAME:'Ramesh',AGE:32,ADDRESS:'Ahmedabad',SALARY:2000}");
```

## Get Inserted Record Value (Helpful when using autoIncrement & need inserted autoIncrement column value)

add option `return` in last of query

e.g -

```
INSERT INTO CUSTOMERS ("{ID:1,NAME:'Ramesh',AGE:32,ADDRESS:'Ahmedabad',SALARY:2000} return");
```

## Insert multiple records at once

```
var data = [{
        "ProductID": 1,
        "ProductName": "Chais",
        "SupplierID": 1,
        "CategoryID": 1,
        "Unit": "10 boxes x 20 bags",
        "Price": 18
    },
    {
        "ProductID": 2,
        "ProductName": "Chang",
        "SupplierID": 1,
        "CategoryID": 1,
        "Unit": "24 - 12 oz bottles",
        "Price": 19
    }
]

var qry = new SqlWeb.Query("insert into Products Values='@values'");
qry.map("@values", data);
await con.runSql(qry)

```

## Upsert

e.g -

```
INSERT INTO CUSTOMERS ("{ID:1,NAME:'Ramesh',AGE:32,ADDRESS:'Ahmedabad',SALARY:2000} upsert");
```