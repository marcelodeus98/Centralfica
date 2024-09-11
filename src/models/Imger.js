const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Ajuste o caminho conforme necessário

class Imger extends Model {}

Imger.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Imger',
    tableName: 'imger',
    timestamps: false
});

module.exports = Imger;
