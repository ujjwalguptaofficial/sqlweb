describe('Test update Api', function () {

    it('update with where - using promise', function (done) {
        con.runQuery("update Customers set ContactName='Ujjwal', City= 'Bhubaneswar' where CustomerID=1").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(1);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('wrong table test', function (done) {
        con.runQuery("update Customerss set ContactName ='Ujjwal', City = 'Bhubaneswar' where CustomerID=1").
        then(function (results) {
            done(results);
        }).catch(function (err) {
            var error = {
                "message": "Table 'Customerss' does not exist",
                "type": "table_not_exist"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        })
    });

    it('update with like -"%or%', function (done) {
        con.runQuery('update Customers set Country=india where CustomerName like %or%').
        then(function (results) {
            expect(results).to.be.an('number').to.equal(11);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with like -"o%', function (done) {
        con.runQuery("update Customers set Country=india where CustomerName like o%").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(3);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with like -"%o', function (done) {
        con.runQuery("update Customers set Country=india where CustomerName like %o").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(6);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with like', function (done) {
        con.runQuery("update Customers set Country=india where CustomerName like %or%").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(11);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update without ignore case', function (done) {
        con.runQuery("update Customers set ContactName= 'Ujjwal', City= 'bhubaneswar' where City= 'BhUbaneSwar'").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(0);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with ignore case', function (done) {
        var count;
        con.runQuery("count from Customers where City= 'BhUbaneSwar' ignoreCase").
        then(function (results) {
            count = results;
        }).
        catch(function (err) {
            done(err);
        });

        // con.connection_.update({ in: "Customers",
        //     ignoreCase: true,
        //     set: {
        //         ContactName: 'Ujjwal',
        //         City: 'bhubaneswar'
        //     },
        //     where: {
        //         City: 'bHuBaneSwar'
        //     }
        // }).
        con.runQuery("update Customers set ContactName= 'Ujjwal', City= 'bhubaneswar' where City= 'BhUbaneSwar' ignoreCase").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with or', function (done) {
        var selectCount;
        con.runQuery("select from Customers where Country=Mexico | City=Madrid").
        then(function (results) {
            selectCount = results.length;
            done();
        }).
        catch(function (err) {
            done(err);
        })

        con.runQuery("update Customers sEt City=madrid where Country=Mexico | City=Madrid").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(selectCount);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with in', function (done) {
        var Count;
        con.runQuery("select * from Customers where Country in ('Germany', 'France', 'UK')").
        then(function (results) {
            Count = results.length;
        }).
        catch(function (err) {
            done(err);
        })

        con.runQuery("Update Customers set ContactName= 'Ujjwal',City= 'bhubaneswar' where Country in ('Germany', 'France', 'UK')").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(Count);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with operator - != (for string)', function (done) {
        var count;
        con.runQuery("count * from Customers where Country!=Mexico").
        then(function (results) {
            count = results;
        }).
        catch(function (err) {
            done(err);
        });

        con.runQuery("update Customers set ContactName= 'Ujjwsal',City= 'bhubaneswsar' where Country!=Mexico").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).
        catch(function (err) {
            done(err);
        });
    });

    it('remove with operator - != (for number)', function (done) {
        var count;
        con.runQuery("count * from Products where Price!=20").
        then(function (results) {
            count = results;
        }).
        catch(function (err) {
            done(err);
        })

        con.runQuery("updatE Products set ContactName= 'Ujjwal',City= 'bhubaneswar' where Price!=20").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });


    it('update with operator - >', function (done) {
        var count;
        con.runQuery("select From Products where Price>20").
        then(function (results) {
            count = results.length;
            expect(results).to.be.an('array').length(37);
        }).
        catch(function (err) {
            done(err);
        })

        con.runQuery("update Products set ProductName= 'Cofee' where Price>20").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with operator - >=', function (done) {
        var count;
        con.runQuery("select From Products where Price>=20").
        then(function (results) {
            count = results.length;
            expect(results).to.be.an('array').length(38);
        }).
        catch(function (err) {
            done(err);
        })

        con.runQuery("update Products set ProductName= 'Whisky' where Price>=20").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with operator - <', function (done) {

        con.runQuery("select From Products where Price<20").
        then(function (results) {
            expect(results).to.be.an('array').length(39);
        }).
        catch(function (err) {
            done(err);
        })

        con.runQuery("update Products  set ProductName='Tea' where Price<20").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(39);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with operator - <=', function (done) {
        var count;

        con.runQuery("select From Products where Price<=20").
        then(function (results) {
            count = results.length;
            expect(results).to.be.an('array').length(40);
        }).
        catch(function (err) {
            done(err);
        })

        con.runQuery("update Products  set ProductName='Candy' where Price<=20").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('update with operator - between', function (done) {
        var count;
        con.runQuery("select * from Products where Price between (10,20)").
        then(function (results) {
            count = results.length;
            expect(results).to.be.an('array').length(29);
        }).
        catch(function (err) {
            done(err);
        })

        con.runQuery("update Products set ProductName= Chocolate where Price between (10,20)").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });
});