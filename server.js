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

//Diplay all hotels
app.get("/hotels", hotelRouter);

//add hotel
app.post("/hotels", hotelRouter);

//update hotel name
app.patch("/hotels/:id/name", hotelRouter);

app.delete("/hotels/:id", hotelRouter);

// Handle errors
app.get("*", (_req, res) => {
	res.status(404).send("Page not found");
});


//Server Listener
app.listen(PORT, () => console.log("Listening on port 8000"));