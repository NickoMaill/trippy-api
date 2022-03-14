const express = require("express");
const app = express();
const Joi = require("joi");
const router = express.Router();
const hotels = require("../data/hotel.json")

const hotel = Joi.object({
    name: Joi.string().max(30),
    address: Joi.string.max(30),
    city: Joi.string().max(30),
    country: Joi.string().max(30),
    stars: Joi.number().min(1).max(5),
    hasSpa: Joi.boolean(),
    hosPool: Joi.boolean(),
    priceCategory:Joi.number().min(1).max(3)
})


router.get("/hotels", (req, res) => {
    res.json(hotels)
})