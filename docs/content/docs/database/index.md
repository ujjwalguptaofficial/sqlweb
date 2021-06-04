Creating database is consists of two process - 
* Defining Db
* Defining tables

**Define Db** - 
```
DEFINE DB databaseName; 
```
or
```
DEFINE DATABASE databaseName;
```

e.g - lets say our database name is - 'dbDemo', then the query will be : 

```
DEFINE DB dbDemo;
```

**Define Table** - 
```
DEFINE TABLE tableName (
   column1 datatype,
   column2 datatype,
   . . . .
)
```
e.g - 

```
DEFINE TABLE Persons (
    PersonID NUMBER AUTOINCREMENT,
    LastName STRING,
    FirstName STRING NOTNULL,
    Address STRING,
    City STRING 
);
```

Please check [column wiki](https://github.com/ujjwalguptaofficial/sqlweb/wiki/Column) for more column options