namespace SqlJs {
    export class Insert {
        query: Query;
        index_for_loop: number = 0;
        constructor(qry: Query) {
            this.query = qry;
        }

        getQuery = function () {
            var query: object = {};
            const keywords = ['into', 'values', 'skipdatacheck'];
            const keywords_value = [
                { value: 'Into', rules: 'next' },
                { value: 'Values', rules: 'next' },
                { value: 'SkipDataCheck', rules: '' }];
            for (var i = this.index_for_loop, length = this.query._splittedQry.length; i < length;) {
                var index_of_keywords = keywords.indexOf(this.query._splittedQry[i]);
                if (index_of_keywords >= 0) {
                    this.index_for_loop = i;
                    query[keywords_value[index_of_keywords].value] =
                        this.getValue(keywords_value[index_of_keywords].rules);
                    i = this.index_for_loop;
                }
                i++;
            }
            return query;
        };

        getValue = function (rule) {
            switch (rule) {
                case 'next':
                    return (this.query.getMapValue(this.query._splittedQry[++this.index_for_loop]));
                // return value.indexof('@') === 0 ? this.query.getValue() : value;
                default:
            }
        };
    }
}