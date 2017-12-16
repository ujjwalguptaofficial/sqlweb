namespace SqlJs {
    export class BulkInsert {
        _query: Query;
        _index_for_loop: number = 0;
        constructor(qry: Query) {
            this._query = qry;
        }

        getKeyWordsValue = function () {
            const keywords_value = [
                { value: 'Into', rules: 'next' },
                { value: 'Values', rules: 'next' }
            ];
            return keywords_value;
        };

        getQuery = function () {
            var query: object = {};
            const keywords = ['into', 'values'];

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

        getValue = function (rule) {
            switch (rule) {
                case 'next':
                    var value = this._query._splittedQry[++this._index_for_loop];
                    return (this._query.getMapValue(value));
                case 'true':
                    return true;
                default:
            }
        };
    }
}