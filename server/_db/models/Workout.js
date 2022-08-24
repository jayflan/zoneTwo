const Sequelize = require('sequelize');
const { STRING, JSON, UUID, UUIDV4 } = Sequelize;
const db = require('../db');

const Workout = db.define('workout', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: true
  },
  data: {
    type: JSON,
    allowNull: false 
  }
});

module.exports = Workout;