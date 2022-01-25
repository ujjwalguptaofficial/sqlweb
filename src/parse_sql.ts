import { Query } from "./query";
import { Util } from "./util";

export let parseSql = (query: string | Query) => Util.isString(query)
    ? Util.parseSql(query as string)
    : (query as Query).query_;
};
