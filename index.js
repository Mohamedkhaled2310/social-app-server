const express = require("express");

const db = require("./models/db.js");

const dotenv = require("dotenv");

const app = express();

const cors =require('cors');

const userRouter = require("./routes/userRouter");

const httphandler = require("./utils/httpStatusText");   
dotenv.config({ path: "./config.env" });


app.use(express.json()); 
app.use(cors());

app.use("/api/user",userRouter);

app.use((error, req, res, next) => { //global handler
    res.status(error.statusCode||500).json({
        status: error.statusText||httphandler.ERROR,
        message: error.message,
        code:error.statusCode||500
        ,data:null});
  });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(port));

db();
