import * as parser from './../output/parser';
import { Util } from './util';
export class Query {
    private query_;
    private topLevelKeys_: string[] = ["skip", "limit"]
    constructor(qry: string) {
        this.query_ = parser.parse(qry);
    }

    map(key: string, value: any) {
        // if (this.topLevelKeys_.findIndex(q => q === key) >= 0) {
        //     this.query_[key] = value;
        // }
        // else {
        //     this.query_.where.forEach(qry => {
        //         for (var objKey in qry) {
        //             if (objKey === key) {

        //             }
        //             var value = qry[objKey];
        //         }
        //     });
        // }
        var stringifiedValue = JSON.stringify(this.query_);
        var indexOfKey = stringifiedValue.indexOf(key);
        if (indexOfKey >= 0) {
            var colonIndex = indexOfKey - 2;
            var countQuote = 0;
            var firstQuoteIndex;
            var lastQuoteIndex;
            while (countQuote < 2 && colonIndex >= 0) {
                if (stringifiedValue[colonIndex] === '"' || stringifiedValue[colonIndex] === "'") {
                    ++countQuote;
                    if (countQuote == 2) {
                        firstQuoteIndex = colonIndex;
                    }
                    else {
                        lastQuoteIndex = colonIndex;
                    }
                }
                colonIndex--;
            }
            var prop = stringifiedValue.substring(firstQuoteIndex + 1, lastQuoteIndex);
            if (this.topLevelKeys_.findIndex(q => q === prop) >= 0) {
                this.query_.data[prop] = value;
            }
            else {
                switch (this.query_.api) {
                    case 'select':
                        this.query_.data.where.forEach((qry, index) => {
                            for (var objKey in qry) {
                                var val = qry[objKey];
                                if (objKey === prop && val === key) {
                                    this.query_.data.where[index][prop] = value;
                                    return;
                                }
                                else {
                                    
                                }
                            }
                        });
                        break;
                    default:
                        throw 'invalid api';
                }

            }
        }
    }

    private isString_(value) {
        return Util.isString(value);
    }
}