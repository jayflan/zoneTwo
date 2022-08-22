const Sequelize = require("sequelize");

// const testDb = new Sequelize(
//   process.env.DATABASE_URL || "postgres://postgres:Bigman<26@localhost:5432/zoneTwoTest"
// );

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://postgres:Bigman<26@localhost:5432/zoneTwo"
);

module.exports = {
  db
// testDb
};
