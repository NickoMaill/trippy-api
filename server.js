// Import
const express = require("express");
const app = express();
// const rateLimit = require("express-rate-limit");
const cors = require("./middleware/cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to mongo"));

//Routers
const hotelRouter = require("./Routes/hotelRouter");
const restaurantRouter = require("./Routes/restaurantsRouter");

//Server PORT
const PORT = 8000;

app.use(express.json());
app.use(cors);
app.use("/hotels", hotelRouter);
app.use("/restaurants", restaurantRouter);

// Handle errors
app.get("*", (_req, res) => {
	res.status(404).send("Page not found");
});

//Server Listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
