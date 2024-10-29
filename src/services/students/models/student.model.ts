import  { DataTypes,Model ,Sequelize} from "sequelize";

interface Student{
    id: number;
    studentId: number;
    classId: number;
    rollNumber: number;
    parentId: number;
    timeTtableId: number;   
}
class StudentAttributes extends Model<Student,Student>{
     

}

const StudentModel=(sequelize:Sequelize)=>{
   const student= StudentAttributes.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        studentId:{type: DataTypes.INTEGER,allowNull:false,references: {
            model: 'Users', 
            key: 'id',
          },},
        classId:{type: DataTypes.INTEGER,allowNull:false},
        rollNumber:{type: DataTypes.INTEGER,allowNull:true},
        parentId: {type: DataTypes.INTEGER,allowNull:false},
        timeTtableId:{type: DataTypes.INTEGER,allowNull:true},
    },{
        sequelize,
        tableName: 'students',
        timestamps: true,
        freezeTableName: true,
    })
    return student;
}

export {StudentModel,StudentAttributes}