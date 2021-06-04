A column has following options -

* AutoIncrement
* PrimaryKey
* Default
* NotNull
* DisableSearch
* DataType -  string,number,object,boolean,array,datetime

e.g -
```
DEFINE TABLE Person(
   Id PRIMARYKEY AUTOINCREMENT NUMBER,
   Name NOTNULL STRING,
   Address STRING,
   COUNTRY STRING DEFAULT 'India'
)
```
