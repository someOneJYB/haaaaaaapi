const TABLE_NAME = 'book';

module.exports = (sequelize, DataTypes) => sequelize.define(
    TABLE_NAME,
    {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creator: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pic: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        item_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        content1: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        image1: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        content2: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        image2: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        content3: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        image3: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        content4: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        image4: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        content5: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        image5: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        create_time: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        content6: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        image6: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        content7: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        image7: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        content8: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        image8: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        content9: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        image9: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        like_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        comment_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        }

    },
    {
        timestamps: false,
        tableName: TABLE_NAME,
    },
);
