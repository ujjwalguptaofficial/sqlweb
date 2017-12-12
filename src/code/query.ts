namespace SqlJs {
    export class Query {
        _stringQry: string;
        _maps: IMap[] = [];
        _api: string;
        _splittedQry: string[];
        constructor(qry: string) {
            this._stringQry = qry.toLowerCase();
            this._splittedQry = this.getWords();
            this._api = this._splittedQry[0];
        }

        getMapValue = function (key, isMapValue = true) {
            if (isMapValue === true && key.indexOf("@") >= 0) {
                var is_value_exist = false;
                for (var i = 0, length = this._maps.length; i < length; i++) {
                    if (this._maps[i]._key === key) {
                        is_value_exist = true;
                        return this._maps[i]._value;
                    }
                }
                if (is_value_exist === false) {
                    console.error('key does not have any value');
                }
            }
            else {
                return key;
            }
        };

        getWords = function () {
            return this._stringQry.replace("(", " ( ").replace(/  +/g, ' ').replace(/[=]/g, " ").split(" ");
            // .replace("=", " ").replace("("," ")
        };

        map = function (key, value) {
            this._maps.push(new Model.Map(key, value));
        };
    }
}