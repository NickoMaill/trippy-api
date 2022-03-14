const express = require("express");
const app = express();
const hotelRouter = require("./Routes/hotelRouter")
const PORT = 8000;

//Middlewares
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Welcome on Trippy API")
})

app.get("/hotels", hotelRouter);

app.get("/hotels/:id", hotelRouter)

app.listen(PORT, () => console.log("Listening on port 8000"));