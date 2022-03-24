const mongoose = require('mongoose');

const restaurantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    address: {
        type: String,
        required: true,
        maxlength: 200,
    },
    city: {
        type: String,
        required: true,
        maxlength: 100,
    },
    country:{
        type: String,
        required: true,
        maxlength: 3,
    },
    stars: {
        type: Number,
        required: true,
        min: 0.5,
        max: 5,
    },
    cuisine: {
        type: String,
        required:true,
        maxlength: 50
    },
    priceCategory: {
        type: Number,
        required: true,
        min: 1,
        max: 3,
    }
})

const restaurants = mongoose.model('Restaurants', restaurantsSchema);

module.exports = restaurants