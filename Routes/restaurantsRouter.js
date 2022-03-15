const express = require("express");
const router = express.Router();
const Joi = require("joi");
const restaurants = require("../data/restaurant.json")

const newRestaurant = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    address: Joi.string().min(1).max(50).required(),
    city: Joi.string().min(1).max(30).required(),
    country: Joi.string().min(1).max(30).required(),
    stars: Joi.number().min(1).max(5).required(),
    cuisine: Joi.string().min(1).max(30).required(),
    priceCategory: Joi.number().min(1).max(3).required(),
})

function findId(req, res, next) {
    // const restaurant = restaurants[req.params.id - 1]
    const id = parseInt(req.params.id)
    const restaurant = restaurants.find((_restaurant, i) => {
        const id = i + 1;
        return req.params.id === id.toString()
    })
    if (id < 1 || id > restaurants.length) {
        return res.status(404).json({ message: "Id not found" })
    }
    req.restaurant = restaurant;
    next();
}
//Function to validate restaurant adding
function validrestaurant(req, res, next) {
    const validation = newRestaurant.validate(req.body)

    if (validation.error) {
        return res.status(400).json({
            message: "Error 400",
            description: validation.error.details[0].message,
        })
    }

    next();
}

//Route to get all restaurants
router.get("/restaurants", (_req, res) => {

    if (restaurants.length > 0) {
        res.json(restaurants)

    } else {
        res.json({ message: "No restaurants" })
    }

})

router.get("/restaurants/:country", (req, res) => {

    const newRes = restaurants.filter(restaurant => {
        return restaurant.country.toLowerCase() === req.params.country.toLowerCase()
    });
    res.json({
        message: `Restaurants in ${req.params.id.toUpperCase()}`,
        newRes
    })


})

//route to get restaurant by Id
router.get("/restaurants/:id", findId, (req, res) => {
    res.json(req.id)
})

// route to add a new restaurant
router.post("/restaurants", validrestaurant, (req, res) => {

    function uniqueRandom(minRandom, maxRandom) {

        const uniqueNumber = Math.floor(Math.random() * (maxRandom - minRandom + 1) + minRandom)
        const newLengthArray = restaurants.length + minRandom
        let newId = null;

        const findNewId = restaurants.find((findNewId) => {
            return (
                findNewId.id === uniqueNumber
            );
        })

        if (newLengthArray.length === maxRandom) {
            return console.log("all value are in array");
        } else {
            console.log("findNewId", findNewId);
            if (findNewId !== undefined ) {
                console.log("oups");
                uniqueRandom(maxRandom, minRandom)
            } else {
                return newId = uniqueNumber
            }
        }


    }
    console.info("request received");

    restaurants.push({
        id: uniqueRandom(100, 999),
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
        message: "restaurant added",
        restaurants
    });
});

// Update
router.patch("/restaurants/:id/name", findId, (req, res) => {
    const restaurant = req.restaurant
    console.log(restaurant.name);
    restaurant.name = req.body.name

    res.json({
        message: "name updated",
        restaurant,
    });
});

router.delete("/restaurants/:id", (req, res) => {

    const restaurant = restaurants.find((restaurant) => {
        return (
            restaurant.id.toString() === req.params.id
        );
    });
    if (restaurant) {
        restaurants.splice(restaurants.indexOf(restaurant), 1)
        res.json({
            message: "restaurant deleted",
            restaurants,
        })
    } else {
        res.status(404).json({
            message: "Error 404 not found",
            description: "this restaurant dose not exist"
        });
    }
});

//copy and paste it postman

// {
//     "name": "PNY",
//     "address": "1 rue Perrée",
//     "city": "Paris",
//     "country": "France",
//     "stars": 4,
//     "cuisine": "american",
//     "priceCategory": 3
// }

module.exports = router;



