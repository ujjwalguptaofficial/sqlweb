import { Query } from '.';
export declare class Instance {
    private jsStoreCon_;
    constructor(workerPath: any);
    private isString_(value);
    runQuery(query: string | Query): any;
    /**
     * set log status, accepts boolean value
     *
     * @param {boolean} status
     * @memberof Instance
     */
    setLogStatus(status: boolean): void;
}
