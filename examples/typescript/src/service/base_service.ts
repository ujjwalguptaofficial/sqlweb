import { con } from "./idb_helper";

export class BaseService {

    private dbName_ = "Ts_Student_Demo";

    constructor() {
        // initiate database when a service instance is initiated
        this.initDatabase();
    }

    /**
     * create database
     * 
     * @memberof IdbService
     */
    async initDatabase() {
        const qry = this.getDbQuery_();
        try {
            await this.connection.$sql.run(qry);
        }
        catch (ex) {
            console.error(ex);
        }
    }

    private getDbQuery_() {
        const db = `DEFINE DB ${this.dbName_};`;
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

    get connection() {
        return con as any;
    }

}
