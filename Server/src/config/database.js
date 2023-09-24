require('dotenv').config();
const mysql = require('mysql2'); 

const {DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT, DB_HOST} = process.env;


const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  connectionLimit: 10,
})

module.exports = pool; 