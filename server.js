// Import
const express = require("express");
const app = express();

//Routers
const hotelRouter = require("./Routes/hotelRouter");
const restaurantRouter = require("./Routes/restaurantsRouter")

//Server PORT
const PORT = 8000;

app.use(express.json());
app.use("/hotels", hotelRouter); 

//Routes

// On Api Load
app.get("/", (_req, res) => {
    res.send("Welcome on Trippy API")
})

// HOTELS
app.get("/hotels", hotelRouter); //Display all hotels
app.post("/hotels", hotelRouter); //add hotel
app.patch("/hotels/:id/name", hotelRouter); //update hotel name
app.delete("/hotels/:id", hotelRouter); //delete hotel

//RESTAURANT
app.get("/restaurants", restaurantRouter); //Dipslay all restaurant
app.get("/restaurants/:country", restaurantRouter); // display restaurant by country
app.get("/restaurants/price/:price", restaurantRouter) //display restaurant by price range
app.get("/restaurants/cuisine/:cuisine", restaurantRouter) // display restaurant by cuisine type
app.post("/restaurants", restaurantRouter); // add a restaurant
app.patch("/restaurants/:id/name", restaurantRouter); // modify restaurant name
app.delete("/restaurants/:id", restaurantRouter); // delete a restaurant

// Handle errors
app.get("*", (_req, res) => {
    res.status(404).send("Page not found");
});

//Server Listener
app.listen(PORT, () => console.log("Listening on port 8000"));