describe('Test Aggregate option', function () {
    it('select with agregate - min', function (done) {
        con.runSql("Select [min(Price)] from Products").
        then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('min(Price)').to.equal(2.5)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - max', function (done) {
        con.runSql("Select [max(Price)] from Products").
        then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('max(Price)').to.equal(263.5)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - sum', function (done) {
        con.runSql("Select [sum(Price)] from Products").
        then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('sum(Price)').to.equal(2222.71)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - count', function (done) {
        con.runSql("Select [count(Price)] from Products").
        then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('count(Price)').to.equal(77)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - avg', function (done) {
        con.runSql("Select [avg(Price)] from Products").
        then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('avg(Price)').to.equal(28.866363636363637);
            done();
        }).catch(function (err) {
            done(err);
        })
    });

});