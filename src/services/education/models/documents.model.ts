import { Sequelize, Model, DataTypes,  } from "sequelize";

// Interface for the Document model
interface DocumentDetails {
    id: number;
    userId: number;
    documentType: string;
    documentName: string;
    documentLink: string;
}

// Optional interface for creation

class DocumentAttributes extends Model<DocumentDetails, DocumentDetails>  {
    public id!: number; // Note that the `!` symbol means this field is required.
    public userId!: number;
    public documentType!: string;
    public documentName!: string;
    public documentLink!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

const DocumentModel = (sequelize: Sequelize) => {
    DocumentAttributes.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true, 
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false, 
                references: {
                    model: 'Users', 
                    key: 'id',
                },
            },
            documentType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            documentName: {
                type: DataTypes.STRING,
                allowNull: false, 
            },
            documentLink: {
                type: DataTypes.STRING,
                allowNull: false, 
            },
        },
        {
            sequelize,
            tableName: 'documents', 
            timestamps: true,
            freezeTableName: true,
        }
    );

    return DocumentAttributes;
};

export {DocumentModel,DocumentAttributes} ;
