const format = require('pg-format');
const { Pool } = require("pg");
const pool = new Pool({
  host: "192.168.1.66",
  user: "postgres",
  password: "miclavesecreta",
  database: "joyas",
  allowExitOnIdle: true
})

pool.connect((err, _) => err ? console.error("ERROR connect DB:", err) : console.log("OK connect DB"));

module.exports = { pool };