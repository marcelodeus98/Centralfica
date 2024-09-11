const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Chats extends Model {}

Chats.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Chats',
    tableName: 'chats',
    timestamps: false, 
});

module.exports = Chats;