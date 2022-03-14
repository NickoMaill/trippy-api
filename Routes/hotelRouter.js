const express = require("express");
const Joi = require("joi");
const router = express.Router();
const hotels = require("../data/hotel.json")

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

function findId(req, res, next) {
	const hotel = hotels[req.params.id - 1]

    if (req.params.id < hotels.length || req.params.id > hotels.length) {
        return res.status(404).send("Id not found")
    }
    res.json(hotel)
	next();
}

router.get("/hotels", (_req, res) => {
    console.log(hotels);
    if (hotels.length > 0) {
        res.json(hotels)
    } else {
        res.send("No Hotels")
    }
})

router.get("/hotels/:id", findId, (req, res) => {
    res.json(req.id)
})

module.exports = router;