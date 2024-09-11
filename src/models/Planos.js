const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Planos extends Model {}

Planos.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },  
    preco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Planos',
    tableName: 'planos',
    timestamps: false, 
});

module.exports = Planos;