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

// function validHotel(req, res, next) {
//     const validation = user.validHotel(req.body)

//     if (validHotel.error) {
//         return res.status(400).json({
//             message: "Error 400",
//             description: validHotel.error.details[0].message,
//         })
//     }

//     next();
// }

router.get("/hotels", (_req, res) => {
    console.log(hotels);
    if (hotels.length > 0) {
        res.json(hotels)
    } else {
        res.send("No Hotels")
    }
})

module.exports = router;