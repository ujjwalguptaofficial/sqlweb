namespace SqlJs {
    export class Instance {
        _connection: JsStore.Instance;
        _query: Query;
        constructor(jsstoreCon: JsStore.Instance) {
            if (typeof JsStore === "undefined") {
                new Error(Errors.JsStoreUndefined).throw();
            }
            else {
                if (jsstoreCon) {
                    this._connection = jsstoreCon;
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
    }
}