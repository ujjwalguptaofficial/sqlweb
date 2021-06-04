Distinct is used to return the unique set of result. Distinct filters the result for all columns together except Primary column, since Primary column will make the result always unique.

Syntax - 

```
select * from Customers where <conditions...> distinct
```

e.g - 
```
select * from Customers where City='NewYork' distinct 
```