export declare class Query {
    private query_;
    private topLevelKeys_;
    constructor(qry: string);
    map(key: string, value: any): void;
    private isString_(value);
}
