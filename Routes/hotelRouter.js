const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const dotenv = require("dotenv");
const findHotelName = require("../middleware/findHotelName");
const findHotelId = require("../middleware/findHotelId");
const findHotelCountry = require("../middleware/findHotelCountry");
dotenv.config({
	path: "./config.env",
});

//Route to get all hotels
router.get("/", async (_req, res) => {
	const hotels = await Postgres.query("SELECT * FROM hotels");

	try {
		hotels;
	} catch (err) {
		return res.status(400).json({
			message: "An error happened...",
		});
	}
	res.json(hotels.rows);
});

//route to get hotel by Id
router.get("/id/:id", findHotelId, async (req, res) => {
	const hotel = await Postgres.query("SELECT * FROM hotels WHERE hotels.id=$1", [req.hotel.id]);

	try {
		hotel;
	} catch (err) {
		return res.status(400).json({
			message: "An error happened...",
		});
	}
	res.json(hotel.rows);
});

router.get("/name/:name", findHotelName, async (req, res) => {
	const hotel = await Postgres.query("SELECT * FROM hotels WHERE hotels.name=$1", [req.hotel.name]);

	try {
		hotel;
	} catch (err) {
		return res.status(400).json({
			message: "An error happened...",
		});
	}
	res.json(hotel.rows);
});

router.get("/country/:country", findHotelCountry, async(req, res) => {
	const hotels = await Postgres.query("SELECT * FROM hotels WHERE country=$1", [req.hotel.country]);
    
	try {
		hotels;
	} catch (err) {
		return res.status(400).json({
			message: "An error happened...",
		});
	}
    res.json(hotels.rows)
});

// get hotel by price range
router.get("/hotels/price/:price", (req, res) => {});

// route to add a new hotel
router.post("/hotels", (req, res) => {});

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
