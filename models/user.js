const TABLE_NAME = 'user';

module.exports = (sequelize, DataTypes) => sequelize.define(
    TABLE_NAME,
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        info: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        pic: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        }
    },
    {
        timestamps: false,
        tableName: TABLE_NAME,
    },
);
