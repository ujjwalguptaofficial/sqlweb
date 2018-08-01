const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
const reviver = function (key, value) {
    if (typeof value === "string" && dateFormat.test(value)) {
        return new Date(value);
    }

    return value;
};
export class Util {
    static isString(value) {
        return typeof value === 'string'
    }

    static parseJson(value) {
        return JSON.parse(value, reviver);
    }
}