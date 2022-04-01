var mysql = require("mysql");
const Pool = require("pg").Pool;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "fuel_quote"
});

// localhost 

//   host: "localhost",
//   user: "root",
//   password: "123456789",
//   database: "fuel_quote"




module.exports = pool;