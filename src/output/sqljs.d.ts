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
        getMapValue: (key: any) => any;
        getWords: () => any;
        map: (key: any, value: any) => void;
    }
}
declare namespace SqlJs {
    class Insert {
        query: Query;
        index_for_loop: number;
        constructor(qry: Query);
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
        _connection: JsStore.Instance;
        _query: Query;
        constructor(jsstoreCon: JsStore.Instance);
        run: (qry: Query, onSuccess: () => any, onError: () => IError) => void;
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
            constructor(key: any, value: any);
        }
    }
}
