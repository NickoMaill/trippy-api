const express = require("express");
const Joi = require("joi");
const router = express.Router();
const hotels = require("../data/hotel.json")

//Joi validation schema
const hotel = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    stars: Joi.number().min(1).max(5).required(),
    hasSpa: Joi.boolean().required(),
    hasPool: Joi.boolean().required(),
    priceCategory:Joi.number().min(1).max(3).required(),
})

//Middleware function to find hotel by id 
function findId(req, res, next) {
	const hotel = hotels[req.params.id - 1]

    if (req.params.id < hotels.length || req.params.id > hotels.length) {
        return res.status(404).json({message: "Id not found"})
    }
    res.json(hotel)
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
        res.json({message: "No Hotels"})
    }

})

//route to get hotel by Id
router.get("/hotels/:id", findId, (req, res) => {
    res.json(req.id)
})

router.post("/hotels",validHotel, (req, res)=> {
    console.log("request received");

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
    })
})

//copy and paste it postman

// {
//     "id": 1,
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