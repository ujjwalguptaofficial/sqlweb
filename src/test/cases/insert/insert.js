function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

describe('Test insert', function () {
    it('wrong table test', function (done) {
        con.runQuery("insert into Customer values=@val").
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
            con.connection_.insert({
                into: 'Customers',
                values: results
            }).then(function (results) {
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
            con.connection_.insert({
                into: 'Orders',
                values: results
            }).then(function (results) {
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
            con.connection_.insert({
                into: 'Employees',
                values: results
            }).then(function (results) {
                expect(results).to.be.an('number').to.equal(34);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    it('insert Shippers ', function (done) {
        $.getJSON("test/static/Shippers.json", function (results) {
            // con.connection_.insert({
            //     into: 'Shippers',
            //     values: results
            // }).
            var countInsert = 0;
            results.forEach(function (result) {
                var value = JSON.stringify(result).replace(/\\"/g, '');
                var query = "insert into Shippers values (" + value + ")";
                console.log(query);
                con.runQuery(query).then(function (rowsInserted) {
                    countInsert += rowsInserted;
                    if (countInsert === results.length) {
                        expect(results).to.be.an('number').to.equal(3);
                        done();
                    }
                }).catch(done);
            });

        });
    });

    it('insert products - using Skip Data', function (done) {
        $.getJSON("test/static/Products.json", function (results) {
            con.connection_.insert({
                into: 'Products',
                values: results,
                skipDataCheck: true
            }).
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
            con.connection_.insert({
                into: 'Suppliers',
                values: results,
                return: true
            }).then(function (results) {
                expect(results).to.be.an('array').length(29);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    it('insert without values Option', function (done) {
        con.connection_.insert({
            into: 'Customers'
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(196);
            done();
        }).catch(function (err) {
            console.log(err);
            var error = {
                message: 'No value is supplied',
                type: 'no_value_supplied'
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('not null test', function (done) {
        con.connection_.insert({
            into: 'Customers',
            values: [{}]
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(196);
            done();
        }).catch(function (err) {
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
        var value = {
            ShipperName: 'dsfgb'
        }
        con.connection_.insert({
            into: 'Shippers',
            values: [value]
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(3);
            done();
        }).catch(function (err) {
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
        var value = {
            ShipperName: 'dsfgb',
            Phone: 91234
        }
        con.connection_.insert({
            into: 'Shippers',
            values: [value]
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(3);
            done();
        }).catch(function (err) {
            var error = {
                "message": "Supplied value for column 'Phone' does not have valid type",
                "type": "bad_data_type"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('wrong data type test - number', function (done) {
        var value = {
            ProductName: "dfb",
            SupplierID: 5,
            CategoryID: 10,
            Price: "1123",
            Unit: 12333
        }
        con.connection_.insert({
            into: 'Products',
            values: [value]
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(3);
            done();
        }).catch(function (err) {
            var error = {
                "message": "Supplied value for column 'Unit' does not have valid type",
                "type": "bad_data_type"
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
        }
        con.connection_.insert({
            into: 'Shippers',
            values: [value],
            return: true
        }).
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
        var value = {
            CustomerName: "dfb",
            ContactName: "Anders",
            Address: 'ewrgt',
            City: "1123",
            PostalCode: "frfd",
            Country: 'fesgt',
            Email: 1234
        }
        con.connection_.insert({
            into: 'Customers',
            values: [value]
        }).
        then(function (results) {
            expect(results).to.be.an('number').to.equal(3);
            done();
        }).
        catch(function (err) {
            var error = {
                "message": "Supplied value for column 'Email' does not have valid type",
                "type": "bad_data_type"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });
});