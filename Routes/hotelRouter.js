const express = require("express");
const router = express.Router();
const hotels = require("../data/hotel.json")

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

function findHotel(result, res, string, slave) {

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

router.get("/hotels/:country", (req, res) => {

    const newRes = hotels.filter(hotel => {
        return hotel.country.toLowerCase() === req.params.country.toLowerCase()
    });

    findHotel(newRes, res, "country", req.params.country);
})

// get hotel by price range
router.get("/hotels/price/:price", (req, res) => {

    const newRes = hotels.filter(hotel => {
        return hotel.priceCategory.toString() === req.params.price.toString()
    });

    findHotel(newRes, res, "price rating", req.params.price)
})

//get hotels by cuisine type
router.get("/hotels/cuisine/:cuisine", (req, res) => {
    const newRes = hotels.filter(hotel => {
        return hotel.cuisine.toString() === req.params.cuisine.toString()
    });

    findHotel(newRes, res, "cuisine", req.params.cuisine)
})

//route to get hotel by Id
router.get("/hotels/:id", findId, (req, res) => {
    res.json(req.id)
})

// route to add a new hotel
router.post("/hotels", validHotel, (req, res) => {

    function uniqueRandom(minRandom, maxRandom) { // function to attribute unique random Id 

        const uniqueNumber = Math.floor(Math.random() * (maxRandom - minRandom + 1) + minRandom) // set the random id

        const newLengthArray = hotels.length + minRandom // set the length off array plus minimum random parameter to prevent function when array is full

        const findNewId = hotels.find((findNewId) => { // const that search match in hotels.json
            return (
                findNewId.id === uniqueNumber
            );
        })

        if (newLengthArray.length === maxRandom) { // guard to prevent infinite loop & bug 
            return console.log("all value are assigned");
            
        } else { 

            if (findNewId !== undefined ) { // if findNewId match something it relaunch the function as for as got a valid Id 
                uniqueRandom(maxRandom, minRandom)

            } else {
                return uniqueNumber // then we return our random unique ID
            }
        }
    }

    console.info("request received");

    hotels.push({
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