namespace SqlJs {
    export class Instance {
        _isDbOpened: boolean = false;
        _connection: JsStore.Instance;
        _query: Query;
        constructor() {
            if (typeof JsStore === "undefined") {
                new Error(Errors.JsStoreUndefined).throw();
            }
            else {
                this._connection = new JsStore.Instance();
                // if (dbSchemaQry) {
                //     this._connection = new JsStore.Instance();
                //     const dbSchema = this.getDbSchema(dbSchemaQry);
                // }
                // else {
                //     new Error(Errors.UndefinedCon).throw();
                // }
            }
        }

        run = function (qry: Query) {
            var jsstore_query = null;
            switch (qry._api) {
                case 'insert':
                    jsstore_query = new Insert(qry).getQuery();
                    return this._connection[qry._api](jsstore_query);
                case 'bulkinsert':
                case 'bulk_insert':
                    qry._api = 'bulkInsert';
                    jsstore_query = new BulkInsert(qry).getQuery();
                    return this._connection[qry._api](jsstore_query);
                case 'create':
                    const db = new Create(qry).getDb();
                    var that = this;
                    return new Promise(function (resolve, reject) {
                        JsStore.isDbExist.call(this, db.Name, function (isExist) {
                            if (isExist) {
                                that._connection.openDb(db.Name);
                            }
                            else {
                                that._connection.createDb(db);
                            }
                            resolve();
                        }, function (err: JsStore.IError) {
                            reject(err);
                            throw err;
                        });
                    });
            }
            // this._connection[this._api](jsstore_query, onSuccess, onError);
        };

        // private getDbSchema = function (dbSchemaInSql: string) {
        //     const queries = dbSchemaInSql.split(";");
        //     var database, tables = [];
        //     queries.forEach(function (item) {
        //         if (item.length > 0) {
        //             var query = new Query(item);
        //             if (query._stringQry.indexOf('table') >= 0) {
        //                 tables.push(new Create(query).getQuery());
        //             }
        //             else {
        //                 database = new Create(query).getQuery();
        //             }
        //         }
        //     });
        //     database.Tables = tables;
        //     return database;
        // };
    }
}