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
            this.getMappedValues = function (keys) {
                var mapped_value = [];
                this._maps.forEach(function (element) {
                    if (keys.indexOf(element._key.toLowerCase()) >= 0) {
                        mapped_value.push(element);
                    }
                });
                return mapped_value;
            };
            this.getMappedKeys = function () {
                var keys = [];
                this._splittedQry.forEach(function (element) {
                    if (element.indexOf('@') >= 0) {
                        keys.push(element);
                    }
                });
                return keys;
            };
            this.getMapValue = function (key) {
                if (key.indexOf("@") >= 0) {
                    var is_value_exist = false;
                    for (var i = 0, length = this._maps.length; i < length; i++) {
                        if (this._maps[i]._key.toLowerCase() === key) {
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
            this.map = function (key, value) {
                this._maps.push(new SqlJs.Model.Map(key, value));
            };
            this.mapMany = function (mapsData) {
                mapsData.forEach(function (item) {
                    this._maps.push(new SqlJs.Model.Map(item._key, item._value));
                }, this);
            };
            this.splitQuery = function () {
                var splitted_qry = this._stringQry.replace("(", " ( ").replace(/  +/g, ' ').
                    replace(/(\w+)\s*=\s*(\w+)/g, '$1 $2').split(" ");
                return splitted_qry.filter(function (item) {
                    return !JsStore.isNull(item);
                });
                // .replace("=", " ").replace("("," ")
            };
            this._stringQry = qry.replace(/(\r\n|\n|\r)/gm, "");
            this._splittedQry = this.splitQuery();
            this._api = this._splittedQry[0].toLowerCase();
        }
        return Query;
    }());
    SqlJs.Query = Query;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Column = /** @class */ (function () {
        function Column(qry) {
            this._index_for_loop = 0;
            this.getKeyWordsValue = function () {
                var keywords_value = [
                    { value: 'PrimaryKey', rules: 'true' },
                    { value: 'PrimaryKey', rules: 'true' },
                    { value: 'PrimaryKey', rules: 'true' },
                    { value: 'NotNull', rules: 'true' },
                    { value: 'NotNull', rules: 'true' },
                    { value: 'AutoIncrement', rules: 'true' },
                    { value: 'AutoIncrement', rules: 'true' },
                    { value: 'Unique', rules: 'true' },
                    { value: 'Default', rules: 'next' },
                    { value: 'string', rules: 'true' },
                    { value: 'boolean', rules: 'true' },
                    { value: 'object', rules: 'true' },
                    { value: 'number', rules: 'true' }
                ];
                return keywords_value;
            };
            this.getQuery = function () {
                var query = {
                    // Name: this._query._splittedQry[this._index_for_loop++]
                    Name: this.getName()
                };
                var keywords = ['primary_key', 'pk', 'primarykey', 'not_null', 'notnull',
                    'autoincrement', 'auto_increment', 'unique', 'default', 'string', 'boolean', 'object', 'number'];
                for (var i = this._index_for_loop, length = this._query._splittedQry.length; i < length;) {
                    var index_of_keywords = keywords.indexOf(this._query._splittedQry[i].toLowerCase());
                    if (index_of_keywords >= 0) {
                        var keywords_value = this.getKeyWordsValue();
                        this._index_for_loop = i;
                        query[keywords_value[index_of_keywords].value] =
                            this.getValue(keywords_value[index_of_keywords].rules);
                        i = this._index_for_loop;
                    }
                    i++;
                }
                var data_type = ['string', 'boolean', 'object', 'number'];
                for (var prop in query) {
                    if (data_type.indexOf(prop) >= 0) {
                        query['DataType'] = prop;
                    }
                }
                return query;
            };
            this.getValue = function (rule) {
                switch (rule) {
                    case 'next':
                        var value = this._query._splittedQry[++this._index_for_loop];
                        return (this._query.getMapValue(value));
                    case 'true':
                        return true;
                    default:
                }
            };
            this._query = qry;
        }
        Column.prototype.getName = function () {
            return this._query._splittedQry[this._index_for_loop + 1].indexOf('@') >= 0 ?
                this._query.getMapValue(this._query._splittedQry[++this._index_for_loop]) :
                this._query._splittedQry[this._index_for_loop];
            // var value = this._query._splittedQry[this._index_for_loop];
            // return value === 'name' ? 
            // this._query.getMapValue(this._query._splittedQry[++this._index_for_loop]) : value;
        };
        return Column;
    }());
    SqlJs.Column = Column;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Create = /** @class */ (function () {
        function Create(qry) {
            this._index_for_loop = 0;
            this.getDb = function () {
                var queries = this._query._stringQry.split(";");
                var database, tables = [];
                queries.forEach(function (item) {
                    if (item.length > 0) {
                        var query = new SqlJs.Query(item);
                        var keys = query.getMappedKeys();
                        if (keys.length > 0) {
                            var values = this._query.getMappedValues(keys);
                            if (values.length === keys.length) {
                                values.forEach(function (value) {
                                    query.map(value._key, value._value);
                                });
                            }
                        }
                        if (query._stringQry.indexOf('table') >= 0) {
                            tables.push(new Create(query).getQuery());
                        }
                        else {
                            database = new Create(query).getQuery();
                        }
                    }
                }, this);
                database.Tables = tables;
                return database;
            };
            this.getKeyWordsValue = function () {
                var keywords_value = [
                    { value: 'Name', rules: 'getName' },
                    { value: 'Name', rules: 'getName' },
                    { value: 'Columns', rules: 'getColumns' }
                ];
                return keywords_value;
            };
            this.getIndexofColumnQuery = function () {
                var index = 0;
                for (var j = this._index_for_loop, length = this._query._stringQry.length; (j > 0 && index < length); index++) {
                    if (this._query._stringQry[index] === " ") {
                        j--;
                    }
                }
                return index;
            };
            this.getColumns = function () {
                var column_query = this._query._stringQry.substr(this.getIndexofColumnQuery()).
                    replace(/[()]/g, '').split(','), columns = [];
                column_query.forEach(function (item) {
                    if (item.length > 0) {
                        var query = new SqlJs.Query(item);
                        columns.push(new SqlJs.Column(query).getQuery());
                    }
                });
                return columns;
            };
            this.getValue = function (rule) {
                switch (rule) {
                    case 'getName':
                        return this.getName();
                    case 'next':
                        var value = this._query._splittedQry[++this._index_for_loop];
                        return (this._query.getMapValue(value));
                    case 'getColumns':
                        var value = this.getColumns();
                        this._index_for_loop = this._query._splittedQry.length;
                        return value;
                    default:
                }
            };
            this.getQuery = function () {
                var query = {};
                var keywords = ['database', 'table', '('];
                for (var i = this._index_for_loop, length = this._query._splittedQry.length; i < length;) {
                    var index_of_keywords = keywords.indexOf(this._query._splittedQry[i].toLowerCase());
                    if (index_of_keywords >= 0) {
                        var keywords_value = this.getKeyWordsValue();
                        this._index_for_loop = i;
                        query[keywords_value[index_of_keywords].value] =
                            this.getValue(keywords_value[index_of_keywords].rules);
                        i = this._index_for_loop;
                    }
                    i++;
                }
                return query;
            };
            this._query = qry;
        }
        Create.prototype.getName = function () {
            var value = this._query._splittedQry[++this._index_for_loop];
            return this._index_for_loop + 1 < this._query._splittedQry.length &&
                this._query._splittedQry[this._index_for_loop + 1].indexOf('@') >= 0 ?
                this._query.getMapValue(this._query._splittedQry[++this._index_for_loop]) : value;
            // this._query._splittedQry[this._index_for_loop];
            // return value === 'name' ?
            // this._query.getMapValue(this._query._splittedQry[++this._index_for_loop]) : value;
        };
        return Create;
    }());
    SqlJs.Create = Create;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Insert = /** @class */ (function () {
        function Insert(qry) {
            this._index_for_loop = 0;
            this.getKeyWordsValue = function () {
                var keywords_value = [
                    { value: 'Into', rules: 'next' },
                    { value: 'Values', rules: 'next' },
                    { value: 'SkipDataCheck', rules: 'true' },
                    { value: 'SkipDataCheck', rules: 'true' },
                    { value: 'Return', rules: 'true' }
                ];
                return keywords_value;
            };
            this.getQuery = function () {
                var query = {};
                var keywords = ['into', 'values', 'skipdatacheck', 'skip_data_check', 'return'];
                for (var i = this._index_for_loop, length = this._query._splittedQry.length; i < length;) {
                    var index_of_keywords = keywords.indexOf(this._query._splittedQry[i].toLowerCase());
                    if (index_of_keywords >= 0) {
                        var keywords_value = this.getKeyWordsValue();
                        this._index_for_loop = i;
                        query[keywords_value[index_of_keywords].value] =
                            this.getValue(keywords_value[index_of_keywords].rules);
                        i = this._index_for_loop;
                    }
                    i++;
                }
                return query;
            };
            this.getValue = function (rule) {
                switch (rule) {
                    case 'next':
                        var value = this._query._splittedQry[++this._index_for_loop];
                        return (this._query.getMapValue(value));
                    case 'true':
                        return true;
                    default:
                }
            };
            this._query = qry;
        }
        return Insert;
    }());
    SqlJs.Insert = Insert;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var BulkInsert = /** @class */ (function () {
        function BulkInsert(qry) {
            this._index_for_loop = 0;
            this.getKeyWordsValue = function () {
                var keywords_value = [
                    { value: 'Into', rules: 'next' },
                    { value: 'Values', rules: 'next' }
                ];
                return keywords_value;
            };
            this.getQuery = function () {
                var query = {};
                var keywords = ['into', 'values'];
                for (var i = this._index_for_loop, length = this._query._splittedQry.length; i < length;) {
                    var index_of_keywords = keywords.indexOf(this._query._splittedQry[i].toLowerCase());
                    if (index_of_keywords >= 0) {
                        var keywords_value = this.getKeyWordsValue();
                        this._index_for_loop = i;
                        query[keywords_value[index_of_keywords].value] =
                            this.getValue(keywords_value[index_of_keywords].rules);
                        i = this._index_for_loop;
                    }
                    i++;
                }
                return query;
            };
            this.getValue = function (rule) {
                switch (rule) {
                    case 'next':
                        var value = this._query._splittedQry[++this._index_for_loop];
                        return (this._query.getMapValue(value));
                    case 'true':
                        return true;
                    default:
                }
            };
            this._query = qry;
        }
        return BulkInsert;
    }());
    SqlJs.BulkInsert = BulkInsert;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Where = /** @class */ (function () {
        function Where(qry) {
            this._index_for_loop = 0;
            this.getKeyWordValue = function (index) {
                var keywords_value = ['Like', 'In', '>', '<', '>=', '<='];
                return keywords_value[index];
            };
            this.getQuery = function () {
                var query = {}, or_query = {};
                for (var i = this._index_for_loop, length = this._query._splittedQry.length; i < length;) {
                    var value = this._query._splittedQry[i];
                    switch (value.toLowerCase()) {
                        case 'and':
                            query[this._query._splittedQry[++i]] = this.getValue(i);
                            break;
                        case 'or':
                            or_query[this._query._splittedQry[++i]] = this.getValue(i);
                            break;
                        default:
                            query[this._query._splittedQry[i]] = this.getValue(i);
                    }
                    i = this._index_for_loop;
                }
                if (Object.keys(or_query).length > 0) {
                    query['Or'] = or_query;
                }
                return query;
            };
            this.getValue = function (index) {
                var keywords = ['like', 'in', '>', '<', '>=', '<='];
                var value = this._query._splittedQry[++index], index_of_keywords = keywords.indexOf(value.toLowerCase());
                if (index_of_keywords >= 0) {
                    value = {};
                    value[this.getKeyWordValue(index_of_keywords)] =
                        this._query.getMapValue(this._query._splittedQry[++index]);
                    this._index_for_loop = index + 1;
                    return value;
                }
                else {
                    this._index_for_loop = index + 1;
                    return (this._query.getMapValue(value));
                }
            };
            this._query = qry;
        }
        return Where;
    }());
    SqlJs.Where = Where;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Select = /** @class */ (function () {
        function Select(qry) {
            this._index_for_loop = 0;
            this.getKeyWordsValue = function () {
                var keywords_value = [
                    { value: 'From', rules: 'next' },
                    { value: 'Where', rules: 'getWhere' },
                    { value: 'IgnoreCase', rules: 'true' },
                    { value: 'IgnoreCase', rules: 'true' },
                    { value: 'Limit', rules: 'next_number' },
                    { value: 'Skip', rules: 'next_number' },
                    { value: 'Distinct', rules: 'true' },
                    { value: 'Order', rules: 'getOrderBy' },
                    { value: 'Min', rules: 'next' },
                    { value: 'Max', rules: 'next' },
                    { value: 'Count', rules: 'next' },
                    { value: 'Sum', rules: 'next' },
                    { value: 'Avg', rules: 'next' },
                    { value: 'GroupBy', rules: 'getGroupBy' }
                ];
                return keywords_value;
            };
            this.getQuery = function () {
                var query = {};
                var keywords = this.getKeyWords();
                for (var i = this._index_for_loop, length = this._query._splittedQry.length; i < length;) {
                    var index_of_keywords = keywords.indexOf(this._query._splittedQry[i].toLowerCase());
                    if (index_of_keywords >= 0) {
                        var keywords_value = this.getKeyWordsValue();
                        this._index_for_loop = i;
                        query[keywords_value[index_of_keywords].value] =
                            this.getValue(keywords_value[index_of_keywords].rules);
                        i = this._index_for_loop;
                    }
                    i++;
                }
                return query;
            };
            this.getKeyWords = function () {
                var keywords = ['from', 'where', 'ignorecase', 'ignore_case', 'limit', 'skip', 'distinct', 'order', 'min',
                    'max', 'count', 'sum', 'avg', 'group'];
                return keywords;
            };
            this.getWhere = function () {
                ++this._index_for_loop;
                var keywords = this.getKeyWords();
                var where_query = "";
                for (var j = this._index_for_loop, length = this._query._splittedQry.length; j < length;) {
                    var index_of_keywords = keywords.indexOf(this._query._splittedQry[j].toLowerCase());
                    if (index_of_keywords >= 0) {
                        where_query = this._query._splittedQry.slice(this._index_for_loop, j).join(" ");
                        break;
                    }
                    j++;
                }
                if (where_query.length === 0) {
                    where_query = this._query._splittedQry.
                        slice(this._index_for_loop, this._query._splittedQry.length).join(" ");
                }
                var qry = new SqlJs.Query(where_query);
                qry.mapMany(this._query.getMappedValues(qry.getMappedKeys()));
                return new SqlJs.Where(qry).getQuery();
            };
            this.getValue = function (rule) {
                switch (rule) {
                    case 'next':
                        var value = this._query._splittedQry[++this._index_for_loop];
                        return (this._query.getMapValue(value));
                    case 'true':
                        return true;
                    case 'next_number':
                        var value = this._query._splittedQry[++this._index_for_loop];
                        return Number(value);
                    default:
                        return this[rule]();
                }
            };
            this._query = qry;
        }
        return Select;
    }());
    SqlJs.Select = Select;
})(SqlJs || (SqlJs = {}));
var SqlJs;
(function (SqlJs) {
    var Instance = /** @class */ (function () {
        function Instance() {
            this._isDbOpened = false;
            this.getConnection = function () {
                return this._connection;
            };
            this.getJsStoreQuery = function (qry) {
                var jsstore_query;
                switch (qry._api) {
                    case 'select':
                        jsstore_query = new SqlJs.Select(qry).getQuery();
                        break;
                    case 'insert':
                        jsstore_query = new SqlJs.Insert(qry).getQuery();
                        break;
                    case 'bulkinsert':
                    case 'bulk_insert':
                        qry._api = 'bulkInsert';
                        jsstore_query = new SqlJs.BulkInsert(qry).getQuery();
                        break;
                    case 'create':
                        jsstore_query = new SqlJs.Create(qry).getDb();
                        break;
                }
                return jsstore_query;
            };
            this.run = function (qry) {
                if (qry._api === 'create') {
                    var that = this;
                    var db_1 = this.getJsStoreQuery(qry);
                    return new Promise(function (resolve, reject) {
                        JsStore.isDbExist.call(this, db_1.Name, function (isExist) {
                            if (isExist) {
                                that._connection.openDb(db_1.Name);
                            }
                            else {
                                that._connection.createDb(db_1);
                            }
                            resolve();
                        }, function (err) {
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
            if (typeof JsStore === "undefined") {
                new SqlJs.Error(SqlJs.Errors.JsStoreUndefined).throw();
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