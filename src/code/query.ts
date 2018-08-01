import * as parser from './../output/parser';
import { Util } from './util';
export class Query {
    query_;
    private topLevelKeys_: string[] = ["skip", "limit"]
    constructor(qry: string) {
        this.query_ = parser.parse(qry);
    }

    map(key: string, value: any) {
        var stringifiedValue = JSON.stringify(this.query_);
        this.query_ = JSON.parse(stringifiedValue.replace('"' + key + '"', JSON.stringify(value)));
    }

    private isString_(value) {
        return Util.isString(value);
    }
}