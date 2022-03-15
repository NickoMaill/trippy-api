// Import
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit")

//Routers
const hotelRouter = require("./Routes/hotelRouter");
const restaurantRouter = require("./Routes/restaurantsRouter")

//Server PORT
const PORT = 8000;

app.use(express.json());

//************************************ ROUTES ****************************//

// On Api Load
app.get("/", (_req, res) => {
    res.send("Welcome on Trippy API")
})

//--------HOTELS---------//

//GET
app.get("/hotels", hotelRouter); //Display all hotels

//POST
app.post("/hotels", hotelRouter); //add hotel

//PATCH
app.patch("/hotels/:id/name", hotelRouter); //update hotel name

//DELETE
app.delete("/hotels/:id", hotelRouter); //delete hotel

//---------------RESTAURANT-------------//

//GET
app.get("/restaurants", restaurantRouter); //Dipslay all restaurant
app.get("/restaurants/id/:id", restaurantRouter)
app.get("/restaurants/:country", restaurantRouter); // display restaurant by country
app.get("/restaurants/price/:price", restaurantRouter) //display restaurant by price range
app.get("/restaurants/cuisine/:cuisine", restaurantRouter) // display restaurant by cuisine type

//POST
app.post("/restaurants", restaurantRouter); // add a restaurant

//PATCH
app.patch("/restaurants/:id/name", restaurantRouter); // modify restaurant name

//DELETE
app.delete("/restaurants/:id", restaurantRouter); // delete a restaurant

// Handle errors
app.get("*", (_req, res) => {
    res.status(404).send("Page not found");
});

//Server Listener
app.listen(PORT, () => console.log("Listening on port 8000"));