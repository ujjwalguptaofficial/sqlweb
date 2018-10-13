import {
    sqlWebInstance
} from "./idb_service";
export class BaseService {

    constructor() {
        this.dbName = "students_db";
        this.initJsStore();
    }

    get sqlWebObj() {
        return sqlWebInstance;
    }

    initJsStore() {
        this.sqlWebObj.runQuery(`ISDBEXIST ${this.dbName}`).then((isExist) => {
            if (isExist) {
                const qry = 'OPENDB ' + this.dbName;
                this.sqlWebObj.runQuery(qry);
            } else {
                const qry = this.getDbQuery();
                this.sqlWebObj.runQuery(qry);
            }
        }).catch(err => {
            console.error(err);
        })
    }

    getDbQuery() {
        const db = `DEFINE DB ${this.dbName};`;
        const tblStudentQry = `DEFINE TABLE students(
            id PRIMARYKEY AUTOINCREMENT,
            name STRING NOTNULL ,
            gender NOTNULL DISABLESEARCH,
            country NOTNULL STRING,
            city STRING NOTNULL
        )`
        const dbCreatequery = db + tblStudentQry;
        return dbCreatequery;
    }
}