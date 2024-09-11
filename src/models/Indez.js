const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Indez = sequelize.define('Indez', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataPC: {
        type: DataTypes.BLOB('long'), // Para grandes quantidades de dados
        allowNull: true,
    },
    dataMobi: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
    },
    timeban: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'indez',
    timestamps: false, // Desabilita colunas de timestamps (createdAt, updatedAt)
});

module.exports = Indez;