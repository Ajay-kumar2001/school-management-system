import {Sequelize,ModelStatic,} from "sequelize";
import  {User,UserModel} from "../services/userservice/models/user.model";
import { TeachersModel,TeacherAttributs } from "../services/teachers/models/teachers.model";
import { StudentModel,StudentAttributes } from "../services/students/models/student.model";
import { EducationModel,EducationAttributes } from "../services/education/models/educational.model";
import { DocumentModel,DocumentAttributes } from "../services/education/models/documents.model";
export const connection=new Sequelize(
    process.env.DB_DATABASE as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
)
connection.authenticate().then(()=>console.log("database connected successfully"))
.catch((error:any)=>console.log(`failed to connect to databas error: ${error.message}`))

interface Connection{
    Sequelize: typeof Sequelize;
    connection:Sequelize;
    UserModel: ModelStatic<User>;
    TeachersModel: ModelStatic<TeacherAttributs>;
    StudentModel: ModelStatic<StudentAttributes>;
    DocumentModel: ModelStatic<DocumentAttributes>;
    EducationModel: ModelStatic<EducationAttributes>;

}
const  dataBase:Connection={
    Sequelize,
    connection:connection,
    UserModel: UserModel(connection),
    TeachersModel: TeachersModel(connection),
    StudentModel: StudentModel(connection),
    DocumentModel: DocumentModel(connection),
    EducationModel: EducationModel(connection),
 
}

//{alter:true}
// { force: false }

// connection.sync({alter:true}).then(() => console.log('Database tables synced.'))
// .catch((error: unknown) => console.error('Error syncing database:', error));
export default dataBase