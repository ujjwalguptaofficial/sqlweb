import * as parser from '../build/parser';
import { LogHelper } from './log_helper';
import { ERROR_TYPE } from './enums';

const reviver = (key, value) => typeof value === 'string' &&
    /^\d{4}-\d\d-\d\dT\d\d:\d\d:(?:\d\d(?:\.\d{3})?)?Z$/.test(value)
        ? new Date(Date.parse(value))
        : value;

export class Util {
    static isString(value) {
        return typeof value === 'string';
    }

    static parseJson(json) {
        return JSON.parse(json, reviver);
    }

    static parseSql(query: string) {
        try {
            return parser.parse(query.replace(/\s+/g, ' ').trim());
        }
        catch (ex) {
            const err = new LogHelper(ERROR_TYPE.SynTaxError, ex.message).get();
            throw err;
        }
    }
}
