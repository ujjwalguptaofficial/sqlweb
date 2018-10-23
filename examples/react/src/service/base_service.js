import {
    idbCon
} from "./idb_service";
export class BaseService {

    constructor() {
        this.dbName = "students_db";
        this.connection.setLogStatus(true);
        this.initJsStore();
    }

    get connection() {
        return idbCon;
    }

    initJsStore() {
        this.connection.runSql(`ISDBEXIST ${this.dbName}`).then((isExist) => {
            if (isExist) {
                const qry = 'OPENDB ' + this.dbName;
                this.connection.runSql(qry);
            } else {
                const qry = this.getDbQuery();
                this.connection.runSql(qry);
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