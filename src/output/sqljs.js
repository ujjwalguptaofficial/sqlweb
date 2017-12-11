/**
 * Project: SqlJs - https://github.com/ujjwalguptaofficial/sqljs
 * Author: Ujjwal Gupta
 * License: MIT
 */ 
var SqlJs;
(function (SqlJs) {
    var Errors;
    (function (Errors) {
        Errors["JsStoreUndefined"] = "Jstore_undefined";
        Errors["UndefinedCon"] = "undefined_connection";
        Errors["Undefined"] = "undefined";
    })(Errors = SqlJs.Errors || (SqlJs.Errors = {}));
    var Error = /** @class */ (function () {
        function Error(type, info) {
            if (info === void 0) { info = null; }
            this.throw = function () {
                throw this.get();
            };
            this.print = function (isWarn) {
                if (isWarn === void 0) { isWarn = false; }
                var error_obj = this.get();
                if (isWarn) {
                    console.warn(error_obj);
                }
                else {
                    console.error(error_obj);
                }
            };
            this.get = function () {
                var error_obj = {
                    _type: this._type,
                    _message: this._message
                };
                switch (this._type) {
                    case Errors.UndefinedCon:
                        error_obj._message = "jsstore connection is not defined";
                        break;
                    case Errors.JsStoreUndefined:
                        error_obj._message = "jsstore is not defined";
                        break;
                    default:
                        error_obj._message = 'the error type is not defined';
                        break;
                }
                return error_obj;
            };
            this._type = type;
            this._info = info;
        }
        return Error;
    }());
    SqlJs.Error = Error;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Query = /** @class */ (function () {
        function Query(qry) {
            this._maps = [];
            this.getMapValue = function (key) {
                if (key.indexOf("@") >= 0) {
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
            this.getWords = function () {
                return this._stringQry.replace(/  +/g, ' ').replace("=", " ").split(" ");
            };
            this.map = function (key, value) {
                this._maps.push(new SqlJs.Model.Map(key, value));
            };
            this._stringQry = qry.toLowerCase();
            this._splittedQry = this.getWords();
            this._api = this._splittedQry[0];
        }
        return Query;
    }());
    SqlJs.Query = Query;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Insert = /** @class */ (function () {
        function Insert(qry) {
            this.index_for_loop = 0;
            this.getQuery = function () {
                var query = {};
                var keywords = ['into', 'values', 'skipdatacheck'];
                var keywords_value = [
                    { value: 'Into', rules: 'next' },
                    { value: 'Values', rules: 'next' },
                    { value: 'SkipDataCheck', rules: '' }
                ];
                for (var i = this.index_for_loop, length = this.query._splittedQry.length; i < length;) {
                    var index_of_keywords = keywords.indexOf(this.query._splittedQry[i]);
                    if (index_of_keywords >= 0) {
                        this.index_for_loop = i;
                        query[keywords_value[index_of_keywords].value] =
                            this.getValue(keywords_value[index_of_keywords].rules);
                        i = this.index_for_loop;
                    }
                    i++;
                }
                return query;
            };
            this.getValue = function (rule) {
                switch (rule) {
                    case 'next':
                        return (this.query.getMapValue(this.query._splittedQry[++this.index_for_loop]));
                    // return value.indexof('@') === 0 ? this.query.getValue() : value;
                    default:
                }
            };
            this.query = qry;
        }
        return Insert;
    }());
    SqlJs.Insert = Insert;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Select = /** @class */ (function () {
        function Select(msg) {
            // ss
        }
        return Select;
    }());
    SqlJs.Select = Select;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Instance = /** @class */ (function () {
        function Instance(jsstoreCon) {
            this.run = function (qry, onSuccess, onError) {
                this._query = qry;
                qry = undefined;
                var jsstore_query;
                switch (this._query._api) {
                    case 'insert':
                        jsstore_query = new SqlJs.Insert(this._query).getQuery();
                        break;
                }
                console.log(jsstore_query);
                // this._connection[this._api](jsstore_query, onSuccess, onError);
            };
            if (typeof JsStore === "undefined") {
                new SqlJs.Error(SqlJs.Errors.JsStoreUndefined).throw();
            }
            else {
                if (jsstoreCon) {
                    this._connection = jsstoreCon;
                }
                else {
                    new SqlJs.Error(SqlJs.Errors.UndefinedCon).throw();
                }
            }
        }
        return Instance;
    }());
    SqlJs.Instance = Instance;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Model;
    (function (Model) {
        var Map = /** @class */ (function () {
            function Map(key, value) {
                this._key = key;
                this._value = value;
            }
            return Map;
        }());
        Model.Map = Map;
    })(Model = SqlJs.Model || (SqlJs.Model = {}));
})(SqlJs || (SqlJs = {}));
//# sourceMappingURL=sqljs.js.map