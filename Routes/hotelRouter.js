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
    hosPool: Joi.boolean().required(),
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

module.exports = router;