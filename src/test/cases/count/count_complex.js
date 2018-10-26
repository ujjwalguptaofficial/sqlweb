describe('Test count complex case', function () {
    it('count with multiple or', function (done) {
        con.runSql('count from Customers where Country=Mexico || (City=Madrid || Address like %a%)').
        then(function (results) {
            expect(results).to.be.an('number').to.equal(73);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it("sql - SELECT * FROM Customers WHERE Country='Mexico' and (City='London' or Address like '%a%')", function (done) {
        con.runSql("count * from Customers where Country=Mexico && (City='London' || Address like %a%) ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(5);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it("sql - SELECT * FROM Customers WHERE Country='Mexico' or (City='London' and Address like '%a%')", function (done) {
        con.runSql("count * from Customers where Country=Mexico || (City='London' && Address like %a%) ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(9);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });
});