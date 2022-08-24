const Sequelize = require("sequelize");
const pkg = require('../../package.json');

// // const testDb = new Sequelize(
// //   process.env.DATABASE_URL || "postgres://postgres:Bigman<26@localhost:5432/zoneTwoTest"
// // );
const databaseName = pkg.name + (process.env.NODE_ENV === "test" ? "Test" : "");

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://postgres:Bigman<26@localhost:5432/${databaseName}`
);


module.exports = db;
