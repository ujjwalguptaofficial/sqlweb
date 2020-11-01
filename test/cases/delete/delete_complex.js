describe('Test delete complex case', function () {
    it('delete with multiple or', function (done) {

        var count;
        con.$sql.run("count from Customers where Country='Mexico' || (City='Madrid' || Address like '%a%')").
        then(function (results) {
            count = results;
        }).catch(function (err) {
            done(err);
        })

        con.$sql.run("Delete from Customers where Country='Mexico' || (City='Madrid' || Address like '%a%')").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it("sql - SELECT * FROM Customers WHERE Country='Mexico' and (City='London' or Address like '%a%')", function (done) {

        var count;

        con.$sql.run("count * from Customers where Country='Mexico' && (City='London' || Address like '%a%') ").
        then(function (results) {
            count = results;
        }).catch(function (err) {
            done(err);
        })


        con.$sql.run("delete from Customers where Country='Mexico' && (City='London' || Address like '%a%') ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it("sql - SELECT * FROM Customers WHERE Country='Mexico' or (City='London' and Address like '%a%')", function (done) {

        var count;
        con.$sql.run("count from Customers where Country='Mexico' || (City='London' && Address like '%a%') ").
        then(function (results) {
            count = results;
        }).catch(function (err) {
            done(err);
        })

        con.$sql.run("Delete from Customers where Country='Mexico' || (City='London' && Address like '%a%') ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).catch(function (err) {
            done(err);
        })
    });
});