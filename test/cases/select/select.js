describe('Test Select Api', function () {
    it('select all', function (done) {
        con.runSql('select * from Customers').
            then(function (results) {
                expect(results).to.be.an('array').length(93);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('wrong table test', function (done) {
        con.runSql('select from Customer').
            catch(function (err) {
                console.log(err);
                var error = {
                    type: "table_not_exist",
                    message: "Table 'Customer' does not exist"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            })
    });

    it('select with skip', function (done) {
        con.runSql('select from Customers skip 10').
            then(function (results) {
                expect(results).to.be.an('array').length(83);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with where', function (done) {
        con.runSql("select * from Customers where Country='Mexico'").
            then(function (results) {
                expect(results).to.be.an('array').length(5);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with distinct', function (done) {
        con.runSql("select * from Customers where City='bhubaneswar' distinct").
            then(function (results) {
                expect(results).to.be.an('array').length(1);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with or', function (done) {
        con.runSql("select * from Customers where Country='Mexico' || City= 'Madrid' ").
            then(function (results) {
                expect(results).to.be.an('array').length(8);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with in', function (done) {
        con.runSql("select * from Customers where Country in ('Germany', 'France', 'UK') ").
            then(function (results) {
                expect(results).to.be.an('array').length(29);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with like -"%or%"', function (done) {
        con.runSql("select * from Customers where CustomerName like '%or%' ").
            then(function (results) {
                expect(results).to.be.an('array').length(11);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with like - "o%"', function (done) {
        con.runSql("select * from Customers where CustomerName like 'o%' ").
            then(function (results) {
                var expected_id_list = [54, 55, 56];
                var id_list = [];
                results.forEach(element => {
                    id_list.push(element.CustomerID);
                });
                expect(id_list).to.be.an('array').length(3).deep.equal(expected_id_list);
                done();
            }).
            catch(function (err) {
                done(err);
            });
    });

    it('select with like - "%o"', function (done) {
        con.runSql("select * from Customers where CustomerName like '%o' ").
            then(function (results) {
                var expected_id_list = [15, 21, 29, 46, 69, 73];
                var id_list = [];
                results.forEach(element => {
                    id_list.push(element.CustomerID);
                });
                expect(id_list).to.be.an('array').length(6).deep.equal(expected_id_list);
                done();
            }).
            catch(function (err) {
                done(err);
            });
    });

    it('select with GroupBy', function (done) {
        con.runSql("select * from Customers group by Country").
            then(function (results) {
                expect(results).to.be.an('array').length(22);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with order by', function (done) {
        con.runSql("select * from Customers order by Country desc").
            then(function (results) {
                expect(results).to.be.an('array').length(93);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with order by,limit 5, deep eql', function (done) {
        con.runSql("select * from Customers order by Country desc limit 5").
            then(function (results) {
                var countries = ["Venezuela", "Venezuela", "Venezuela", "Venezuela", "USA"];
                expect(results).to.be.an('array').length(5);
                for (var i = 0; i < 5; i++) {
                    const result = results[i];
                    expect(result.Country).to.be.equal(countries[i]);
                }
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });
});