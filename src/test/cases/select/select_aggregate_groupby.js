describe('Test aggregate option with groupby', function () {
    it('select with agregate - min', function (done) {
        con.runQuery("Select aggregate[Min(Price)] from Products group by CategoryID").
        then(function (results) {
            expect(results).to.be.an('array').length(8);
            var ExpectedResult = [4.5, 10, 9.2, 2.5, 7, 7.45, 10, 6];
            for (var i = 0; i < 8; i++) {
                expect(results[i]).to.have.property('min(Price)').to.equal(ExpectedResult[i]);
            }
            done();
        }).
        catch(function (err) {
            done(err);
        })
    })

    it('select with agregate - max', function (done) {
        con.runQuery("Select aggregate[maX(Price)] from Products group by CategoryID").
        then(function (results) {
            expect(results).to.be.an('array').length(8);
            var ExpectedResult = [263.5, 43.9, 81, 55, 38, 123.79, 53, 62.5];
            for (var i = 0; i < 8; i++) {
                expect(results[i]).to.have.property('max(Price)').to.equal(ExpectedResult[i]);
            }
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - sum', function (done) {
        con.runQuery("Select aggregate[sUm(Price)] from Products group by CategoryID").
        then(function (results) {
            expect(results).to.be.an('array').length(8);
            var ExpectedResult = [455.75, 276.75, 327.08, 287.3, 141.75, 324.04, 161.85, 248.19];
            for (var i = 0; i < 8; i++) {
                expect(results[i]).to.have.property('sum(Price)').to.equal(ExpectedResult[i]);
            }
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - count', function (done) {
        con.runQuery("Select aggregate[counT(Price)] from Products group by CategoryID").
        then(function (results) {
            expect(results).to.be.an('array').length(8);
            var ExpectedResult = [12, 12, 13, 10, 7, 6, 5, 12];
            for (var i = 0; i < 8; i++) {
                expect(results[i]).to.have.property('count(Price)').to.equal(ExpectedResult[i]);
            }
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - avg', function (done) {
        
        con.runQuery("Select aggregate[Avg(Price)] from Products group by CategoryID").
        then(function (results) {
            expect(results).to.be.an('array').length(8);
            var ExpectedResult = [37.979166666666664, 23.0625, 25.16, 28.73, 20.25, 54.00666666666667, 32.37, 20.6825];
            for (var i = 0; i < 8; i++) {
                expect(results[i]).to.have.property('avg(Price)').to.equal(ExpectedResult[i]);
            }
            done();
        }).catch(function (err) {
            done(err);
        })
    });
})