import { Sequelize, Model, DataTypes } from 'sequelize';

interface TeacherDetailsAttributes {
  id: number;
  userId: number;
  qualificationLevel: string;
  teachingCertification: string;
  yearsOfExperience: number;
  subjectId?: number;
  subjectName: string;
  schoolName: string;
  position: string;                      // Added this field
  joiningDate: number;                     // Changed to this field
  relievingDate: number;                 // Changed to this field
  responsibilities: string;
  achievements: string;
  reasonForLeaving: string;
  subjectsCanTeach: string[];            // Array of subjects
  gradeLevel: string[];                  // Array of grade levels
  skills: string[];                      // Array of skills
  teachingMethodology: string;
  classManagementApproach: string;
  technologyProficiency: string;
  certificates?: string[];

}

class TeacherAttributs extends Model<TeacherDetailsAttributes, TeacherDetailsAttributes> {}

const TeachersModel = (sequelize: Sequelize): typeof TeacherAttributs => {
  TeacherAttributs.init(
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
      qualificationLevel: {
        type: DataTypes.ENUM('Bachelor', 'Master', 'Doctorate'),
        allowNull: false,
      },
      teachingCertification: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      yearsOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subjectId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      subjectName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      schoolName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      position: {                           // Added this field
        type: DataTypes.STRING(100),
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
      certificates: {
        type: DataTypes.JSON, // Array of certificates
        allowNull: true,
      },
      responsibilities: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      achievements: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reasonForLeaving: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      subjectsCanTeach: {
        type: DataTypes.JSON, // Array of subjects
        allowNull: false,
      },
      gradeLevel: {
        type: DataTypes.JSON, // Array of grade levels
        allowNull: false,
      },
      skills: {
        type: DataTypes.JSON, // Array of skills
        allowNull: false,
      },
      teachingMethodology: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      classManagementApproach: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      technologyProficiency: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Teachers',
      timestamps: true, // adds createdAt and updatedAt fields
    }
  );

  return TeacherAttributs;
};

export { TeachersModel, TeacherAttributs, TeacherDetailsAttributes };
