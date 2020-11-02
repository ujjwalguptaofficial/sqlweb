import { con } from "./idb_service";

export class BaseService {

    constructor() {
        this.dbName = "students_db";
        this.initJsStore();
    }

    get connection() {
        return con;
    }

    async initJsStore() {
        const qry = this.getDbQuery();
        try {
            await this.connection.$sql.run(qry);
        }
        catch (ex) {
            console.error(ex);
        }
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