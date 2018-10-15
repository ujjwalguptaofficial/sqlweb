import { Query } from ".";
import { Util } from "./util";

export let parseSql = (query: string | Query) => {
    try {
        let result;
        if (Util.isString(query) === true) {
            result = Util.parseSql(query as string);
        }
        else {
            result = (query as Query).query_;
        }
        return result;
    }
    catch (ex) {
        return new Promise((resolve, reject) => {
            reject(ex);
        });
    }
};