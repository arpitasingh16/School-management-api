const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST  || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Arpita@123',
    database: process.env.DB_NAME || 'school_management_api'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

module.exports = connection;

