const router = require("express").Router();
const Workout = require("../_db/models/Workout");
const User = require("../_db/models/User");
const { Gpx, parseGpx } = require('../backendGpx');
module.exports = router;

//GET all workouts
router.get("/", async(req, res, next) => {
  try{
    const workouts = await Workout.findAll();
    res.json(workouts);
  } catch (err) {
    next(err);
  };
});

//GET all USER workouts via USER id
router.get("/:id", async(req, res, next) => {
  try {
    const user = req.params.id;
    const userWorkouts = await Workout.findAll({
      where: {
        userId: user
      },
      order: [
        ["date", "DESC"]
      ],
    });
    res.json(userWorkouts);

  } catch(err) {
    next(err);
  }
});

//GET single User Workout via Workout id
router.get("/user/:id", async(req, res, next) => {
  try {
    const workout = req.params.id;
    const userWorkout = await Workout.findByPk(workout);
    res.send(userWorkout);
  } catch(err) {
    next(err);
  }
});

//POST single User Workout from user GPX file
router.post("/upload/user/:id", async(req, res, next) => {
  try {
      //find user in db
    const user = await User.findByPk(req.params.id);
      //get req file data
    const { fileName, fileData} = req.body;
      //create dataObjGpx
    const parsedGpx = parseGpx(fileData);
    
    const dateWorkout = parsedGpx.data[0]['time'];
    
      //workout sinstance creation
    const gpxMeasurements = new Gpx(parsedGpx);

    const tempAvg = gpxMeasurements.tempAvg();
    const distance = gpxMeasurements.distance();
    const totalDistance = distance.totalDist;
    const elevation = gpxMeasurements.elevation();
    const time = gpxMeasurements.time();
    const avgHrtRate = gpxMeasurements.hrAvg();
    const avgCadence = gpxMeasurements.cadAvg();
    const maxHrtRate = gpxMeasurements.hrMax();
    const maxCadence = gpxMeasurements.cadMax();

    const speedArrKph = gpxMeasurements.createSpeedTrkPtArr(distance);
    const speedAvg = gpxMeasurements.speedAvg(speedArrKph);
    const speedMax = gpxMeasurements.speedMax(speedArrKph);

        //append distance & speed trkpts to new gpx data array
      const origParsedGpxArr = parsedGpx.data;
      let distAccum = 0;
      const newParsedGpxArr = origParsedGpxArr.map((currTrkPt, idx) => {
        //Todo Need to make distance cummulative by trkpt!!!!!
        //! distAccum will be in meters by default!!!!
      const distanceArr = distance.distArr;
      const currDist = distanceArr[idx];
      distAccum += currDist.distance;
      const currSpeed = speedArrKph[idx];
      currTrkPt['distanceAccum'] = distAccum;
      currTrkPt['speed'] = currSpeed;
      return currTrkPt;
      console.log(currTrkPt)
    });
    console.log(newParsedGpxArr);

      //post dataObjGpx to user's Workout db/model using gpxCalc methods
    const workout = await Workout.create({
      name: fileName,
      description: 'Best workout ever',
      data: parsedGpx.data,
      date: dateWorkout,
      userId: user.id,
      distance: totalDistance,
      elevation: elevation,
      time: time,
      hrAvg: avgHrtRate,
      hrMax: maxHrtRate,
      cadAvg: avgCadence,
      cadMax: maxCadence,
      tempAvg: tempAvg,
      speedAvg: speedAvg,
      speedMax: speedMax
    })
      //send res post ok and new-posted-workout record to frontend redux
    res.status(201).send(workout);
  } catch(err) {
    res.send({error: 'Error: Please cancel &  upload again'}).status(500);
    next(err);
  }

});