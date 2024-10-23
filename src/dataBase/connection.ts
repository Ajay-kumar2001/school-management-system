import {Sequelize,ModelStatic, DataTypes} from "sequelize";
import userModel ,{UserInterface} from "../services/userservice/models/user.model";
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
    UserModel: ModelStatic<UserInterface>;

}
const  dataBase:Connection={
    Sequelize,
    connection:connection,
    UserModel: userModel(connection,DataTypes),
}

//{alter:true}
// { force: false }

// connection.sync({ alter: true}).then(() => console.log('Database tables synced.'))
// .catch((error: unknown) => console.error('Error syncing database:', error));
export default dataBase