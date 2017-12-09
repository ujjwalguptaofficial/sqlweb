declare module SqlJs {
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
        private get;
        throw: () => never;
        print: (isWarn?: boolean) => void;
    }
}
declare module SqlJs {
    interface IMap {
        _key: string;
        _value: any;
    }
    class Query {
        _qry: string;
        _maps: Array<IMap>;
        _api: string;
        _splittedQry: Array<string>;
        constructor(qry: string);
        map: (key: any, value: any) => void;
    }
}
declare module SqlJs {
    class Insert {
        constructor(qry: string);
    }
}
declare module SqlJs {
    class Select {
        constructor(msg: string);
    }
}
declare module SqlJs {
    class Instance {
        _connection: JsStore.Instance;
        _query: Query;
        constructor(jsstoreCon: JsStore.Instance);
        run: (qry: Query) => void;
    }
}
