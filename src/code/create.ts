namespace SqlJs {
    export class Create {
        _query: Query;
        _index_for_loop: number = 0;
        constructor(qry: Query) {
            this._query = qry;
        }

        getDb = function () {
            const queries = this._query._stringQry.split(";");
            var database, tables = [];
            queries.forEach(function (item) {
                if (item.length > 0) {
                    var query = new Query(item);
                    var keys = query.getMappedKeys();
                    if (keys.length > 0) {
                        var values = this._query.getMappedValues(keys);
                        if (values.length === keys.length) {
                            values.forEach((value) => {
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
            console.log(database);
            return database;
        };

        private getKeyWordsValue = function () {
            const keywords_value = [
                { value: 'Name', rules: 'getName' },
                { value: 'Name', rules: 'getName' },
                { value: 'Columns', rules: 'getColumns' }
            ];
            return keywords_value;
        };

        private getIndexofColumnQuery = function () {
            var index = 0;
            for (var j = this._index_for_loop, length = this._query._stringQry.length;
                (j > 0 && index < length); index++) {
                if (this._query._stringQry[index] === " ") {
                    j--;
                }
            }
            return index;
        };

        private getColumns = function () {
            var column_query = this._query._stringQry.substr(this.getIndexofColumnQuery()).
                replace(/[()]/g, '').split(','),
                columns = [];
            column_query.forEach(function (item: string) {
                if (item.length > 0) {
                    const query = new Query(item);
                    columns.push(new Column(query).getQuery());
                }
            });
            return columns;
        };

        private getValue = function (rule) {
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

        private getName() {
            var value = this._query._splittedQry[++this._index_for_loop];
            return this._query._splittedQry[this._index_for_loop + 1].indexOf('@') >= 0 ?
                this._query.getMapValue(this._query._splittedQry[++this._index_for_loop]) : value;
            // this._query._splittedQry[this._index_for_loop];
            // return value === 'name' ?
            // this._query.getMapValue(this._query._splittedQry[++this._index_for_loop]) : value;
        }

        private getQuery = function () {
            var query: object = {};
            const keywords = ['database', 'table', '('];

            for (var i = this._index_for_loop, length = this._query._splittedQry.length; i < length;) {
                var index_of_keywords = keywords.indexOf(this._query._splittedQry[i]);
                if (index_of_keywords >= 0) {
                    const keywords_value = this.getKeyWordsValue();
                    this._index_for_loop = i;
                    query[keywords_value[index_of_keywords].value] =
                        this.getValue(keywords_value[index_of_keywords].rules);
                    i = this._index_for_loop;
                }
                i++;
            }
            return query;
        };

    }
}