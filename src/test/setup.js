var SqlJsObj = new SqlJs.Instance();
// JsStore.enableLog();

function initSqlJs() {
    console.log('initiate database');
    SqlJsObj = new SqlJs.Instance('Demo');
}

function getSchema() {
    var Database = "create database dbname = @dbName";
    var Customer = `create table Customer
                    (
                        CustomerID primarykey autoincrement,
                        CustomerName notnull string,
                        ContactName notnull string,
                        Address NotNull string,
                        City NotNull string,
                        PostalCode string,
                        Country string
                    )`;
    var Categories = `create table Categories
                    (
                        CategoryID primarykey autoincrement,
                        CategoryName notnull string,
                        Description notnull string
                    )`;
    var Employees = `create table Employees
                    (
                        EmployeeID primarykey autoincrement,
                        LastName notnull string,
                        BirthDate notnull string,
                        Photo NotNull string,
                        Notes NotNull string
                    )`;
    var OrderDetails = `create table OrderDetails
                    (
                        OrderDetailID primarykey autoincrement,
                        OrderID notnull number,
                        ProductID notnull number,
                        Quantity NotNull number
                    )`;

    var Orders = `create table Orders
                    (
                        OrderID primarykey,
                        CustomerID notnull number,
                        EmployeeID notnull number,
                        OrderDate NotNull string,
                        ShipperID NotNull number
                    )`;

    var Products = `create table Products
                    (
                        ProductID primarykey autoincrement,
                        ProductName notnull string,
                        SupplierID notnull number,
                        CategoryID NotNull number,
                        Unit NotNull string,
                        Price NotNull number
                    )`;
    var Shippers = `create table Shippers
                    (
                        ShipperID primarykey autoincrement,
                        ShipperName notnull string,
                        Phone notnull string
                    )`;
    var Suppliers = `create table Suppliers
                    (
                        SupplierID primarykey autoincrement,
                        SupplierName notnull string,
                        ContactName notnull string,
                        City NotNull string,
                        PostalCode NotNull string,
                        Country NotNull string,
                        Phone NotNull string
                    )`;
    var Qry = new SqlJs.Query(Database + Customer + Products + Categories + Employees + Orders + OrderDetails + Shippers + Suppliers);
    Qry.map("@dbName", "Demo");
    
}

window.__karma__.loaded = function () {};
window.onload = function () {
    initSqlJs();
    onDbInit();
}

function onDbInit() {
    console.log('mocha test starting');
    window.__karma__.start();
}