SqlWeb supports two joins - Inner & Left.

## Join between two tables

```
select from Customers inner join Orders on Orders.CustomerID=Customers.CustomerID where CustomerID<90
```

## Join between three tables

```
select * from Orders join Customers on Orders.CustomerID=Customers.CustomerID inner join Shippers on Orders.ShipperID=Shippers.ShipperID
```