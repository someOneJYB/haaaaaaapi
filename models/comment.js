const TABLE_NAME = 'comment';

module.exports = (sequelize, DataTypes) => sequelize.define(
    TABLE_NAME,
    {
        item_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment_pic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER, // int, 32 bit integer
            primaryKey: true, // 定义主键
            autoIncrement: true, //自动递增,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
    },
{
    timestamps: false,
        tableName: TABLE_NAME,
},
);
