const mysql = require("mysql");

// create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "edo1234.",
  database: "my_db"
});

module.exports = db;

