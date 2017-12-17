namespace SqlJs {
    export class Where {
        _query: Query;
        _index_for_loop: number = 0;
        constructor(qry: Query) {
            this._query = qry;
        }

        getKeyWordValue = function (index) {
            const keywords_value = [
                { value: 'Like', rules: 'next' },
                { value: 'In', rules: 'next' },
                { value: 'Or', rules: 'true' }
            ];
            return keywords_value[index];
        };

        getQuery = function () {
            var query: object = {},
                or_query = {};
            const keywords = ['like', 'in', 'or'];
            for (var i = this._index_for_loop, length = this._query._splittedQry.length; i < length;) {
                var value = this._query._splittedQry[i].toLowerCase(),
                    index_of_keywords = keywords.indexOf(value);
                if (value.toLowerCase() === "and") {
                    query[this._query._splittedQry[++i]] = this._query._splittedQry[++i];
                }
                else {
                    query[this._query._splittedQry[i]] = this._query._splittedQry[++i];
                }

                // if (index_of_keywords >= 0) {
                //     const keyword_value = this.getKeyWordValue(i);
                //     this._index_for_loop = i;
                //     query[keyword_value.value] = this.getValue(keyword_value.rules);
                //     i = this._index_for_loop;
                // }
                // i++;
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