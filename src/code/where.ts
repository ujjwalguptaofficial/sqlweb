namespace SqlJs {
    export class Where {
        _query: Query;
        _index_for_loop: number = 0;
        constructor(qry: Query) {
            this._query = qry;
        }

        getKeyWordValue = function (index) {
            const keywords_value = ['Like', 'In', '>', '<', '>=', '<='];
            return keywords_value[index];
        };

        getQuery = function () {
            var query: object = {},
                or_query = {};
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

        getValue = function (index) {
            const keywords = ['like', 'in', '>', '<', '>=', '<='];
            var value = this._query._splittedQry[++index],
                index_of_keywords = keywords.indexOf(value.toLowerCase());
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
    }
}