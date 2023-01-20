const Sequelize = require("sequelize");
const pkg = require('../../package.json');
require('dotenv').config();

const databaseName = pkg.name + (process.env.NODE_ENV === "test" ? "Test" : "");

const config = {
  logging: false
};
// turn on logging via env script
if(process.env.LOGGING === "true") {
  delete config.logging;
};

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://postgres@localhost:5432/${databaseName}`,
);


module.exports = db;
