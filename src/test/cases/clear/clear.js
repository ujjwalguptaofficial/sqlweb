describe('Test clear', function () {
    it('clear customers using promise', function (done) {
        con.jsStoreCon_.clear('Customers').
        then(function (results) {
            expect(results).to.be.an('undefined');
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('select all Customers', function (done) {
        con.jsStoreCon_.select({
            from: 'Customers'
        }).
        then(function (results) {
            expect(results).to.be.an('array').length(0);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it('clear Orders', function (done) {
        con.jsStoreCon_.clear('Orders').then(function (results) {
            expect(results).to.be.an('undefined');
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('select all Orders', function (done) {
        con.jsStoreCon_.select({
            from: 'Orders'
        }).
        then(function (results) {
            expect(results).to.be.an('array').length(0);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });
});