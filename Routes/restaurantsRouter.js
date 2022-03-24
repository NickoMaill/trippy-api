const express = require("express");
const router = express.Router();
const findRestaurantId = require("../middleware/findRestaurantId");
const findRestaurantName = require("../middleware/findRestaurantName");
const isRestaurantExist = require('../middleware/isRestaurantExist.js')
const Restaurants = require("../Schema/restaurantsSchema");

//Route to get all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurants.find(req.query);

    if (restaurants.length < 1) {
      return res.status(404).json({
        message: "no restaurants found",
      });
    } else {
      res.json(restaurants);
    }
  } catch (err) {
    return res.status(400).json({
      message: "An error happened...",
    });
  }
});

//route to get hotel by Id
router.get("/id/:id", findRestaurantId, async (req, res) => {
  try {
    const restaurants = await Restaurants.findById(req.hotel.id);
    res.json(restaurants);
  } catch (err) {
    return res.status(400).json({
      message: "An error happened...",
    });
  }
});

router.get("/name/:name", findRestaurantName, async (req, res) => {
  try {
    const restaurants = await Restaurants.find({ name: req.hotel.name });
    res.json(restaurants);
  } catch (err) {
    return res.status(400).json({
      message: "An error happened...",
    });
  }
});

// route to add a new hotel
router.post("/new", isRestaurantExist, async (req, res) => {
  try {
    await Restaurants.create(req.body);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "an error happened",
    });
  }
  res.status(201).json({
    message: "restaurants added",
  });
});

// Update
router.patch("/update/:id/", findRestaurantId, async (req, res) => {
  try {
    await Restaurants.findByIdAndUpdate(req.params.id, {
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      stars: req.body.stars,
      hasSpa: req.body.hasSpa,
      hasPool: req.body.hasPool,
      priceCategory: req.body.priceCategory,
    });
    res.json({
      message: "hotel updated",
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: " an error happened",
    });
  }
});

router.delete("/delete/:id", findRestaurantId ,async (req, res) => {
  try {
    await Restaurants.find({ name: req.params.id }).remove().exec();
    res.json({
      message: "hotel deleted",
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: "an error happened",
    });
  }
});

//copy and paste it postman

// {
//     "name": "Hilton Paris Opera",
//     "address": "108 rue Saint Lazare",
//     "city": "Paris",
//     "country": "France",
//     "stars": 5,
//     "hasSpa": true,
//     "hasPool": true,
//     "priceCategory": 3
// }

module.exports = router;
