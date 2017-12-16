declare namespace SqlJs {
    enum Errors {
        JsStoreUndefined = "Jstore_undefined",
        UndefinedCon = "undefined_connection",
        Undefined = "undefined",
    }
    interface IError {
        _type: Errors;
        _message: string;
    }
    class Error implements IError {
        _type: Errors;
        _message: string;
        _info: any;
        constructor(type: Errors, info?: any);
        throw: () => never;
        print: (isWarn?: boolean) => void;
        private get;
    }
}
declare namespace SqlJs {
    class Query {
        _stringQry: string;
        _maps: IMap[];
        _api: string;
        _splittedQry: string[];
        constructor(qry: string);
        getMappedValues: (keys: any) => any[];
        getMappedKeys: () => any[];
        getMapValue: (key: any) => any;
        map: (key: any, value: any) => void;
        private splitQuery;
    }
}
declare namespace SqlJs {
    class Column {
        _query: Query;
        _index_for_loop: number;
        constructor(qry: Query);
        getKeyWordsValue: () => {
            value: string;
            rules: string;
        }[];
        getQuery: () => object;
        private getValue;
        private getName();
    }
}
declare namespace SqlJs {
    class Create {
        _query: Query;
        _index_for_loop: number;
        constructor(qry: Query);
        getDb: () => any;
        private getKeyWordsValue;
        private getIndexofColumnQuery;
        private getColumns;
        private getValue;
        private getName();
        private getQuery;
    }
}
declare namespace SqlJs {
    class Insert {
        _query: Query;
        _index_for_loop: number;
        constructor(qry: Query);
        getKeyWordsValue: () => {
            value: string;
            rules: string;
        }[];
        getQuery: () => object;
        getValue: (rule: any) => any;
    }
}
declare namespace SqlJs {
    class BulkInsert {
        _query: Query;
        _index_for_loop: number;
        constructor(qry: Query);
        getKeyWordsValue: () => {
            value: string;
            rules: string;
        }[];
        getQuery: () => object;
        getValue: (rule: any) => any;
    }
}
declare namespace SqlJs {
    class Select {
        constructor(msg: string);
    }
}
declare namespace SqlJs {
    class Instance {
        _isDbOpened: boolean;
        _connection: JsStore.Instance;
        _query: Query;
        constructor();
        run: (qry: Query) => any;
    }
}
declare namespace SqlJs {
    interface IMap {
        _key: string;
        _value: any;
    }
    namespace Model {
        class Map implements IMap {
            _key: string;
            _value: any;
            constructor(key: string, value: any);
        }
    }
}
