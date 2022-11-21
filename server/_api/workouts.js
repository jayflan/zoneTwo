const router = require("express").Router();
const Workout = require("../_db/models/Workout");
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

//GET all USER workouts
router.get("/:id", async(req, res, next) => {
  try {
    const user = req.params.id;
    const userWorkouts = await Workout.findAll({
      where: {
        userId: user
      }
    });
    res.json(userWorkouts);

  } catch(err) {
    next(err);
  }
});