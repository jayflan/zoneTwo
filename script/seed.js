const { 
  db, 
  models: { User, Workout, Bike, } 
 } = require("../server/_db");

const fs = require('fs');
const { parseGpx } = require('../server/_api/_apiFunctions');

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
// Isolate recently created users for userId properties
  const cody = await User.findOne({where: {email: "cody@gmail.com"}});
  const murphy = await User.findOne({where: {email: "murphy@msn.com"}});
//Creating Workouts
  const xmlDataMtn = fs.readFileSync('public/Morning_Mountain_Bike_Ride.gpx', 'utf-8');
  const xmlDataRd = fs.readFileSync('public/Morning_ride.gpx', 'utf-8');
  const gpxMtnWorkout = parseGpx(xmlDataMtn);
  const gpxRdWorkout = parseGpx(xmlDataRd);
  const workouts = await Promise.all([
    Workout.create({name: 'Workout #1', description: 'Best workout ever', data: {heartrate: 180, speed: 10}, userId: cody.id}),
    Workout.create({name: 'Workout #2', description: 'Best workout ever', data: {heartrate: 150, speed: 15}, userId: murphy.id}),
    Workout.create({name: gpxRdWorkout.name, description: 'Best workout ever', data: gpxRdWorkout.data, userId: murphy.id}),
    Workout.create({name: gpxMtnWorkout.name, description: 'Best workout ever', data: gpxMtnWorkout.data, userId: cody.id}),
    Workout.create({name: gpxRdWorkout.name, description: 'Best workout ever', data: gpxRdWorkout.data, userId: cody.id})
  ]);
//Creating Bikes
  const bikes = await Promise.all([
    Bike.create({name: 'Fuji SL', mileage: 100, userId: cody.id}),
    Bike.create({name: 'YT Jeffsy', mileage: 150, userId: murphy.id})
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${workouts.length} workouts`);
  console.log(`seeded ${bikes.length} bikes`)

  // Finished Return
  console.log('successfully seeded');
  return {
    users,
    workouts,
    bikes
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