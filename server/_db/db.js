const Sequelize = require("sequelize");
const pkg = require('../../package.json');

const databaseName = pkg.name + (process.env.NODE_ENV === "test" ? "Test" : "");

const config = {
  logging: false
};
// turn on logging via env script
if(process.env.LOGGING === "true") {
  delete config.logging;
};

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://postgres:Bigman<26@localhost:5432/${databaseName}`,
  config
);


module.exports = db;
