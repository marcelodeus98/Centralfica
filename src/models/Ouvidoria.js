const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Ouvidoria extends Model {}

Ouvidoria.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    texto: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    data_envio:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Ouvidoria',
    tableName: 'ouvidoria',
    timestamps: false, 
});

module.exports = Ouvidoria;