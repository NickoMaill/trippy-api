const Restaurants = require('../Schema/restaurantsSchema')

async function findRestaurantId(req, res, next) {

	const restaurants = await Restaurants.find();
    const idParams = req.params.id;
	const restaurant = restaurants.find((restaurant) => {
		return restaurant.id === idParams;
	});
	req.restaurant = restaurant;

    if (req.restaurant === undefined) {
		return res.status(404).json({
			message: "restaurant not found",
		});
	}
    
	next();
}

module.exports = findRestaurantId;