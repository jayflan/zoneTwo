const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://postgres:Bigman<26@localhost:5432/zoneTwo"
);

module.exports = db;
