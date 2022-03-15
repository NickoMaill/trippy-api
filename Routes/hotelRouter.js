const express = require("express");
const router = express.Router();
const Joi = require("joi");
const hotels = require("../data/hotel.json")

//Joi validation schema
const hotel = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    address: Joi.string().min(1).max(50).required(),
    city: Joi.string().min(1).max(30).required(),
    country: Joi.string().min(1).max(30).required(),
    stars: Joi.number().min(1).max(5).required(),
    hasSpa: Joi.boolean().required(),
    hasPool: Joi.boolean().required(),
    priceCategory: Joi.number().min(1).max(3).required(),
})

//Middlewares

//Function to find hotel by id 
function findId(req, res, next) {
    // const hotel = hotels[req.params.id - 1]
    const id = parseInt(req.params.id)
    const hotel = hotels.find((_hotel, i) => {
        const id = i + 1;
        return req.params.id === id.toString()
    })
    if (id < 1 || id > hotels.length) {
        return res.status(404).json({ message: "Id not found" })
    }
    req.hotel = hotel;
    next();
}
//Function to validate hotel adding
function validHotel(req, res, next) {
    const validation = hotel.validate(req.body)

    if (validation.error) {
        return res.status(400).json({
            message: "Error 400",
            description: validation.error.details[0].message,
        })
    }

    next();
}

//Route to get all hotels
router.get("/hotels", (_req, res) => {

    if (hotels.length > 0) {
        res.json(hotels)

    } else {
        res.json({ message: "No Hotels" })
    }

})

//route to get hotel by Id
router.get("/hotels/:id", findId, (req, res) => {
    res.json(req.id)
})

// route to add a new hotel
router.post("/hotels", validHotel, (req, res) => {
    console.info("request received");

    hotels.push({
        id: hotels.length + 1,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        stars: req.body.stars,
        hasSpa: req.body.hasSpa,
        hasPool: req.body.hasPool,
        priceCategory: req.body.priceCategory,
    });

    res.status(201).json({
        message: "Hotel added",
        hotels
    });
});

// Update
router.patch("/hotels/:id/name", findId, (req, res) => {
    const hotel = req.hotel
    console.log(hotel.name);
    hotel.name = req.body.name

    res.json({
        message:"name updated",
        hotel,
    });
});

router.delete("/hotels/:id", (req, res) => {

    const hotel = hotels.find((hotel) => {
        return(
            hotel.id.toString() === req.params.id
        );
    });
    if (hotel) {
        hotels.splice(hotels.indexOf(hotel), 1)
        res.json({
            message: "hotel deleted",
            hotels,
        })
    } else {
        res.status(404).json({
            message: "Error 404 not found",
            description: "this hotel dose not exist"
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