import * as parser from './../output/parser';
import { Util } from './util';
import { Query } from '.';

declare var JsStore;
export class Instance {
    private connection_;
    constructor(workerPath) {
        this.connection_ = workerPath == null ? new JsStore.Instance() :
            new JsStore.Instance(new Worker(workerPath));
    }

    private isString_(value) {
        return Util.isString(value);
    }

    runQuery(query: string | Query) {
        try {
            let result;
            if (this.isString_(query) === true) {
                result = parser.parse(query);
            }
            else {
                result = (query as Query).query_;
            }
            return this.connection_[result.api](result.data);
        }
        catch (ex) {
            return new Promise((resolve, reject) => {
                reject(ex);
            });
        }
    }
}