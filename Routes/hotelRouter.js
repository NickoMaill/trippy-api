const express = require("express");
const router = express.Router();
const hotels = require("../data/hotel.json");
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const dotenv = require("dotenv");
dotenv.config({
	path: "../config.env",
});

//Route to get all hotels
router.get("/hotels", async (_req, res) => {
});

//route to get hotel by Id
router.get("/hotels/:id", (req, res) => {});

router.get("/hotels/:country", (req, res) => {});

// get hotel by price range
router.get("/hotels/price/:price", (req, res) => {});

//get hotels by cuisine type
router.get("/hotels/cuisine/:cuisine", (req, res) => {});

//route to get hotel by Id
router.get("/hotels/:id", (req, res) => {});

// route to add a new hotel
router.post("/hotels", (req, res) => {
	function uniqueRandom(minRandom, maxRandom) {
		// function to attribute unique random Id

		const uniqueNumber = Math.floor(Math.random() * (maxRandom - minRandom + 1) + minRandom); // set the random id
		const newLengthArray = hotels.length + minRandom; // set the length off array plus minimum random parameter to prevent function when array is full
		const findNewId = hotels.find((findNewId) => {
			// const that search match in hotels.json
			return findNewId.id === uniqueNumber;
		});
		if (newLengthArray.length === maxRandom) {
			// guard to prevent infinite loop & bug
			return console.log("all value are assigned");
		} else {
			if (findNewId !== undefined) {
				// if findNewId match something it relaunch the function as for as got a valid Id
				uniqueRandom(maxRandom, minRandom);
			} else {
				return uniqueNumber; // then we return our random unique ID
			}
		}
	}
});

// Update
router.patch("/hotels/:id/name", (req, res) => {});

router.delete("/hotels/:id", (req, res) => {});

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
