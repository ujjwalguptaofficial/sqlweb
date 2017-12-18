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
                { value: 'In', rules: 'next' }
            ];
            return keywords_value[index];
        };

        getQuery = function () {
            var query: object = {},
                or_query = {};
            const keywords = ['like', 'in', 'or'];
            for (var i = this._index_for_loop, length = this._query._splittedQry.length; i < length;) {
                var value = this._query._splittedQry[i],
                    index_of_keywords = keywords.indexOf(value);
                var key;
                // if (value.toLowerCase() === "and") {
                //     query[this._query._splittedQry[++i]] = this._query._splittedQry[++i];
                // }
                // else if (value.toLowerCase() === "or") {
                //     or_query[this._query._splittedQry[++i]] = this._query._splittedQry[++i];
                // }
                // else {
                //     query[this._query._splittedQry[i]] = this._query._splittedQry[++i];
                // }
                // if (value.toLowerCase() === "and") {
                //     key = query[this._query._splittedQry[++i]];
                // }
                // else if (value.toLowerCase() === "or") {
                //     key = or_query[this._query._splittedQry[++i]];
                // }
                // else {
                //     key = query[this._query._splittedQry[i]];
                // }
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
            if (Object.keys(or_query).length) {
                query['Or'] = or_query;
            }
            return query;

        };

        getValue = function (index) {
            const keywords = ['like', 'in'];
            var value = this._query._splittedQry[++index],
                index_of_keywords = keywords.indexOf(value.toLowerCase());
            if (index_of_keywords >= 0) {
                value = {};
                value[this.getKeyWordValue(index_of_keywords).value] =
                    this._query.getMapValue(this._query._splittedQry[++index]);
                this._index_for_loop = index + 1;
                return value;
            }
            else {
                this._index_for_loop = index + 1;
                return (this._query.getMapValue(value));
            }

        };
    }
}