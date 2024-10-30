import { Sequelize, Model, DataTypes } from "sequelize";

// Define the interface for EducationDetails
interface EducationDetails {
  id: number;
  userId: number;
  class: string;
  section: string;
  classId: number;
  joiningDate: number;                     // Changed to this field
  relievingDate: number; 
  achievements?: string;
  extracurricularActivities?: string;
  specialization: string;  // Added specialization
  yearOfCompletion: string; // Added yearOfCompletion
  certificates?: number[];
  highestQualification?:string;
  additionalInfo?:string;
  institution?: string;
}

// Extend the Model class with the interface
class EducationAttributes extends Model<EducationDetails,EducationDetails>  {}

// Define and initialize the model
const EducationModel = (sequelize: Sequelize) => {
  const education = EducationAttributes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'id',
        },
      },
    section: {type: DataTypes.STRING(50),allowNull: true},
    classId: {type: DataTypes.INTEGER, allowNull: false,references: {model: 'classes', key: 'id'}},
   
      class: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      joiningDate: {                       // Changed to this field
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      relievingDate: {                     // Changed to this field
        type: DataTypes.INTEGER,       // Assuming it will hold a string, change if necessary
        allowNull: true,
      },
   
      achievements: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      extracurricularActivities: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
     
      specialization: {
        type: DataTypes.STRING(255),
        allowNull: false, 
      },
      highestQualification: {
        type: DataTypes.STRING(255),
        allowNull: true, 
      },
      additionalInfo: {
        type: DataTypes.STRING(255),
        allowNull: true, 
      },
      yearOfCompletion: {
        type: DataTypes.STRING(4), 
        allowNull: false, 
      },
      certificates: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'EducationDetails',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return education;
};

export { EducationModel, EducationAttributes };
