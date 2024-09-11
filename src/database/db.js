const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ficatelecom_teguelan', 'ficatelecom_root', 'R_y?l7g$88y~', {
    host: '67.23.238.121',
    dialect: 'mysql',
    logging: false, // Desabilitar logs de SQL no console (opcional)
});

module.exports = sequelize;