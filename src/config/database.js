const Sequelize = require('sequelize');

/**
 * Config ORM Database
 */

const DATABASE = 'dblog';
const USERNAME = 'citylog';
const PASSWORD = 'citypass';
const HOST = 'doclog-migrated.cjnsl9c2gehh.ap-southeast-1.rds.amazonaws.com';
const DRIVER = 'mysql';

exports.default = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DRIVER,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});