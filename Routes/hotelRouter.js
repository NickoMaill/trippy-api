const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const dotenv = require("dotenv");
const findHotelName = require("../middleware/findHotelName");
const findHotelId = require("../middleware/findHotelId");
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
router.get("/:id", findHotelId, async (req, res) => {
	const hotel = await Postgres.query("SELECT * FROM hotels WHERE id=$1", [req.params.id]);

	try {
		hotel;
	} catch (err) {
		return res.status(400).json({
			message: "An error happened...",
		});
	}
	res.json(hotel.rows);
});

router.get("/:name", findHotelName, async (req, res) => {
	const hotel = await Postgres.query("SELECT * FROM hotels WHERE name=$1", [req.params.name]);

	try {
		hotel;
	} catch (err) {
		return res.status(400).json({
			message: "An error happened...",
		});
	}
	res.json(hotel.rows);
});

router.get("/hotels/:country", (req, res) => {});

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
