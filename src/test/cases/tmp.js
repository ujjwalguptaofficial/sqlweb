// describe('Test temp', function () {
//     it('select all', function (done) {
//         var Query = new SqlJs.Query('select from Customers');
//         SqlJsObj.run(Query).
//         then(function (results) {
//             expect(results).to.be.an('array').length(93);
//             done();
//         }).
//         catch(function (err) {
//             done(err);
//         })
//     });

//     it('select with tmp', function (done) {
//         var Query = new SqlJs.Query('select from Customers where Country=Mexico');
//         SqlJsObj.run(Query).
//         then(function (results) {
//             expect(results).to.be.an('array').length(5);
//             done();
//         }).
//         catch(function (err) {
//             done(err);
//         })
//     });
// });