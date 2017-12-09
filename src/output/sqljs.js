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
            this.map = function (key, value) {
                this._maps.push({
                    _key: key,
                    _value: value
                });
            };
            this._qry = qry.toLowerCase();
            this._splittedQry = this._qry.split(" ");
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
        }
        return Insert;
    }());
    SqlJs.Insert = Insert;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Select = /** @class */ (function () {
        function Select(msg) {
        }
        return Select;
    }());
    SqlJs.Select = Select;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Instance = /** @class */ (function () {
        function Instance(jsstoreCon) {
            this.run = function (qry) {
                this._query = qry;
                qry = undefined;
                switch (this._query) {
                    case 'insert':
                }
            };
            if (typeof JsStore == undefined) {
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
//# sourceMappingURL=sqljs.js.map