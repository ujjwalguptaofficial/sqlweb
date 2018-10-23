import * as parser from './../output/parser';
import { Util } from './util';
export class Query {
    query_;
    private topLevelKeys_: string[] = ["skip", "limit"];
    constructor(qry: string) {
        this.query_ = this.parseSql_(qry);
    }

    map(key: string, value: any) {
        const stringifiedValue = JSON.stringify(this.query_);
        this.query_ = this.parseJson_(stringifiedValue.replace('"' + key + '"', JSON.stringify(value)));
    }

    private isString_(value) {
        return Util.isString(value);
    }

    private parseJson_(value) {
        return Util.parseJson(value);
    }

    private parseSql_(value) {
        return Util.parseSql(value);
    }
}