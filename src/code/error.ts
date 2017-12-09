module SqlJs {
    export enum Errors {
        JsStoreUndefined = "Jstore_undefined",
        UndefinedCon = "undefined_connection",
        Undefined = "undefined"
    }

    export interface IError {
        _type: Errors,
        _message: string
    }

    export class Error implements IError {
        _type: Errors;
        _message: string;
        _info: any;
        constructor(type: Errors, info: any = null) {
            this._type = type;
            this._info = info;
        }

        private get = function () {
            var error_obj = <IError>{
                _type: this._type,
                _message: this._message
            }

            switch (this._type) {
                case Errors.UndefinedCon:
                    error_obj._message = "jsstore connection is not defined";
                    break;
                case Errors.JsStoreUndefined:
                    error_obj._message = "jsstore is not defined";
                    break;
                default:
                    error_obj._message = 'the error type is not defined';
                    break;
            }
            return error_obj;
        }

        throw = function () {
            throw this.get();
        }

        print = function (isWarn: boolean = false) {
            var error_obj = this.get();
            if (isWarn) {
                console.warn(error_obj);
            }
            else {
                console.error(error_obj);
            }
        }
    }
}