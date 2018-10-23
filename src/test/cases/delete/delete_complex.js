describe('Test remove complex case', function () {
    it('remove with multiple or', function (done) {

        var count;
        con.runSql('count from Customers where Country=Mexico | (City=Madrid | Address like %a%)').
        then(function (results) {
            count = results;
        }).catch(function (err) {
            done(err);
        })

        con.runSql('Remove from Customers where Country=Mexico | (City=Madrid | Address like %a%)').
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it("sql - SELECT * FROM Customers WHERE Country='Mexico' and (City='London' or Address like '%a%')", function (done) {

        var count;

        con.runSql("count * from Customers where Country=Mexico & (City='London' | Address like %a%) ").
        then(function (results) {
            count = results;
        }).catch(function (err) {
            done(err);
        })


        con.runSql("delete from Customers where Country=Mexico & (City='London' | Address like %a%) ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it("sql - SELECT * FROM Customers WHERE Country='Mexico' or (City='London' and Address like '%a%')", function (done) {

        var count;
        con.runSql("count from Customers where Country=Mexico | (City='London' & Address like %a%) ").
        then(function (results) {
            count = results;
        }).catch(function (err) {
            done(err);
        })

        con.runSql("Delete from Customers where Country=Mexico | (City='London' & Address like %a%) ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).catch(function (err) {
            done(err);
        })
    });
});