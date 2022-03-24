const Hotels = require("../Schema/hotelSchema");

async function isHotelExist(req, res, next) {
  const hotels = await Hotels.find();

  const hotel = hotels.find((hotel) => {
    return (
      hotel.name.toLowerCase().replace(" ", "-") ===
      req.body.name.toLowerCase().replace(" ", "-")
    );
  });

  req.hotel = hotel;
  if (req.hotel !== undefined) {
    return res.status(400).json({
      message: "this hotel already exist",
    });
  }
  next();
}

module.exports = isHotelExist;
