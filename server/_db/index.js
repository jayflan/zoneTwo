const db = require('./db');

const User = require('./models/User');
// const { User, Workout } = require('./models');
const Workout = require('./models/Workout')

// associations go here

module.exports = {
  db,
  models: {
    User,
    Workout,
  },
};