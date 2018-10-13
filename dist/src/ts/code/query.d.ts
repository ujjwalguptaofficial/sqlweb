export declare class Query {
    query_: any;
    private topLevelKeys_;
    constructor(qry: string);
    map(key: string, value: any): void;
    private isString_(value);
    private parseJson_(value);
    private parseSql_(value);
}
