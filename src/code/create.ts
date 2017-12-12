namespace SqlJs {
    export class Create {
        _query: Query;
        _index_for_loop: number = 0;
        constructor(qry: Query) {
            this._query = qry;
        }

        getKeyWordsValue = function () {
            const keywords_value = [
                { value: 'Name', rules: 'next' },
                { value: 'Name', rules: 'next' },
                { value: 'Columns', rules: 'getColumns' }
            ];
            return keywords_value;
        };

        getIndexofColumnQuery = function () {
            var index = 0;
            for (var j = this._index_for_loop, length = this._query._stringQry.length;
                (j > 0 && index < length); index++) {
                if (this._query._stringQry[index] === " ") {
                    j--;
                }
            }
            return index;
        };

        getColumns = function () {
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

        getQuery = function () {
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

        getValue = function (rule) {
            switch (rule) {
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
    }
}