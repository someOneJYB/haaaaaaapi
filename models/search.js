const TABLE_NAME = 'search';

module.exports = (sequelize, DataTypes) => sequelize.define(
    TABLE_NAME,
    {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        id: {
            type: DataTypes.INTEGER, // int, 32 bit integer
            primaryKey: true, // 定义主键
            autoIncrement: true, //自动递增,
        },
        times: {
            type: DataTypes.INTEGER, // int, 32 bit integer
            allowNull: true,
            defaultValue: 1,
        },

        search: {
            type: DataTypes.STRING,
            allowNull: true,
            default: '',
        },
    },
    {
        timestamps: false,
        tableName: TABLE_NAME,
    },
);
