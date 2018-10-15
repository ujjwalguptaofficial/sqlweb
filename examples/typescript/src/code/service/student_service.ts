import { BaseService } from './base_service';
import { Student } from '../model/student';
import { Query } from 'sqlweb';

export class StudentService extends BaseService {
    private tableName_ = "students";
    getStudents() {
        return this.connection.runSql(`select from ${this.tableName_}`);
    }

    addStudent(student: Student) {
        const qry = new Query(`insert into ${this.tableName_} 
        values 
        ({name:@name,gender:@gender,country:@country,city:@city})
        `);
        qry.map("@name", student.name);
        qry.map("@gender", student.gender);
        qry.map("@country", student.country);
        qry.map("@city", student.city);

        // below code is equaivalent of above - another way of using insert
        // const qry = new Query(`insert into ${this.tableName_} values=@values return`);
        // qry.map('@values', [student]);

        return this.connection.runSql(qry);
    }

    deleteStudent(studentId: number) {
        return this.connection.runSql(`remove from ${this.tableName_} where id= ${studentId}`);
    }

    getStudent(studentId: number) {
        return this.connection.runSql(`select from ${this.tableName_} where id= ${studentId}`);
    }

    updateStudent(studentId: number, updateData) {
        const qry = `update ${this.tableName_} set 
        name=${updateData.name},
        gender=${updateData.gender},
        country=${updateData.country},
        city=${updateData.city} 
        where id=${studentId}`;

        return this.connection.runSql(qry);
    }
}