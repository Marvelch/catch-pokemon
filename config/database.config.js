// var mysql = require('mysql');

// var db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "nodejs",
//     password: ""
// });

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// module.exports = db;

import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const db_name = process.env['db_database'];
const db_username = process.env['db_username'];
const db_password = process.env['db_password'];
const db_host = process.env['db_host'];

const db = new Sequelize(db_name, db_username, db_password, {
    host: db_host,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

// async function checkConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

export default db;
