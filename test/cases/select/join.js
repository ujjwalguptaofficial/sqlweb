describe('Test join', function () {
    it('inner join', function (done) {
        con.runSql(`select Customers.CustomerName as name, Customers.ContactName as cName, Customers.CustomerID as cId from Orders join Customers on Orders.CustomerID=Customers.CustomerID`)
            .then(function (results) {
                expect(results).to.be.an('array').length(196);
                const firstValue = results[0];
                expect(firstValue).to.be.an('object').to.haveOwnProperty('name');
                expect(firstValue).to.be.an('object').to.haveOwnProperty('cName');
                expect(firstValue).to.be.an('object').to.haveOwnProperty('OrderID');
                expect(firstValue).to.be.an('object').to.haveOwnProperty('CustomerID');
                expect(firstValue).to.be.an('object').to.haveOwnProperty('EmployeeID');
                expect(firstValue).to.be.an('object').to.haveOwnProperty('cId');
                expect(firstValue).to.be.an('object').to.haveOwnProperty('ShipperID');
                expect(firstValue).to.be.an('object').to.haveOwnProperty('Address');
                expect(firstValue).to.be.an('object').to.haveOwnProperty('City');
                expect(firstValue).to.be.an('object').to.haveOwnProperty('PostalCode');
                expect(firstValue).to.be.an('object').to.haveOwnProperty('Country');
                done();
            }).catch(function (err) {
                done(err);
            })
    });

    it('inner join with reversed table', function (done) {
        con.runSql(`select from Customers inner join Orders on Orders.CustomerID=Customers.CustomerID`).
            then(function (results) {
                expect(results).to.be.an('array').length(196);
                done();
            }).catch(function (err) {
                done(err);
            })
    });

    it('left join', function (done) {

        con.runSql(`select * from Orders left join Customers on Orders.CustomerID=Customers.CustomerID`)
            .then(function (results) {
                expect(results).to.be.an('array').length(196);
                done();
            }).catch(function (err) {
                done(err);
            })
    });

    it('left join reverse', function (done) {
        con.runSql(`select from Customers left join Orders on Orders.CustomerID=Customers.CustomerID`)
            .then(function (results) {
                // console.table(results);
                expect(results).to.be.an('array').length(215);
                done();
            }).catch(function (err) {
                done(err);
            })
    });

    it('three table join', function (done) {
        con.runSql(`select * from Orders join Customers on Orders.CustomerID=Customers.CustomerID inner join Shippers on Orders.ShipperID=Shippers.ShipperID`).then(function (results) {
            expect(results).to.be.an('array').length(196);
            const result = results[0];
            expect(result.CustomerID).to.be.an('number');
            expect(result.OrderID).to.be.an('number');
            expect(result.ShipperID).to.be.an('number');
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('self join ', function (done) {
        con.runSql(`select Customers.CustomerName as name, Customers.ContactName as cName, Customers.CustomerID as cId, Customers.Address as address,Customers.PostalCode as postalCode, Customers.Country as country,Customers.Email as email  from Customers join Customers on Customers.City=Customers.City`).
            then(function (results) {
                expect(results).to.be.an('array').length(183);
                done();
            }).catch(function (err) {
                done(err);
            })
    });

    it('self join with where', function (done) {
        // con.select({
        //     from: "Customers",
        //     join: {
        //         with: "Customers",
        //         type: "inner",
        //         on: "Customers.City=Customers.City",
        //         as: {
        //             CustomerName: "name",
        //             ContactName: "cName",
        //             CustomerID: "cId",
        //             Address: "address",
        //             PostalCode: "postalCode",
        //             Country: "country",
        //             Email: "email"
        //         },
        //         where: {
        //             CustomerID: { '<': 90 }
        //         }
        //     }
        // })
        con.runSql(`select Customers.CustomerName as name, Customers.ContactName as cName, Customers.CustomerID as cId, Customers.Address as address,Customers.PostalCode as postalCode, Customers.Country as country,Customers.Email as email  from Customers join Customers on Customers.City=Customers.City where Customers.CustomerID<90`).
            then(function (results) {
                expect(results).to.be.an('array').length(177);
                done();
            }).catch(function (err) {
                done(err);
            })
    });
});