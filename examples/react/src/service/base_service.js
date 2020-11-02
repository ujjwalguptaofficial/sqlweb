import { idbCon } from "./idb_service";
export class BaseService {

    constructor() {
        this.dbName = "students_db";
        this.initJsStore();
    }

    get connection() {
        return idbCon;
    }

    initJsStore() {
        const qry = this.getDbQuery();
        this.connection.$sql.run(qry).then(function () {
            console.log('db initiated');
        }).catch(function (ex) {
            console.error(ex);
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