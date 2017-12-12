namespace SqlJs {
    export class Instance {
        _connection: JsStore.Instance;
        _query: Query;
        constructor(dbSchemaQry: string) {
            if (typeof JsStore === "undefined") {
                new Error(Errors.JsStoreUndefined).throw();
            }
            else {
                if (dbSchemaQry) {
                    this._connection = new JsStore.Instance();
                    const dbSchema = this.getDbSchema(dbSchemaQry);
                }
                else {
                    new Error(Errors.UndefinedCon).throw();
                }
            }
        }

        run = function (qry: Query, onSuccess: () => any, onError: () => IError) {
            this._query = qry;
            qry = undefined;
            var jsstore_query;
            switch (this._query._api) {
                case 'insert':
                    jsstore_query = new Insert(this._query).getQuery();
                    break;

            }
            console.log(jsstore_query);
            // this._connection[this._api](jsstore_query, onSuccess, onError);
        };

        private getDbSchema = function (dbSchemaInSql: string) {
            const queries = dbSchemaInSql.split(";");
            var database, tables = [];
            queries.forEach(function (item) {
                if (item.length > 0) {
                    var query = new Query(item);
                    if (query._stringQry.indexOf('table') >= 0) {
                        tables.push(new Create(query).getQuery());
                    }
                    else {
                        database = new Create(query).getQuery();
                    }
                }
            });
            database.Tables = tables;
            return database;
        };
    }
}