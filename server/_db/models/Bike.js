const Sequelize = require("sequelize");
const { STRING, INTEGER, UUID, UUIDV4 } = Sequelize;
const db = require("../db");

const Bike = db.define("bike", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false
  },
  mileage: {
    type: INTEGER,
    allowNull: false
  }
});

module.exports = Bike;