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

//MIDDLEWARE

//function to find id
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
//FUNCTION

//function to validate search by country, price or whatever
function findRestaurant(result, res, string, slave) {

    if (result.length > 0) {
        return res.json({
            message: `${string} in ${slave.charAt(0).toUpperCase() + slave.slice(1)}`,
            result
        })

    } else {
        return res.json({
            message: `no ${string} match found`
        })
    }
}

//Route to get all restaurants
router.get("/restaurants", (req, res) => {

    console.log(req.query);
    if (restaurants.length > 0 && Object.keys(req.query).length < 3) {
        res.json(restaurants)

    } else {

        if (restaurants.length > 0 && Object.keys(req.query).length > 2) {

            const filteredRestaurants = restaurants.filter((restaurant) => {
                return (
                    restaurant.country.toLowerCase() === req.query.country.toLowerCase() &&
                    restaurant.priceCategory.toString() === req.query.price &&
                    restaurant.cuisine === req.query.cuisine
                )

            })
            res.json(filteredRestaurants)

        } else {
            res.json({ message: "No Restaurants" })

        }
    }



})

//get restaurant by country
router.get("/restaurants/:country", (req, res) => {

    const newRes = restaurants.filter(restaurant => {
        return restaurant.country.toLowerCase() === req.params.country.toLowerCase()
    });

    findRestaurant(newRes, res, "country", req.params.country);
})

// get restaurant by price range
router.get("/restaurants/price/:price", (req, res) => {

    const newRes = restaurants.filter(restaurant => {
        return restaurant.priceCategory.toString() === req.params.price.toString()
    });

    findRestaurant(newRes, res, "price rating", req.params.price)
})

//get restaurants by cuisine type
router.get("/restaurants/cuisine/:cuisine", (req, res) => {
    const newRes = restaurants.filter(restaurant => {
        return restaurant.cuisine.toString() === req.params.cuisine.toString()
    });

    findRestaurant(newRes, res, "cuisine", req.params.cuisine)
})

//route to get restaurant by Id
router.get("/restaurants/:id", findId, (req, res) => {
    res.json(req.id)
})

// route to add a new restaurant
router.post("/restaurants", validrestaurant, (req, res) => {
    console.info("request received");

    function uniqueRandom(minRandom, maxRandom) { // function to attribute unique random Id 

        const uniqueNumber = Math.floor(Math.random() * (maxRandom - minRandom + 1) + minRandom) // set the random id

        const newLengthArray = restaurants.length + minRandom // set the length off array plus minimum random parameter to prevent function when array is full

        const findNewId = restaurants.find((findNewId) => { // const that search match in restaurants.json
            return (
                findNewId.id === uniqueNumber
            );
        })

        if (newLengthArray.length === maxRandom) { // guard to prevent infinite loop & bug 
            return console.log("all value are assigned");

        } else {

            if (findNewId !== undefined) { // if findNewId match something it relaunch the function as for as got a valid Id 
                uniqueRandom(maxRandom, minRandom)

            } else {
                return uniqueNumber // then we return our random unique ID
            }
        }
    }


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

// Update name of a restaurant
router.patch("/restaurants/:id/name", findId, (req, res) => {
    const restaurant = req.restaurant
    console.log(restaurant.name);
    restaurant.name = req.body.name

    res.json({
        message: "name updated",
        restaurant,
    });
});

//delete a restaurant
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



