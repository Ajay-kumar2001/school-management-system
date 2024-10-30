import { Sequelize, Model, DataTypes,  } from 'sequelize';

interface ParentDetails {
  id: number;
  userId: number;
  studentId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes separately if any fields are optional on creation

class ParentAttributes extends Model<ParentDetails, ParentDetails>   {
    getAll() {
        return ParentAttributes.findAll();
     }
     getById(id: number) {
        return ParentAttributes.findByPk(id);

     }
     create(attributes: ParentDetails) {
        return ParentAttributes.create(attributes);
     }
}

const ParentModel = (sequelize: Sequelize): typeof ParentAttributes => {
    ParentAttributes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users', 
          key: 'id',
        },
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'parents',
      timestamps: true, 
      freezeTableName: true,
    }
  );

  return ParentAttributes;
};

export { ParentModel, ParentAttributes, ParentDetails,  };
