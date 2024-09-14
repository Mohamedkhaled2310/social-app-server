const express = require("express");

const db = require("./models/db.js");

const dotenv = require("dotenv");

const app = express();

const userRouter = require("./routes/userRouter");



dotenv.config({ path: "./config.env" });





app.use("/api/user",userRouter);



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(port));

db();
