const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = require("../db");
const jwt = require("jsonwebtoken");

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

//<----- instanceMethods ----->

// User.prototype.correctPassword = function (candidatePwd) {
//   return candidatePwd === this.password
// };

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

//<----- classMethods ----->

User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email }});
  //todo add password eval here
  if(!user /* or correctPassword*/) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  };
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if(!user) {
      throw "nooo";
    };
    return user;
  } catch (ex) {
    const error =Error("bad token");
    error.status = 401;
    throw error;
  };
};
