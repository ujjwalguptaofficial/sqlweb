describe('Test join', function () {

    it('inner join with where table', function (done) {
        con.runSql(`select from Customers inner join Orders on Orders.CustomerID=Customers.CustomerID where CustomerID<90`).
            then(function (results) {
                expect(results).to.be.an('array').length(194);
                done();
            }).catch(function (err) {
                done(err);
            })
    });

    it('inner join with where table', function (done) {
        con.runSql(`select from Customers inner join Orders on Orders.CustomerID=Customers.CustomerID where CustomerID<90 && Orders.CustomerID<80`).
            then(function (results) {
                expect(results).to.be.an('array').length(167);
                done();
            }).catch(function (err) {
                done(err);
            })
    });
});