import {  Model, Sequelize } from "sequelize";

// Define the interface for User model attributes
interface User {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender?: string;
  contactNumber: string;
  email: string;
  profilePicture?: string;
  userType?: string;
  socketId?: string;
}

// Define the interface that extends both Sequelize's Model and User attributes
export interface UserInterface extends Model<User>, User {}

// Define enums for fields like gender or userType if applicable
enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

enum UserType {
  admin = "Admin",
  student = "student",
  parent = "parent",
  teacher = "teacher",
}

// Define the User model
const userModel = (sequelize: Sequelize,DataTypes:any) => {
  const User = sequelize.define<UserInterface>(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY, // Better suited for storing just the date
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(Gender)), // Using an enum for gender
        allowNull: true,
      },
      contactNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Email format validation
        },
      },
      profilePicture: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      userType: {
        type: DataTypes.ENUM(...Object.values(UserType)), // Using an enum for user types
        allowNull: true,
      },
      socketId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt
      paranoid: true,   // Adds deletedAt column for soft deletes
      freezeTableName: true, // Disables automatic pluralization of table name
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
        },
      ],
    }
  );

  return User;
};

export default userModel;
