const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
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
    hasSpa: {
        type: Boolean,
        required: true,
    },
    hasPool: {
        type: Boolean,
        required: true,
    },
    priceCategory: {
        type: Number,
        required: true,
        min: 1,
        max: 3,
    }
})

const Hotels = mongoose.model('Hotels', hotelsSchema);

module.exports = Hotels