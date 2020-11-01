import { parseSql } from './parse_sql';
import { Query } from './query';

// tslint:disable-next-line
export default {
    setup: (connection, params) => {
        connection.$sql = {
            run: (query) => {
                const result = parseSql(query);
                return connection[result.api](result.data);
            },
            Query: Query
        };
    }
};