const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});

async function findHotelCountry(req, res, next) {
	const hotels = await Postgres.query("SELECT * FROM hotels");
	const hotelsData = hotels.rows;
	const hotel = hotelsData.find((hotel) => {
		return hotel.country.toLowerCase().replace(" ", "-") === req.params.country.toLowerCase().replace(" ", "-");
	});
	req.hotel = hotel;

    if (req.hotel === undefined) {
		return res.status(404).json({
			message: "hotel not found",
		});
	}
    
	next();
}

module.exports = findHotelCountry;