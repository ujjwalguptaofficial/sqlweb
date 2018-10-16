describe('error', function () {
    it('syntax error', function (done) {
        try {
            con.runSql("select * frUm Customers order by Country desc limit 5").then(function (result) {
                done(result);
            }).catch(err => {
                done(err);
            });
        } catch (ex) {
            var error = {
                "message": 'Expected from but "f" found.',
                "type": "syntax_error"
            };
            expect(ex).to.be.an('object').eql(error);
            done();
        }
    });
})