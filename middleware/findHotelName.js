const Hotels = require("../Schema/hotelSchema");

async function findHotelName(req, res, next) {
	const hotels = await Hotels.find();
	const hotel = hotels.find((hotel) => {
		return hotel.name.toLowerCase().replace(" ", "-") === req.params.name.toLowerCase().replace(" ", "-");
	});
	req.hotel = hotel;

    if (req.hotel === undefined) {
		return res.status(404).json({
			message: "hotel not found",
		});
	}
    
	next();
}

module.exports = findHotelName;