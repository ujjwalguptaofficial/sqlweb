describe('create demo database', function () {
    it('use isexist and then open/create db', function (done) {
        console.log('initiate database');
        con.runQuery('isDbExist Demo').then(function (isExist) {
            console.log('db exist :' + isExist);
            if (isExist) {
                con.runQuery('open Demo').then(function () {
                    console.log('Database opened');
                    done();
                });
            } else {
                con.runQuery('createDb').then(function () {
                    console.log('Database created');
                    done();
                });
            }
        }).catch(function (err) {
            done(err);
        });
    });
});

// con.connection_.isDbExist('Demo').then(function (exist) {
//     console.log('db exist :' + exist);
//     if (exist) {
//         con.connection_.openDb('Demo').then(onDbInit);
//     } else {
//         con.connection_.createDb(getDbSchema()).then(function () {
//             console.log('Database created');
//             onDbInit();
//         });
//     }
// }).catch(function (err) {
//     console.log(err);
//     //alert(err.Message);
// });
// }

function getDbSchema() {
    var customerTblQuery=`Define table Customers(
                            CustomerID primaryKey autoIncrement,
                            CustomerName notNull string,
                            ContactName notNull string,
                            Address notNull string,
                            City notNull string,
                            PostalCode string,
                            Country notNull string,
                            Email notNull enableSearch,
                         )
                         `
}