import { IError } from "./interfaces";
import { ERROR_TYPE } from "./enums";
import { Config } from "./config";

export class LogHelper implements IError {
    type: ERROR_TYPE;
    message: string;
    private info_: any;

    constructor(type: ERROR_TYPE, info: any = null) {
        this.type = type;
        this.info_ = info;
        this.message = this.getMsg_();
    }

    static log(msg) {
        if (Config.isLogEnabled) {
            console.log(msg);
        }
    }

    logError() {
        console.error(this.get());
    }

    logWarning() {
        console.warn(this.get());
    }

    get() {
        return {
            message: this.message,
            type: this.type
        } as IError;
    }

    private getMsg_() {
        let errMsg: string;
        switch (this.type) {
            case ERROR_TYPE.SynTaxError:
                this.message = this.info_;
                break;
            default:
                errMsg = this.message;
                break;
        }
        return errMsg;
    }
}