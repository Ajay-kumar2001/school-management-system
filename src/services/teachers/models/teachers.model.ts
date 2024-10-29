import { Sequelize, Model, DataTypes } from 'sequelize';

interface TeacherDetailsAttributes {
  id: number;
  userId: number;
  qualificationLevel: 'Bachelor' | 'Master' | 'Doctorate';
  teachingCertification: string;
  yearsOfExperience: number;
  certificationId?: number; // Optional since this will not be set explicitly
  name: string;
  issuingBody: string;
  dateObtained: Date;
  certificateUpload: string;
  subjectId?: number; // Optional since this will not be set explicitly
  subjectName: string;
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
      certificationId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      issuingBody: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dateObtained: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      certificateUpload: {
        type: DataTypes.STRING(255),
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
