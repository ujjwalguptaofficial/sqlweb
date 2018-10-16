function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

describe('Test insert', function () {
    it('wrong table test', function (done) {
        con.runSql("insert into Customer values=@val").
        catch(function (err) {
            console.log(err);
            var error = {
                message: "Table 'Customer' does not exist",
                type: 'table_not_exist'
            };
            expect(err).to.be.an('object').eql(error);
            done();
        })
    });

    it('insert customers', function (done) {
        $.getJSON("test/static/Customers.json", function (results) {
            var qry = new SqlWeb.Query('insert into Customers Values=@values');
            qry.map("@values", results);
            con.runSql(qry).
            then(function (results) {
                expect(results).to.be.an('number').to.equal(93);
                done();
            }).
            then(function (err) {
                done(err);
            })
        });
    });

    it('insert Orders', function (done) {
        $.getJSON("test/static/Orders.json", function (results) {
            var qry = new SqlWeb.Query('insert into Orders Values=@values');
            qry.map("@values", results);
            con.runSql(qry).
            then(function (results) {
                expect(results).to.be.an('number').to.equal(196);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    it('insert Employees', function (done) {
        $.getJSON("test/static/Employees.json", function (results) {
            var startDate = new Date(1994, 0, 1);
            var endDate = new Date();
            results.forEach(function (value) {
                value.birthDate = new randomDate(startDate, endDate);
            });
            var qry = new SqlWeb.Query('insert into Employees Values=@values');
            qry.map("@values", results);
            con.runSql(qry).
            then(function (results) {
                expect(results).to.be.an('number').to.equal(34);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    it('insert Shippers ', function (done) {
        $.getJSON("test/static/Shippers.json", function (results) {
            var countInsert = 0;
            results.forEach(function (result) {
                var query = new SqlWeb.Query("insert into Shippers values=@values");
                query.map("@values", [result]);
                con.runSql(query).then(function (rowsInserted) {
                    countInsert += rowsInserted;
                    if (countInsert === results.length) {
                        expect(countInsert).to.be.an('number').to.equal(3);
                        done();
                    }
                }).catch(done);
            });

        });
    });

    it('insert products - using Skip Data', function (done) {
        $.getJSON("test/static/Products.json", function (results) {
            var qry = new SqlWeb.Query('insert into Products Values=@values skipDataCheck');
            qry.map("@values", results);
            con.runSql(qry).
            then(function (results) {
                expect(results).to.be.an('number').to.equal(77);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    it('insert suppliers - using return Data', function (done) {
        $.getJSON("test/static/Suppliers.json", function (results) {
            var qry = new SqlWeb.Query('insert into Suppliers Values=@values return');
            qry.map("@values", results);
            con.runSql(qry).
            then(function (results) {
                expect(results).to.be.an('array').length(29);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });


    it('not null test', function (done) {
        var qry = new SqlWeb.Query('insert into Customers Values=@values');
        qry.map("@values", [{}]);
        con.runSql(qry).
        catch(function (err) {
            console.log(err);
            var error = {
                "message": "Null value is not allowed for column 'CustomerName'",
                "type": "null_value"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('not null test for last column', function (done) {
        con.runSql("insert into Shippers values ({ShipperName: 'dsfgb'})").
        catch(function (err) {
            console.log(err);
            var error = {
                "message": "Null value is not allowed for column 'Phone'",
                "type": "null_value"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('wrong data type test - string', function (done) {
        con.runSql("insert into Shippers values ({ShipperName: 'dsfgb',Phone: 91234})").
        catch(function (err) {
            var error = {
                "message": "Supplied value for column 'Phone' have wrong data type",
                "type": "wrong_data_type"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('wrong data type test - number', function (done) {
        con.runSql("insert into Products values ({ ProductName: 'dfb', SupplierID: 5, CategoryID: 10, Price: '1123', Unit: 12333 })").
        then(function (result) {
            done(result);
        }).
        catch(function (err) {
            var error = {
                "message": "Supplied value for column 'Unit' have wrong data type",
                "type": "wrong_data_type"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('undefined column insert', function (done) {
        var value = {
            ShipperName: 'dsfgb',
            Phone: '91234',
            Address: 'ewrtgb'
        };
        con.runSql("insert into Shippers values ({ShipperName: 'dsfgb', Phone: '91234', Address: 'ewrtgb'}) return").
        then(function (results) {
            var returned_value = results[0];
            value['ShipperID'] = returned_value.ShipperID;
            expect(returned_value).to.be.an('object').eql(value);
            done();
        }).
        catch(function (err) {
            done(err);
        });
    });

    it('EnableSearch column test', function (done) {

        con.runSql("insert into Customers values ({CustomerName: 'dfb', ContactName: 'Anders', Address: 'ewrgt', City: '1123', PostalCode: 'frfd', Country: 'fesgt', Email: 1234})").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(3);
            done();
        }).
        catch(function (err) {
            var error = {
                "message": "Supplied value for column 'Email' have wrong data type",
                "type": "wrong_data_type"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });
});