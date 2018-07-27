import * as parser from './../output/parser';
import { Util } from './util';

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

    runQuery(query) {
        let result;
        if (this.isString_(query) === true) {
            result = parser.parse(query);
        }
        else {
            result = query;
        }
        return this.connection_[result.api](result.data);
    }
}