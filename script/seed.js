/**
 * Couldn't destructure path for some reason?
 */

// const { 
//   db: { db }, 
//     models: { User } 
//  } = require("../server/_db");

const db = require("../server/_db/db");
const User = require("../server/_db/models/User");

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
  console.log(`seeded ${users.length} users`);

  // Finished Return
  console.log('successfully seeded');
  return {
    users
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