
module SqlJs {
    export class Instance {
        _connection: JsStore.Instance;
        _query: Query;
        constructor(jsstoreCon: JsStore.Instance) {
            if (typeof JsStore == undefined) {

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

        run = function (qry: Query) {
            this._query = qry;
            qry = undefined;
            switch (this._query) {
                case 'insert':
                    // new Insert()
            }
        }
    }
}