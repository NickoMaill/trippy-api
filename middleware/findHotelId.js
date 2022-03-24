const Hotels = require('../Schema/hotelSchema')

async function findHotelId(req, res, next) {

	const hotels = await Hotels.find();
    const idParams = req.params.id;
	const hotel = hotels.find((hotel) => {
		return hotel.id === idParams;
	});
	req.hotel = hotel;

    if (req.hotel === undefined) {
		return res.status(404).json({
			message: "hotel not found",
		});
	}
    
	next();
}

module.exports = findHotelId;