const { 
  db, 
  models: { User, Workout, Bike, } 
 } = require("../server/_db");

const fs = require('fs');
const { Gpx, parseGpx } = require('../server/backendGpx');

/*
 * seed - this function clears the database, 
 * updates tables to match the models, 
 * and populates database.
*/

async function seed() {

  await db.sync({ force: true }); //clears db & matches models to tables
  console.log("db synced!");

// Creating Users
  const users = await Promise.all([
    User.create({ email: 'cody@gmail.com', password: 'cody123', distUnit: 'miles' }),
    User.create({ email: 'murphy@msn.com', password: 'murphy123', distUnit: 'kilometers' })
  ]);

// Isolate recently created users for userId properties
  const cody = await User.findOne({where: {email: "cody@gmail.com"}});
  const murphy = await User.findOne({where: {email: "murphy@msn.com"}});

  //Creating Workouts
  const xmlDataMtn = fs.readFileSync('public/Morning_Mountain_Bike_Ride.gpx', 'utf-8');
  const xmlDataRd = fs.readFileSync('public/Morning_ride.gpx', 'utf-8');
  const gpxMtnWorkout = parseGpx(xmlDataMtn);
  const gpxRdWorkout = parseGpx(xmlDataRd);

  //get workout dates
  const dateMtnWorkout = gpxMtnWorkout.data[0]['time'];
  const dateRdWorkout = gpxRdWorkout.data[0]['time'];
  
  //workout instance creation
  const gpxMtnMeasurements = new Gpx(gpxMtnWorkout);
  const gpxRdMeasurements = new Gpx(gpxRdWorkout);
  const roadTempAvg = gpxRdMeasurements.tempAvg();
  const roadDistance = gpxRdMeasurements.distance();
  // console.log(roadDistance);
  const roadDistanceTotal = roadDistance.totalDist;
  const roadElevation = gpxRdMeasurements.elevation();
  const roadTime = gpxRdMeasurements.time();
  const roadHrAvg = gpxRdMeasurements.hrAvg();
  const roadCadAvg = gpxRdMeasurements.cadAvg();
  const roadHrMax = gpxRdMeasurements.hrMax();
  const roadCadMax = gpxRdMeasurements.cadMax();

  const roadSpeedArrKph = gpxRdMeasurements.createSpeedTrkPtArr(roadDistance);
  const roadSpeedAvg = gpxRdMeasurements.speedAvg(roadSpeedArrKph);
  const roadSpeedMax = gpxRdMeasurements.speedMax(roadSpeedArrKph);
    
  const mtnTempAvg = gpxMtnMeasurements.tempAvg();  
  const mtnDistance = gpxMtnMeasurements.distance();
  const mtnDistanceTotal = mtnDistance.totalDist;
  const mtnElevation = gpxMtnMeasurements.elevation();
  const mtnTime = gpxMtnMeasurements.time();
  const mtnHrAvg = gpxMtnMeasurements.hrAvg();
  const mtnCadAvg = gpxMtnMeasurements.cadAvg();
  const mtnHrMax = gpxMtnMeasurements.hrMax();
  const mtnCadMax = gpxMtnMeasurements.cadMax();

  const mtnSpeedArrKph = gpxMtnMeasurements.createSpeedTrkPtArr(mtnDistance);
  const mtnSpeedAvg = gpxMtnMeasurements.speedAvg(mtnSpeedArrKph);
  const mtnSpeedMax = gpxMtnMeasurements.speedMax(mtnSpeedArrKph);
  
  const timeTemplateObj = { //for handcoding workouts 1 & 2
    'seconds': 0,
    'minutes': 0,
    'hours': 0
  };
  //create NEW gpxWorkout obj w/ appended data
  //todo switch from gpxOutputDataMtn to a function that recreates array & accums distance over workout by trkpt, then append
  
  const appendToGpxData = (origArr, dataArr) => {
    let accumElem = 0;
    const newArr = origArr.map((elem, idx) => {
      accumElem += dataArr[idx].distance;
      elem.distanceAccum = accumElem;
      elem.distance = dataArr[idx].distance;
      return elem;
    });
    return newArr;
  };

  // const gpxOutputDataMtn = gpxMtnWorkout
  //   .data
  //   .reduce((accum, currElem, idx) => {
  //     accum.push(currElem);
  //     currElem.distance = mtnDistance.distArr[idx].distance;
  //   return accum;
  // }, []);


  //Creating Workouts  
  const workouts = await Promise.all([
    Workout.create({name: 'Workout #1', description: 'Best workout ever',
      data: {heartrate: 180, speed: 10}, userId: cody.id, distance: 0, elevation: 0, time: timeTemplateObj, date: '2022-10-22T13:39:41Z'}),
    Workout.create({name: 'Workout #2', description: 'Best workout ever', 
      data: {heartrate: 150, speed: 15}, userId: murphy.id, distance: 0, elevation: 0, time: timeTemplateObj, date: '2022-10-22T13:39:41Z'}),
    Workout.create({name: gpxMtnWorkout.name, description: 'Best workout ever', date: dateMtnWorkout, 
      data: appendToGpxData(gpxMtnWorkout.data, mtnDistance.distArr), userId: murphy.id, distance: mtnDistanceTotal, elevation: mtnElevation, 
      // data: gpxOutputDataMtn, userId: murphy.id, distance: mtnDistanceTotal, elevation: mtnElevation, 
        time: mtnTime, hrAvg: mtnHrAvg, hrMax: mtnHrMax, cadAvg: mtnCadAvg, cadMax: mtnCadMax, tempAvg: mtnTempAvg,
        speedAvg: mtnSpeedAvg, speedMax: mtnSpeedMax, date: dateMtnWorkout}),
    Workout.create({name: gpxRdWorkout.name, description: 'Best workout ever', date: dateRdWorkout,
      data: gpxRdWorkout.data, userId: murphy.id, distance: roadDistanceTotal, elevation: roadElevation, 
        time: roadTime, hrAvg: roadHrAvg, hrMax: roadHrMax, cadAvg: roadCadAvg, cadMax: roadCadMax, tempAvg: roadTempAvg,
        speedAvg: roadSpeedAvg, speedMax: roadSpeedMax, date: dateRdWorkout}),
    Workout.create({name: gpxMtnWorkout.name, description: 'Best workout ever', date: dateMtnWorkout,
      data: appendToGpxData(gpxMtnWorkout.data, mtnDistance.distArr), userId: cody.id, distance: mtnDistanceTotal, elevation: mtnElevation, 
      // data: gpxOutputDataMtn, userId: cody.id, distance: mtnDistanceTotal, elevation: mtnElevation, 
        time: mtnTime, hrAvg: mtnHrAvg, hrMax: mtnHrMax, cadAvg: mtnCadAvg, cadMax: mtnCadMax, tempAvg: mtnTempAvg,
        speedAvg: mtnSpeedAvg, speedMax: mtnSpeedMax, date: dateMtnWorkout}),
    Workout.create({name: gpxRdWorkout.name, description: 'Best workout ever', date: dateRdWorkout,
      data: gpxRdWorkout.data, userId: cody.id, distance: roadDistanceTotal, elevation: roadElevation, 
        time: roadTime, hrAvg: roadHrAvg, hrMax: roadHrMax, cadAvg: roadCadAvg, cadMax: roadCadMax, tempAvg: roadTempAvg,
        speedAvg: roadSpeedAvg, speedMax: roadSpeedMax, date: dateRdWorkout})
  ]);

//Creating Bikes
  const bikes = await Promise.all([
    Bike.create({name: 'Fuji SL', mileage: 100, userId: cody.id}),
    Bike.create({name: 'YT Jeffsy', mileage: 150, userId: murphy.id})
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${workouts.length} workouts`);
  console.log(`seeded ${bikes.length} bikes`)

  // Finishing Return
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

/* Not in use at this time
 * Export 'seed func for testing (see './seed.spec.js')
 */

module.exports = seed;