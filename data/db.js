const mysql = require('mysql2');

const host_data =process.env.DB_HOST
const user_data = process.env.DB_USER
const password_data = process.env.DB_PASSWORD
const database_data = process.env.DB_DATABASE

const connection = mysql.createConnection({
  host: host_data,
  user: user_data,
  password: password_data,
  database: database_data
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;