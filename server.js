// Import
const express = require("express");
const app = express();

//Routers
const hotelRouter = require("./Routes/hotelRouter");

//Server PORT
const PORT = 8000;

//Middlewares
app.use(express.json());

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

// Handle errors
app.get("*", (_req, res) => {
    res.status(404).send("Page not found");
});


//Server Listener
app.listen(PORT, () => console.log("Listening on port 8000"));