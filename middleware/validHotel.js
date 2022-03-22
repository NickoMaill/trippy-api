const Joi = require("joi");

const hotel = Joi.object({
	name: Joi.string().min(1).max(30).required(),
	address: Joi.string().min(1).max(50).required(),
	city: Joi.string().min(1).max(30).required(),
	country: Joi.string().min(1).max(30).required(),
	stars: Joi.number().min(1).max(5).required(),
	hasSpa: Joi.boolean().required(),
	hasPool: Joi.boolean().required(),
	priceCategory: Joi.number().min(1).max(3).required(),
});

function validNewUser(req, res, next) {
	const validation = hotel.validate(req.body);

	if (validation.error) {
		return res.status(400).json({
			message: "Error 400",
			description: validation.error.details[0].message,
		});
	}

	next();
}

module.exports = validNewUser;
