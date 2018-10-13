
import { Util } from './util';
import { Query } from '.';
import { Config } from './config';
import { LogHelper } from './log_helper';
import { ERROR_TYPE } from './enums';
declare var JsStore;

export class Instance {
    private jsStoreCon_;
    constructor(workerPath) {
        this.jsStoreCon_ = workerPath == null ? new JsStore.Instance() :
            new JsStore.Instance(new Worker(workerPath));
    }

    private isString_(value) {
        return Util.isString(value);
    }

    private parseSql_(query: string) {
        return Util.parseSql(query);
    }

    runQuery(query: string | Query) {
        try {
            let result;
            if (this.isString_(query) === true) {
                result = this.parseSql_(query as string);
            }
            else {
                result = (query as Query).query_;
            }
            return this.jsStoreCon_[result.api](result.data);
        }
        catch (ex) {
            // let err;
            // if (ex.name === "SyntaxError") {
            //     err = new LogHelper(ERROR_TYPE.SynTaxError, ex.message).get();
            // }
            // else {
            //     err = ex;
            // }
            return new Promise((resolve, reject) => {
                reject(ex);
            });
        }
    }

    /**
     * set log status, accepts boolean value
     *
     * @param {boolean} status
     * @memberof Instance
     */
    setLogStatus(status: boolean) {
        Config.isLogEnabled = status;
    }
}