const express = require("express");
const router = express.Router();
const isHotelExist = require("../middleware/isHotelexist");
const findHotelId = require("../middleware/findHotelId");
const findHotelName = require("../middleware/findHotelName");
const Hotels = require("../Schema/hotelSchema");

//Route to get all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotels.find(req.query);

    if (hotels.length < 1) {
      return res.status(404).json({
        message: "no hotels found",
      });
    } else {
      res.json(hotels);
    }
  } catch (err) {
    return res.status(400).json({
      message: "An error happened...",
    });
  }
});

//route to get hotel by Id
router.get("/id/:id", findHotelId, async (req, res) => {
  try {
    const hotels = await Hotels.findById(req.hotel.id);
    res.json(hotels);
  } catch (err) {
    return res.status(400).json({
      message: "An error happened...",
    });
  }
});

router.get("/name/:name", findHotelName, async (req, res) => {
  try {
    const hotels = await Hotels.find({ name: req.hotel.name });
    res.json(hotels);
  } catch (err) {
    return res.status(400).json({
      message: "An error happened...",
    });
  }
});

// route to add a new hotel
router.post("/new", isHotelExist, async (req, res) => {
  try {
    await Hotels.create(req.body);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "an error happened",
    });
  }
  res.status(201).json({
    message: "hotels added",
  });
});

// Update
router.patch("/update/:id/", async (req, res) => {
  try {
    await Hotels.findByIdAndUpdate(req.params.id, {
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

router.delete("/delete/:id", async (req, res) => {
  try {
    await Hotels.find({ name: req.params.id }).remove().exec();
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
