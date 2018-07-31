describe('Test count Api', function () {
    it('count all', function (done) {
        con.runQuery("count * from Customers").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(93);
            done();
        }).
        catch(function (err) {
            done(err);
        })

    });

    it('count with where', function (done) {
        con.runQuery("count * from Customers where Country=Mexico").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(5);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('count without ignore case', function (done) {
        con.runQuery("count * from Customers where Country=mexico").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(0);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('count with ignore case', function (done) {

        con.runQuery("count * from Customers where Country=mexico IgnoreCase").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(5);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('count with or', function (done) {
        con.runQuery("count from Customers where Country=Mexico | City=Madrid").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(8);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('count with in', function (done) {
        con.runQuery("cOunt from Customers wHere Country in ('Germany', 'France', 'UK') ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(29);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('count with operator - >', function (done) {
        con.runQuery("Count * from Products wHere Price>20").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(37);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('count with operator - >=', function (done) {
        // con.connection_.count({
        //     from: 'Products',
        //     where: {
        //         Price: {
        //             ">=": 20
        //         }
        //     }
        // }).
        con.runQuery("Count * from Products wHere Price>=20").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(38);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('count with operator - <', function (done) {

        con.runQuery("Count * from Products wHere Price < 20").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(39);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('count with operator - <=', function (done) {

        con.runQuery("Count * from Products wHere Price <= 20").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(40);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('select with operator - != (for string)', function (done) {

        con.runQuery("Count * from Customers wHere Country !=Mexico").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(88);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('select with operator - != (for number)', function (done) {
        con.runQuery("Count * from Products wHere Price != 20").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(76);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('count with operator - between', function (done) {
        con.runQuery("Count * from Products wHere Price betWeen (10,20)").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(29);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('count with like', function (done) {

        con.runQuery("Count * from Customers where CustomerName like %or% ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(11);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('select with like - "o%"', function (done) {
        con.runQuery("Count * from Customers where CustomerName like o% ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(3);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('select with like - "%o"', function (done) {
        con.runQuery("Count * from Customers where CustomerName like %o ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(6);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('wrong table test', function (done) {
        con.runQuery("Count * from Cusdtomers ").
        catch(function (err) {
            var error = {
                "message": "Table 'Cusdtomers' does not exist",
                "type": "table_not_exist"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });
});