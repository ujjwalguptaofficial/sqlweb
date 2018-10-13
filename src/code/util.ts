import * as parser from './../output/parser';
import { LogHelper } from './log_helper';
import { ERROR_TYPE } from './enums';

export class Util {
    static isString(value) {
        return typeof value === 'string'
    }

    static parseJson(value) {
        const reviver = function (key, value) {
            const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
            if (typeof value === "string" && dateFormat.test(value)) {
                return new Date(value);
            }

            return value;
        };
        return JSON.parse(value, reviver);
    }

    static parseSql(value) {
        try {
            return parser.parse(value);
        }
        catch (ex) {
            const err = new LogHelper(ERROR_TYPE.SynTaxError, ex.message).get();
            throw err;
        }
    }
}