const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Curriculos extends Model {}

Curriculos.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    arquivo_nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    arquivo_tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    arquivo_tamanho: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    arquivo_conteudo:{
        type: DataTypes.BLOB('long'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Curriculos',
    tableName: 'curriculos',
    timestamps: false, 
});

module.exports = Curriculos;