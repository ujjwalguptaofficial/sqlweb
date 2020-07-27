describe('Test bulkInsert', function () {
    it('insert OrderDetails', function (done) {
        $.getJSON("test/static/OrderDetails.json", function (results) {
            var qry = new SqlWeb.Query("insert into OrderDetails Values='@values'");
            qry.map("@values", results);
            con.runSql(qry).then(function (results) {
                expect(results).to.be.equal(518);
                done();
            }).
                catch(function (err) {
                    done(err);
                });
        });
    });

});