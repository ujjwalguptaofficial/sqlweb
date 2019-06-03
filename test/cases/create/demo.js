describe('create demo database', function () {
    it('use isexist and then open/create db', function (done) {
        console.log('initiate database');
        con.runSql('isDbExist Demo').then(function (isExist) {
            console.log('db exist :' + isExist);
            if (isExist) {
                con.runSql('openDb Demo').then(function () {
                    console.log('Database opened');
                    done();
                });
            } else {
                var query = getDbSchema();
                con.runSql(query).then(function () {
                    console.log('Database created');
                    done();
                });
            }
        }).catch(function (err) {
            done(err);
        });
    });
});

// con.jsStoreCon_.isDbExist('Demo').then(function (exist) {
//     console.log('db exist :' + exist);
//     if (exist) {
//         con.jsStoreCon_.openDb('Demo').then(onDbInit);
//     } else {
//         con.jsStoreCon_.createDb(getDbSchema()).then(function () {
//             console.log('Database created');
//             onDbInit();
//         });
//     }
// }).catch(function (err) {
//     console.log(err);
//     //alert(err.Message);
// });
// }

function getDbSchema() {
    var query = `Define Db Demo;`;
    var tblQueryCustomer = `Define table Customers(
                            CustomerID primaryKey autoIncrement,
                            CustomerName notNull string,
                            ContactName notNull string,
                            Address notNull string,
                            City notNull string,
                            PostalCode string,
                            Country notNull string,
                            Email string disableSearch
                         )
                         `
    var tblQueryCategories = `Define table Categories(
        CategoryID primaryKey autoIncrement,
        CategoryName notNull string,
        Description notNull string
     )
     `
    var tblQueryEmployees = `Define table Employees(
        employeeId primaryKey autoIncrement,
        lastName notNull string,
        birthDate notNull DATE_TIME,
        photo notNull string,
        notes string,
        state NotNUll string,
        jobSuspendedFlag notNull NUMber
     )
     `

    var tblQueryOrderDetails = `Define table OrderDetails(
        OrderDetailID primaryKey autoIncrement,
        OrderID notNull number,
        ProductID notNull number,
        Quantity notNull number
     )
     `

    var tblQueryOrders = `Define table Orders(
        OrderID primaryKey,
        CustomerID notNull number,
        EmployeeID notNull number,
        OrderDate notNull string,
        ShipperID notNull number
     )
     `

    var tblQueryProducts = `Define table Products(
        ProductID primaryKey autoIncrement,
        ProductName notNull string,
        SupplierID notNull NUMBER,
        CategoryID notNull NUMBER,
        Unit notNull string,
        Price notNull NUMBER
     )
     `

    var tblQueryShippers = `Define table Shippers(
        ShipperID primaryKey autoIncrement,
        ShipperName notNull string,
        Phone notNull string
    )
     `

    var tblQuerySuppliers = `Define table Suppliers(
        SupplierID primaryKey autoIncrement,
        SupplierName notNull string,
        ContactName notNull string,
        Address notNull string,
        City notNull string,
        PostalCode notNull string,
        Country notNull string Default 'india',
        Phone notNull string
    )
     `

    return query + tblQueryCustomer + tblQueryCategories + tblQueryEmployees +
        tblQueryOrderDetails + tblQueryOrders + tblQueryProducts + tblQueryShippers +
        tblQuerySuppliers
}