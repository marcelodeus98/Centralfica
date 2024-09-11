const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Ajuste o caminho conforme necessário

class ImgerBan extends Model {}

ImgerBan.init({
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
    modelName: 'ImgerBan',
    tableName: 'imgerban',
    timestamps: false
});

module.exports = ImgerBan;
