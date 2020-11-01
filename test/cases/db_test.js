var conWithoutWorker;
describe('Db Test', function () {

    it('getDbList api test', function (done) {
        con.jsStoreCon_.getDbList().then(function (result) {
            expect(result).to.be.an('array').to.deep.equal(['Demo', 'MultiEntryTest']);
            done();
        }).catch(err => {
            done(err);
        })
    });

    it('getDbList api test after dropping multiIntry Table', function (done) {
        con.jsStoreCon_.dropDb().then(function () {
            con.jsStoreCon_.getDbList().then(function (result) {
                console.log(result);
                expect(result).to.be.an('array').to.deep.equal(['Demo']);
                done();
            }).catch(err => {
                done(err);
            })
        }).catch(function (err) {
            done(err);
        });

    });

    it('open db test', function (done) {
        con.$sql.run('open Demo').then(function () {
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('drop db test', function (done) {
        con.jsStoreCon_.dropDb().then(function () {
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('getDbList api test after dropping demo', function (done) {
        con.jsStoreCon_.getDbList().then(function (result) {
            expect(result).to.be.an('array').to.deep.equal([]);
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('open db test - invalid db', function (done) {
        con.$sql.run('open invalid_db').then(function (results) {
            done();
        }).catch(err => {
            var error = {
                "message": "Database 'invalid_db' does not exist",
                "type": "db_not_exist"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        })
    });

    it('terminate test', function (done) {
        con.jsStoreCon_.terminate().then(function () {
            if (con.jsStoreCon_.isDbOpened_ === false) {
                done();
            } else {
                done('db is opened after terminate');
            }
        }).catch(function (err) {
            done(err);
        });
    });
});