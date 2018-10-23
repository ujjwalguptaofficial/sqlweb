import { con } from "./idb_helper";
import { IError } from "sqlweb";

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
    initDatabase() {
        this.connection.runSql(`ISDBEXIST ${this.dbName_}`).then((ifExist: boolean) => {
            if (ifExist) {
                this.connection.runSql(`OPENDB ${this.dbName_}`);
            }
            else {
                const qry = this.getDbQuery_();
                this.connection.runSql(qry);
            }
        }).catch((err: IError) => {
            console.error(err);
        });
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
        return con;
    }

}
