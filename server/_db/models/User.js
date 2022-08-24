const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = require("../db");

const User = db.define("user", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validation: {
      isEmail: true
    }
  },
  password: {
    type: STRING
  }
}
);

module.exports = User;
