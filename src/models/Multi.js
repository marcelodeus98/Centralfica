const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Multi extends Model {}

Multi.init({
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
    modelName: 'Multi',
    tableName: 'multi',
    timestamps: false, 
});

module.exports = Multi;