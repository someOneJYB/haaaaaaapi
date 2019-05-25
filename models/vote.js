const TABLE_NAME = 'vote';

module.exports = (sequelize, DataTypes) => sequelize.define(
    TABLE_NAME,
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        creator: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        num: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        vote_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '',
        }
    },
    {
        timestamps: false,
        tableName: TABLE_NAME,
    },
);
