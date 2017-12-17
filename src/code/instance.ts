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

        getConnection = function () {
            return this._connection;
        };

        getJsStoreQuery = function (qry: Query) {
            var jsstore_query;
            switch (qry._api) {
                case 'select':
                    jsstore_query = new Select(qry).getQuery();
                    break;
                case 'insert':
                    jsstore_query = new Insert(qry).getQuery();
                    break;
                case 'bulkinsert':
                case 'bulk_insert':
                    qry._api = 'bulkInsert';
                    jsstore_query = new BulkInsert(qry).getQuery();
                    break;
                case 'create':
                    jsstore_query = new Create(qry).getDb();
                    break;
            }
            return jsstore_query;
        };

        run = function (qry: Query) {
            if (qry._api === 'create') {
                var that = this;
                const db = this.getJsStoreQuery(qry);
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
            else {
                var jsstore_query = this.getJsStoreQuery(qry);
                return this._connection[qry._api](jsstore_query);
            }

            // this._connection[this._api](jsstore_query, onSuccess, onError);
        };
    }
}