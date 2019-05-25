const TABLE_NAME = 'likes';

module.exports = (sequelize, DataTypes) => sequelize.define(
    TABLE_NAME,
    {
        like_man: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        item_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER, // int, 32 bit integer
            primaryKey: true, // 定义主键
            autoIncrement: true, //自动递增,
        }
    },
    {
        timestamps: false,
        tableName: TABLE_NAME,
    },
);
