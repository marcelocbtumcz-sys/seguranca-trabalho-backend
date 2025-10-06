const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.HOST || "byo0kr3xcq7xicihsw8l-mysql.services.clever-cloud.com",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "ugfiunje9n5y0jkz",
  password: process.env.DB_PASSWORD || "oiejkFJvcH8II88F96hk",
  database: process.env.DB_NAME || "byo0kr3xcq7xicihsw8l",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

module.exports = pool.promise();







