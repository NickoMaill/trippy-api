const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});

async function findPriceHotel(req, res, next) {

	const hotels = await Postgres.query("SELECT * FROM hotels");
    const idParams = parseInt(req.params.price);
	const hotelsData = hotels.rows;
	const hotel = hotelsData.find((hotel) => {
		return hotel.price_category === idParams;
	});
	req.hotel = hotel;

    if (req.hotel === undefined) {
		return res.status(404).json({
			message: "hotel not found",
		});
	}
    
	next();
}

module.exports = findPriceHotel;