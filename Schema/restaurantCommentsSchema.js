const mongoose = require("mongoose");

const restaurantsCommentsSchema = new mongoose.Schema({
  hotelId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 0.5,
    max: 5,
  },
  content: {
    type: String,
    required: true,
    maxlength: 300,
  },
});

const restaurantsComments = mongoose.model("restaurants-comments", restaurantsCommentsSchema);
module.exports = restaurantsComments;
