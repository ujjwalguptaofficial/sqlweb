import { Query } from '.';
export declare class Instance {
    private connection_;
    constructor(workerPath: any);
    private isString_(value);
    runQuery(query: string | Query): any;
}
