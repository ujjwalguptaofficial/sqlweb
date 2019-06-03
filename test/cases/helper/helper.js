describe('Test helper Api', function () {

    it('isDbExist with promise', function (done) {
        con.jsStoreCon_.isDbExist("Demo").then(function (isExist) {
            expect(isExist).to.be.an('boolean').to.equal(true);
        });
        con.jsStoreCon_.isDbExist("Marvel").then(function (isExist) {
            expect(isExist).to.be.an('boolean').to.equal(false);
            done();
        });
    });

    it('getDbVersion', function (done) {
        con.jsStoreCon_.getDbVersion("Demo").then(function (version) {
            expect(version).to.be.an('number').to.equal(1);
            done();
        });
    });

    it('getDbSchema', function (done) {
        con.jsStoreCon_.getDbSchema("Demo").then(function (schema) {
            expect(schema).to.be.an('object');
            done();
        });
    });

    it('set', function (done) {
        con.jsStoreCon_.set('hello', 'world').then(function () {
            done();
        }).catch(function (err) {
            done(err);
        });
    });


    it('get', function (done) {
        con.jsStoreCon_.get('hello').then(function (value) {
            expect(value).to.be.an('string').equal('world');
            done();
        }).catch(function (err) {
            done(err);
        });
    });

});