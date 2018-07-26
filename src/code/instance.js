import * as JsStore from 'jsstore';
const parser = require('../output/parser');

export class Instance {
    constructor(workerPath) {
        this.connection_ = new JsStore.Instance(new Worker(workerPath));
    }

    execute(query) {
        var result = parser.parse(query);
        return this.connection_[result.api](result.data);
    }
}