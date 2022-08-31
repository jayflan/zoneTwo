const router = require("express").Router();
const Bike = require("../_db/models/Bike");
module.exports = router;

//GET all bikes
router.get("/", async(req, res, next) => {
  try{
    const bikes = await Bike.findAll();
    res.json(bikes);
  } catch(err) {
    next(err);
  };
});