import { Sequelize, Model, DataTypes } from "sequelize";

// Define the interface for EducationDetails
interface EducationDetails {
  id: number;
  userId: number;
  schoolName: string;
  class: string;
  position :string;
  durationFrom?: Date;
  durationTo?: Date;
  schoolAddress?: string;
  percentage?: number;
  tcUpload?: string;
  subjectsStudied?: string;
  achievements?: string;
  extracurricularActivities?: string;
  reasonForLeaving?: string;
  specialization: string;  // Added specialization
  yearOfCompletion: string; // Added yearOfCompletion
  certificates?: string;
}

// Extend the Model class with the interface
class EducationAttributes extends Model<EducationDetails> implements EducationDetails {
  public id!: number;
  public userId!: number;
  public schoolName!: string;
  public class!: string;
public position!: string;
  public durationFrom?: Date;
  public durationTo?: Date;
  public schoolAddress?: string;
  public percentage?: number;
  public tcUpload?: string;
  public subjectsStudied?: string;
  public achievements?: string;
  public extracurricularActivities?: string;
  public reasonForLeaving?: string;
  public specialization!: string; // Added specialization
  public yearOfCompletion!: string; // Added yearOfCompletion
  public certificates?: string;
}

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
      schoolName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      class: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      position : {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      durationFrom: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      durationTo: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      schoolAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      tcUpload: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      subjectsStudied: {
        type: DataTypes.TEXT,
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
      reasonForLeaving: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      specialization: {
        type: DataTypes.STRING(255),
        allowNull: false, 
      },
      yearOfCompletion: {
        type: DataTypes.STRING(4), 
        allowNull: false, 
      },
      certificates: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'previousEducationDetails',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return education;
};

export { EducationModel, EducationAttributes };
