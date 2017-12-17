namespace SqlJs {
    export class Select {
        _query: Query;
        _index_for_loop: number = 0;
        constructor(qry: Query) {
            this._query = qry;
        }

        getKeyWordsValue = function () {
            const keywords_value = [
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

        getQuery = function () {
            var query: object = {};
            const keywords = this.getKeyWords();

            for (var i = this._index_for_loop, length = this._query._splittedQry.length; i < length;) {
                var index_of_keywords = keywords.indexOf(this._query._splittedQry[i].toLowerCase());
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

        private getKeyWords = function () {
            const keywords = ['from', 'where', 'ignorecase', 'ignore_case', 'skip', 'distinct', 'order', 'min',
                'max', 'count', 'sum', 'avg', 'group'];
            return keywords;
        };

        private getWhere = function () {
            ++this._index_for_loop;
            const keywords = this.getKeyWords();
            var where_query = "";
            for (var j = this._index_for_loop, length = this._query._splittedQry.length; j < length;) {
                var index_of_keywords = keywords.indexOf(this._query._splittedQry[j].toLowerCase());
                if (index_of_keywords >= 0) {
                    where_query = this._query._splittedQry.slice(this._index_for_loop, j + 1);
                    return;
                }
                j++;
            }
            return new Where(new Query(where_query)).getQuery();
        };

        private getValue = function (rule) {
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
    }
}