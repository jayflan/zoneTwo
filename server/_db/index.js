const db = require('./db');

const User = require('./models/User');
const Workout = require('./models/Workout');
const Bike = require('./models/Bike');

// associations go here
User.hasMany(Bike);
Bike.belongsTo(User);

User.hasMany(Workout);
Workout.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Workout,
    Bike
  },
};