const express = require("express");
const app = express();
const Joi = require("joi");

const restaurant = Joi.object({
    name: Joi.string().max(30).required(),
    address: Joi.string().alphanum().max(50).required(),
    city: Joi.string().max(30).required(),
    country: Joi.string().max(30).required(),
    stars: Joi.number.min(1).max(5).required(),
    cuisine: Joi.string().max(30).required(),
    priceCategory: Joi.number().min(1).max(3),
})



