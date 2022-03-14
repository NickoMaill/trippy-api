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

app.get("/", (_req, res) => {
    res.send("Welcome on Trippy API")
})
app.get("/hotels", hotelRouter);

app.post("/hotels", hotelRouter);

//Server Listener
app.listen(PORT, () => console.log("Listening on port 8000"));