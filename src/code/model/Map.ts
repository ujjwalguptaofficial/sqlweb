namespace SqlJs {
    export interface IMap {
        _key: string;
        _value: any;
    }

    export namespace Model {
        export class Map implements IMap {
            _key: string;
            _value: any;
            constructor(key: string, value) {
                this._key = key;
                this._value = value;
            }
        }
    }
}