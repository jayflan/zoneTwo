/**
 * Couldn't destructure path for some reason?
 */

// const { 
//   db: { db }, 
//     models: { User } 
//  } = require("../server/_db");

const db = require("../server/_db/db");
const User = require("../server/_db/models/User");
const Workout = require("../server/_db/models/Workout");

/*
 * seed - this function clears the database, 
 * updates tables to match the models, 
 * and populates database.
*/

async function seed() {

  await db.sync({ force: true }); //clears db & matchs models to tables
  console.log("db synced!");

// Creating Users
  const users = await Promise.all([
    User.create({ email: 'cody@gmail.com', password: 'cody123' }),
    User.create({ email: 'murphy@msn.com', password: 'murphy123' })
  ]);
//Creating Workouts
  const workouts = await Promise.all([
    Workout.create({name: 'Workout #1', description: 'Best workout ever', data: {heartrate: 180, speed: 10}}),
    Workout.create({name: 'Workout #2', description: 'Best workout ever', data: {heartrate: 150, speed: 15}})
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${workouts.length} workouts`);

  // Finished Return
  console.log('successfully seeded');
  return {
    users,
    workouts
  };
  
};

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  };
};

/*
  * Execute 'seed' func IF ran module directly ('node seed) 
  * Why?: 'Async' funcs return a promise, we can use 'catch' to handle
  *   errors the might come from inside 'seed'.
*/

if (module === require.main) {
  runSeed();
};

/*
 * Export 'seed func for testing (see './seed.spec.js')
 */

module.exports = seed;