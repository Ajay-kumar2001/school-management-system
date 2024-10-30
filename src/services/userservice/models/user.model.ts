import { Model, DataTypes, Sequelize } from "sequelize";

// Define enums for fields like gender or userType
enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

enum MaritalStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
}

enum UserType {
  ADMIN = "Admin",
  STUDENT = "Student",
  PARENT = "Parent",
  TEACHER = "Teacher",
}

// Define the interface for User attributes
interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;  // Use Date for consistency
  gender?: Gender;
  age?: number;  // Added to calculate age based on dateOfBirth
  contactNumber: string;
  email: string;
  profilePicture?: string;
  userType?: UserType;
  address?: string;
  nationality: string;
  maritalStatus: MaritalStatus;  // Updated to enum
  socketId?: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactNumber: string;
  medicalHistory: string;
  languages: string[];
}

// Define the User model class
class User extends Model<UserAttributes, UserAttributes> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare age: number;
  declare gender?: Gender;
  declare email: string;
  declare address?: string; // Added
  declare profilePicture?: string;
  declare emergencyContactName: string; // Added
  declare emergencyContactRelationship: string; // Added
  declare emergencyContactNumber: string; // Added
  declare contactNumber: string;
  declare dateOfBirth: Date;
  declare maritalStatus: MaritalStatus; //
  declare nationality: string; // Added
declare medicalHistory: string; // Added
  declare userType?: UserType;
  declare socketId?: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date;
  declare languages: string[]; // Added

 
}

// Initialize the User model
const UserModel = (sequelize: Sequelize) => {
  const user = User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(Gender)),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
      contactNumber: {
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
          notEmpty: true,
          is: /^[0-9]{10,15}$/, // Example regex for phone numbers
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      profilePicture: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      userType: {
        type: DataTypes.ENUM(...Object.values(UserType)),
        allowNull: true,
      },
      socketId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      nationality: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      maritalStatus: {
        type: DataTypes.ENUM(...Object.values(MaritalStatus)),
        allowNull: false,
      },
      languages: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      emergencyContactName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      emergencyContactRelationship: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      medicalHistory:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      emergencyContactNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          is: /^[0-9]{10,15}$/, // Example regex for emergency contact
        },
      },
    },
    {
      sequelize,
      tableName: "Users",
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ["email"],
          name: "email_index",
        },
        {
          fields: ["userType"],
          name: "userType_index",
        },
        {
          unique: true,
          fields: ["socketId"],
          name: "socketId_index",
          where: {
            socketId: {
              [Symbol.for('ne')]: null,
            },
          },
        },
      ],
    }
  );

  return user;
};

export { User, UserModel, UserAttributes, Gender, UserType, MaritalStatus };
