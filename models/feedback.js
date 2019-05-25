const TABLE_NAME = 'feedback';

module.exports = (sequelize, DataTypes) => sequelize.define(
    TABLE_NAME,
    {
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        robot_content: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        id: {
            type: DataTypes.INTEGER, // int, 32 bit integer
            primaryKey: true, // 定义主键
            autoIncrement: true, //自动递增,
        },
    },
    {
        timestamps: false,
        tableName: TABLE_NAME,
    },
);
