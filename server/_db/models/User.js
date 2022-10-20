const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//for bcrypt password hashing
const SALT_ROUNDS = 5;

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

User.prototype.correctPassword = function (candidatePwd) {
  //need to compare plain password (input) to hashed password (db)
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

//<----- classMethods ----->

User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email }});
  if(!user || !(await user.correctPassword(password))) {
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

//<----- hooks ----->

  //password hashing hooks
const hashPassword = async (user) => {
  if(user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  };
};

  //password hashing methods (IMPORTANT)
User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
  //bulk is for seeding test db
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
