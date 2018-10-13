describe('error', function () {
    it('syntax error', function (done) {
        con.runQuery("select * frUm Customers order by Country desc limit 5").then(function (result) {
            done(result);
        }).catch(err => {
            var error = {
                "message": "Expected from but \"f\" found.",
                "type": "syntax_error"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });
})