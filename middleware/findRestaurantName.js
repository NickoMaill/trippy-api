const Restaurants = require("../Schema/restaurantsSchema");

async function findRestaurantName(req, res, next) {
	const restaurants = await Restaurants.find();
	const restaurant = restaurants.find((restaurant) => {
		return restaurant.name.toLowerCase().replace(" ", "-") === req.params.name.toLowerCase().replace(" ", "-");
	});
	req.restaurant = restaurant;

    if (req.restaurant === undefined) {
		return res.status(404).json({
			message: "restaurant not found",
		});
	}
    
	next();
}

module.exports = findRestaurantName;