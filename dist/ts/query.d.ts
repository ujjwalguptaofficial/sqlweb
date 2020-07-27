export declare class Query {
    query_: any;
    private topLevelKeys_;
    constructor(qry: string);
    map(key: string, value: any): void;
    private parseJson_;
    private parseSql_;
}
