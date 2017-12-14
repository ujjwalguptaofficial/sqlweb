namespace SqlJs {
    export class Column {
        _query: Query;
        _index_for_loop: number = 0;
        constructor(qry: Query) {
            this._query = qry;
        }

        getKeyWordsValue = function () {
            const keywords_value = [
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

        getQuery = function () {
            var query: object = {
                // Name: this._query._splittedQry[this._index_for_loop++]
                Name: this.getName()
            };
            const keywords = ['primary_key', 'pk', 'primarykey', 'not_null', 'notnull',
                'autoincrement', 'auto_increment', 'unique', 'default', 'string', 'boolean', 'object', 'number'];
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
            const data_type = ['string', 'boolean', 'object', 'number'];
            for (var prop in query) {
                if (data_type.indexOf(prop) >= 0) {
                    query['DataType'] = prop;
                }
            }
            return query;
        };

        private getValue = function (rule) {
            switch (rule) {
                case 'next':
                    var value = this._query._splittedQry[++this._index_for_loop];
                    return (this._query.getMapValue(value));
                case 'true':
                    return true;
                default:
            }
        };

        private getName() {
            return this._query._splittedQry[this._index_for_loop + 1].indexOf('@') >= 0 ?
                this._query.getMapValue(this._query._splittedQry[++this._index_for_loop]) :
                this._query._splittedQry[this._index_for_loop];
            // var value = this._query._splittedQry[this._index_for_loop];
            // return value === 'name' ? 
            // this._query.getMapValue(this._query._splittedQry[++this._index_for_loop]) : value;
        }
    }
}