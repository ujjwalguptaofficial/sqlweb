describe('Test update complex case', function () {
    it('update with multiple or', function (done) {
        var count;
        con.$sql.run("select * from Products where Price<10 || (SupplierID= 1 && CategoryID= 3)").
        then(function (results) {
            count = results.length;
            done();
        }).
        catch(function (err) {
            done(err);
        })

        con.$sql.run("update Products set ProductName= 'Cofee' where Price<10 || (SupplierID= 1 && CategoryID= 3)").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it("sql - Update Products set ProductName='Tea' WHERE ProductName='Cofee' and (Price < 10 or SupplierID =1)", function (done) {

        var count;

        con.$sql.run("select from Products where  ProductName= 'Cofee' && (Price<10 || SupplierID= 1) ").
        then(function (results) {
            count = results.length;
            done();
        }).
        catch(function (err) {
            done(err);
        })

        con.$sql.run("update Products set ProductName= 'Tea' where  ProductName= 'Cofee' && (Price<10 || SupplierID= 1) ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });

    it("sql - Update Products set ProductName='Cofee_Tea' WHERE ProductName='Cofee' or (SupplierID=1 and CategoryID = 1)", function (done) {
        var where_query = [{
                ProductName: 'Tea'
            },
            {
                or: {
                    SupplierID: 1,
                    CategoryID: 3
                }
            }
        ];
        var count;
        // con.jsStoreCon_.select({
        //     from: 'Products',
        //     where: where_query
        // }).
        con.$sql.run("select from Products where  ProductName= 'Tea' || (SupplierID=1 && CategoryID= 3) ").
        then(function (results) {
            count = results.length;
            done();
        }).
        catch(function (err) {
            done(err);
        })

        // con.jsStoreCon_.update({ in: 'Products',
        //     where: where_query,
        //     set: {
        //         ProductName: 'Cofee_Tea'
        //     }
        // }).
        con.$sql.run("update Products set ProductName= 'Cofee_Tea' where  ProductName= 'Tea' || (SupplierID=1 && CategoryID= 3) ").
        then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).
        catch(function (err) {
            done(err);
        })
    });
});