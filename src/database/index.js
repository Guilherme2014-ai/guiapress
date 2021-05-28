const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress2014','guilherme2014','celso_bixa2014', {
    host: 'mysql743.umbler.com',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;