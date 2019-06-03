// it('insert without values Option', function (done) {
//     // con.jsStoreCon_.insert({
//     //     into: 'Customers'
//     // }).
//     var qry = new SqlWeb.Query('insert into Suppliers Values=@values return');
//     qry.map("@values", results);
//     con.runSql(qry).
//     catch(function (err) {
//         console.log(err);
//         var error = {
//             message: 'No value is supplied',
//             type: 'no_value_supplied'
//         };
//         expect(err).to.be.an('object').eql(error);
//         done();
//     });
// });
