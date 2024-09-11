const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Stream extends Model {}

Stream.init({
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
    modelName: 'Stream',
    tableName: 'stream',
    timestamps: false, 
});

module.exports = Stream;