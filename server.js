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
app.get("/restaurants", restaurantRouter);
app.get("/restaurants/:country", restaurantRouter);
app.get("/restaurants/price/:price", restaurantRouter)
app.post("/restaurants", restaurantRouter);
app.patch("/restaurants/:id/name", restaurantRouter);
app.delete("/restaurants/:id", restaurantRouter);

// Handle errors
app.get("*", (_req, res) => {
    res.status(404).send("Page not found");
});

//Server Listener
app.listen(PORT, () => console.log("Listening on port 8000"));