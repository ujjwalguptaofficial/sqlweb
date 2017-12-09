module SqlJs {
    export interface IMap {
        _key: string,
        _value: any
    }
    export class Query {
        _qry: string;
        _maps: Array<IMap> = [];
        _api: string;
        _splittedQry: Array<string>;
        constructor(qry: string) {
            this._qry = qry.toLowerCase();
            this._splittedQry = this._qry.split(" ");
            this._api = this._splittedQry[0];
        }

        map = function (key, value) {
            this._maps.push(<IMap>{
                _key: key,
                _value: value
            });
        }
    }
}