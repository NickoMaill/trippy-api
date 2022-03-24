const Restaurants = require("../Schema/restaurantsSchema");

async function isRestaurantExist(req, res, next) {
  const restaurants = await Restaurants.find();
  const restaurant = restaurants.find((restaurant) => {
    return (
      restaurant.name.toLowerCase().replace(" ", "-") ===
      req.body.name.toLowerCase().replace(" ", "-")
    );
  });

  req.restaurant = restaurant;
  if (req.restaurant !== undefined) {
    return res.status(400).json({
      message: "this restaurant already exist",
    });
  }
  next();
}

module.exports = isRestaurantExist;
