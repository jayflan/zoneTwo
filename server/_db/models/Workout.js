// const { FLOAT } = require('sequelize');
// const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const { DATE, FLOAT, INTEGER, STRING, JSON, UUID, UUIDV4 } = Sequelize;
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
  date: {
    type: DATE,
    allowNull: false
  },
  data: {
    type: JSON,
    allowNull: false 
  },
  distance: {
    type: FLOAT,
    allowNull: true
  },
  elevation: {
    type: INTEGER,
    allowNull: true
  },
  time: {
    type: JSON,
    allowNull: false
  },
  hrAvg: {
    type: INTEGER,
    allowNull: true
  },
  hrMax: {
    type: INTEGER,
    allowNull: true
  },
  cadAvg: {
    type: INTEGER,
    allowNull: true
  },
  cadMax: {
    type: INTEGER,
    allowNull: true
  },
  tempAvg: {
    type: INTEGER,
    allowNull: true
  },
  speedAvg: {
    type: FLOAT,
    allowNull: true
  },
  speedMax: {
    type: FLOAT,
    allowNull: true
  }
});

module.exports = Workout;