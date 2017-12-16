describe('Test insert', function () {
    it('insert customers using promise', function (done) {
        $.getJSON("static/Customers.json", function (results) {
            var Query = new SqlJs.Query('insert into Customers values=@values');
            Query.map('@values', results);
            SqlJsObj.run(Query).
            then(function (results) {
                expect(results).to.be.an('number').to.equal(93);
                done();
            }).
            catch(function (err) {
                done(err);
            })
        });
    });

    it('insert Orders using without promise', function (done) {
        $.getJSON("static/Orders.json", function (results) {
            var Query = new SqlJs.Query('insert into Orders values=@values');
            Query.map('@values', results);
            SqlJsObj.run(Query).
            then(function (results) {
                expect(results).to.be.an('number').to.equal(196);
                done();
            }).
            catch(function (err) {
                done(err);
            })
        });
    });

    it('insert Shippers using without promise', function (done) {
        $.getJSON("static/Shippers.json", function (results) {
            var Query = new SqlJs.Query('insert into Shippers values=@values');
            Query.map('@values', results);
            SqlJsObj.run(Query).
            then(function (results) {
                expect(results).to.be.an('number').to.equal(3);
                done();
            }).
            catch(function (err) {
                done(err);
            })
        });
    });

    it('insert products - using Skip Data', function (done) {
        $.getJSON("static/Products.json", function (results) {
            var Query = new SqlJs.Query('insert into Products skipdatacheck values=@values');
            Query.map('@values', results);
            SqlJsObj.run(Query).
            then(function (results) {
                expect(results).to.be.an('number').to.equal(77);
                done();
            }).
            catch(function (err) {
                done(err);
            })
        });
    });

    it('insert OrderDetails - using bulk insert', function (done) {
        $.getJSON("static/OrderDetails.json", function (results) {
            var Query = new SqlJs.Query('insert into OrderDetails skipdatacheck values=@values');
            Query.map('@values', results);
            SqlJsObj.run(Query).
            then(function (results) {
                expect(results).to.be.an('number').to.equal(77);
                done();
            }).
            catch(function (err) {
                done(err);
            })
        });
    });

});